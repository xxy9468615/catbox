#!/usr/bin/env node

import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";
import FormData from "form-data";
import axios from "axios";

const CATBOX_API = "https://catbox.moe/user/api.php";
const DEFAULT_USERHASH = process.env.CATBOX_USERHASH || null;

// ========== 工具定义 ==========

const TOOLS = [
  {
    name: "url_upload",
    description: "通过 URL 上传文件到 Catbox",
    inputSchema: {
      type: "object",
      properties: {
        url: { type: "string", description: "文件的直接链接" },
        userhash: { type: "string", description: "用户哈希（可选，匿名上传不填）" },
      },
      required: ["url"],
    },
  },
  {
    name: "delete_files",
    description: "删除已上传的文件",
    inputSchema: {
      type: "object",
      properties: {
        files: { type: "string", description: "要删除的文件名，空格分隔" },
        userhash: { type: "string", description: "用户哈希" },
      },
      required: ["files", "userhash"],
    },
  },
  {
    name: "create_album",
    description: "创建相册",
    inputSchema: {
      type: "object",
      properties: {
        title: { type: "string", description: "相册标题" },
        files: { type: "string", description: "文件名，空格分隔" },
        userhash: { type: "string", description: "用户哈希（可选，匿名创建后无法编辑）" },
        desc: { type: "string", description: "相册描述（可选）" },
      },
      required: ["title", "files"],
    },
  },
  {
    name: "edit_album",
    description: "编辑相册（必须提供所有参数）",
    inputSchema: {
      type: "object",
      properties: {
        short: { type: "string", description: "相册短 ID" },
        title: { type: "string", description: "相册标题" },
        files: { type: "string", description: "文件名，空格分隔" },
        userhash: { type: "string", description: "用户哈希" },
        desc: { type: "string", description: "相册描述" },
      },
      required: ["short", "title", "files", "userhash"],
    },
  },
  {
    name: "add_to_album",
    description: "向相册添加文件",
    inputSchema: {
      type: "object",
      properties: {
        short: { type: "string", description: "相册短 ID" },
        files: { type: "string", description: "文件名，空格分隔" },
        userhash: { type: "string", description: "用户哈希" },
      },
      required: ["short", "files", "userhash"],
    },
  },
  {
    name: "remove_from_album",
    description: "从相册移除文件",
    inputSchema: {
      type: "object",
      properties: {
        short: { type: "string", description: "相册短 ID" },
        files: { type: "string", description: "文件名，空格分隔" },
        userhash: { type: "string", description: "用户哈希" },
      },
      required: ["short", "files", "userhash"],
    },
  },
  {
    name: "delete_album",
    description: "删除相册",
    inputSchema: {
      type: "object",
      properties: {
        short: { type: "string", description: "相册短 ID" },
        userhash: { type: "string", description: "用户哈希" },
      },
      required: ["short", "userhash"],
    },
  },
];

// ========== 工具处理 ==========

async function handleToolCall(name, args) {
  // 使用环境变量中的 userhash 作为默认值
  const userhash = args.userhash || DEFAULT_USERHASH;

  switch (name) {
    case "url_upload":
      return await apiCall({ reqtype: "urlupload", userhash, url: args.url });
    case "delete_files":
      if (!userhash) throw new Error("需要 userhash 才能删除文件，请在环境变量 CATBOX_USERHASH 中配置或在参数中传入");
      return await apiCall({ reqtype: "deletefiles", userhash, files: args.files });
    case "create_album":
      return await apiCall({ reqtype: "createalbum", userhash, title: args.title, desc: args.desc, files: args.files });
    case "edit_album":
      if (!userhash) throw new Error("需要 userhash 才能编辑相册");
      return await apiCall({ reqtype: "editalbum", userhash, short: args.short, title: args.title, desc: args.desc || "", files: args.files });
    case "add_to_album":
      if (!userhash) throw new Error("需要 userhash 才能添加文件到相册");
      return await apiCall({ reqtype: "addtoalbum", userhash, short: args.short, files: args.files });
    case "remove_from_album":
      if (!userhash) throw new Error("需要 userhash 才能从相册移除文件");
      return await apiCall({ reqtype: "removefromalbum", userhash, short: args.short, files: args.files });
    case "delete_album":
      if (!userhash) throw new Error("需要 userhash 才能删除相册");
      return await apiCall({ reqtype: "deletealbum", userhash, short: args.short });
    default:
      throw new Error(`未知工具: ${name}`);
  }
}

async function apiCall(params) {
  const form = new FormData();
  for (const [k, v] of Object.entries(params)) {
    if (v !== undefined && v !== null) form.append(k, v);
  }
  const res = await axios.post(CATBOX_API, form, { headers: form.getHeaders() });
  return { result: res.data.trim() };
}

// ========== MCP 服务器 ==========

const server = new Server(
  { name: "catbox-mcp", version: "1.0.0" },
  { capabilities: { tools: {} } }
);

server.setRequestHandler(ListToolsRequestSchema, async () => ({ tools: TOOLS }));

server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;
  try {
    const result = await handleToolCall(name, args);
    return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
  } catch (e) {
    return { content: [{ type: "text", text: `错误: ${e.message}` }], isError: true };
  }
});

// ========== 启动 ==========

const transport = new StdioServerTransport();
await server.connect(transport);