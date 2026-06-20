# Catbox MCP Server

Catbox.moe 文件上传托管服务的 MCP 服务器。支持 URL 上传、删除文件、相册管理等功能。

## 工具

| 工具 | 说明 |
|------|------|
| url_upload | 通过 URL 上传文件到 Catbox |
| delete_files | 删除已上传的文件 |
| create_album | 创建相册 |
| edit_album | 编辑相册 |
| add_to_album | 向相册添加文件 |
| remove_from_album | 从相册移除文件 |
| delete_album | 删除相册 |

## 服务配置

```json
{
  "mcpServers": {
    "catbox": {
      "command": "npx",
      "args": [
        "-y",
        "catbox-mcp-server@latest"
      ],
      "type": "stdio"
    }
  }
}
```

## 环境变量

无

## 使用示例

### URL 上传

```json
{
  "url": "https://example.com/image.jpg"
}
```

### 创建相册

```json
{
  "title": "我的相册",
  "files": "abc123.jpg def456.png"
}
```
