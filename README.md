# 🐱 Catbox MCP Server

A [Model Context Protocol (MCP)](https://modelcontextprotocol.io) server for [Catbox.moe](https://catbox.moe) — a free file hosting service. Upload files via URL, manage albums, and delete files directly from your MCP client (Claude Desktop, Claude Code, etc.).

[![npm version](https://img.shields.io/npm/v/catbox-mcp-server)](https://www.npmjs.com/package/catbox-mcp-server)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

---

## ✨ Features

| Feature | Description |
|---------|-------------|
| ☁️ **URL Upload** | Upload files from any publicly accessible URL |
| 🗑️ **File Management** | Delete files you've uploaded |
| 🖼️ **Album Management** | Create, edit, add to, remove from, and delete albums |

## 🧰 Tools

| Tool | Description | Auth Required |
|------|-------------|:---:|
| `url_upload` | Upload a file from a direct URL | ❌ |
| `delete_files` | Delete uploaded files | ✅ |
| `create_album` | Create a new album | ❌ |
| `edit_album` | Edit an existing album | ✅ |
| `add_to_album` | Add files to an album | ✅ |
| `remove_from_album` | Remove files from an album | ✅ |
| `delete_album` | Delete an album | ✅ |

> **Auth** refers to whether a Catbox **userhash** is required. Anonymous uploads and album creation are supported, but management operations require a userhash.

## 📦 Installation

### Via npm (recommended)

```bash
npm install -g catbox-mcp-server
```

### Via npx (no install)

```bash
npx -y catbox-mcp-server
```

### From source

```bash
git clone https://github.com/xxy9468615/catbox.git
cd catbox
npm install
node index.js
```

## 🔧 Configuration

### Claude Desktop / Claude Code

Add to your `mcpServers` config:

```json
{
  "mcpServers": {
    "catbox": {
      "command": "npx",
      "args": ["-y", "catbox-mcp-server"],
      "env": {
        "CATBOX_USERHASH": "your-catbox-userhash-here"
      }
    }
  }
}
```

### Environment Variables

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `CATBOX_USERHASH` | ❌ | — | Your Catbox user hash for authentication. Set this to avoid passing it with every call. |

> **💡 Tip:** You can always override the userhash per-tool call by passing it as a parameter — the environment variable is just a convenient default.

### Getting Your Userhash

1. Upload any file to [Catbox.moe](https://catbox.moe)
2. The response will include your `userhash`
3. Save it and use it in subsequent API calls to manage your files and albums

## 🚀 Usage Examples

### Upload a file from URL

```json
{
  "url": "https://example.com/image.jpg"
}
```

Response:
```
https://files.catbox.moe/abc123.jpg
```

### Upload with userhash (to claim ownership)

```json
{
  "url": "https://example.com/image.jpg",
  "userhash": "a1b2c3d4e5f6"
}
```

### Create an album

```json
{
  "title": "My Vacation Photos",
  "files": "abc123.jpg def456.png",
  "desc": "Summer 2026 trip",
  "userhash": "a1b2c3d4e5f6"
}
```

### Add files to an album

```json
{
  "short": "album123",
  "files": "ghi789.jpg jkl012.png",
  "userhash": "a1b2c3d4e5f6"
}
```

### Delete files

```json
{
  "files": "abc123.jpg def456.png",
  "userhash": "a1b2c3d4e5f6"
}
```

## 🔗 Links

- **Catbox.moe**: [https://catbox.moe](https://catbox.moe)
- **Catbox API / Tools**: [https://catbox.moe/tools.php](https://catbox.moe/tools.php)
- **Catbox FAQ**: [https://catbox.moe/faq.php](https://catbox.moe/faq.php)
- **GitHub Repo**: [https://github.com/xxy9468615/catbox](https://github.com/xxy9468615/catbox)

## 📄 License

MIT
