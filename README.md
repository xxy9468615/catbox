# 🐱 Catbox MCP Server

A [Model Context Protocol (MCP)](https://modelcontextprotocol.io) server for [Catbox.moe](https://catbox.moe) — a free file hosting service. Upload files via URL, manage albums, and delete files directly from your MCP client (Claude Desktop, Claude Code, etc.).

[![npm version](https://img.shields.io/npm/v/catbox-mcp-server)](https://www.npmjs.com/package/catbox-mcp-server)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

---

## ⚠️ Important: Anonymous vs Authenticated

Catbox has two user tiers. Understanding this is key:

| Capability | 🕶️ Anonymous | 🔑 With Userhash |
|-----------|:---:|:---:|
| **Upload files** | ✅ | ✅ |
| **Delete files** | ❌ | ✅ |
| **Create album** | ✅ (but **cannot** edit/delete later) | ✅ (fully manageable) |
| **Edit album** | ❌ | ✅ |
| **Add/remove album files** | ❌ | ✅ |
| **Delete album** | ❌ | ✅ |

You can get a free userhash by uploading any file to [Catbox.moe](https://catbox.moe) — see [Getting Your Userhash](#-getting-your-userhash).

## ✨ Features

| Feature | Description |
|---------|-------------|
| ☁️ **URL Upload** | Upload files from any publicly accessible URL |
| 🗑️ **File Management** | Delete files you've uploaded |
| 🖼️ **Album Management** | Create, edit, add to, remove from, and delete albums |

## 🧰 Tools

| Tool | Description |
|------|-------------|
| `url_upload` | Upload a file from a publicly accessible URL |
| `delete_files` | Delete uploaded files (userhash required) |
| `create_album` | Create a new album |
| `edit_album` | Edit album title/description/files (userhash required) |
| `add_to_album` | Add files to an album (userhash required) |
| `remove_from_album` | Remove files from an album (userhash required) |
| `delete_album` | Delete an album (userhash required) |

See the [userhash guide](#-getting-your-userhash) to set up authentication for management tools.

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

### 🔑 Getting Your Userhash

No account registration required — you get a userhash just by using Catbox:

1. Go to [Catbox.moe](https://catbox.moe)
2. Upload **any file** from your computer (or use this API to upload a URL)
3. After upload, the page displays your **userhash** — a hex string like `a1b2c3d4e5f6...`
4. **Save it** and use it with any management tool
5. You can also get the userhash from the API response when uploading without one

> **💡 Without userhash:** You can upload files and create albums, but:
> - You **cannot** delete any files
> - Albums created anonymously are **permanent and unmodifiable** — no edits, no deletions
> - To manage anything, you need your userhash

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

---

## ⚖️ Disclaimer

This MCP server is an **unofficial community tool** and is **not affiliated with, endorsed by, or sponsored by Catbox LLC**.

### Your Responsibilities

By using this tool, you agree to comply with [Catbox's Terms of Service](https://catbox.moe/legal.php):

- **You own your content** — you must have the right to upload, share, and store any files you upload via this tool
- **No illegal use** — do not upload copyrighted content without permission, malware, spyware, or any material that violates applicable laws
- **No commercial use** — Catbox prohibits commercial use of their service without prior written approval from Catbox Executives
- **No reselling** — you may not resell or supply Catbox services to others
- **No abuse** — do not spam, harass, or damage Catbox's infrastructure

### No Warranty

This tool is provided **"AS IS"**, without any express or implied warranty. The authors are not responsible for:

- Any content uploaded or shared through this tool
- Any loss of data, files, or access to Catbox services
- Any damages arising from the use or inability to use this tool
- Any violations of Catbox's Terms of Service by end users

**Use at your own risk.** If you have concerns about specific content or usage, contact Catbox at **admin@catbox.moe**.

---

## ☕ Support Catbox

Catbox.moe provides a **free** file hosting service with no accounts required. If you find this service useful, consider supporting them:

- **Donate via PayPal**: [https://catbox.moe/donate.php](https://catbox.moe/donate.php)
- **Spread the word** — tell others about Catbox!
- **Follow their rules** — be a responsible user so the service stays alive for everyone ❤️
