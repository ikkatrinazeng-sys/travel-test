# Travel Server — Go REST API

使用 **Gin + GORM + SQLite** 构建，复用前台 Next.js 项目的 `prisma/dev.db` 数据库文件。

## 目录结构

```
server/
├── main.go                  # 入口，路由注册
├── go.mod                   # 模块依赖
├── db/
│   └── db.go                # GORM SQLite 初始化
├── models/
│   └── models.go            # 数据模型（与 Prisma schema 对应）
├── handlers/
│   ├── auth.go              # POST /api/auth/login
│   ├── cities.go            # 城市 CRUD / Guide / Story / Photos
│   ├── homepage.go          # Hero / RecentUpdates / Photography
│   └── upload.go            # POST /api/upload 图片上传
└── middleware/
    └── auth.go              # JWT Bearer 鉴权中间件
```

## 快速启动

### 1. 安装 Go（若未安装）

```bash
brew install go       # macOS
# 或从 https://go.dev/dl/ 下载安装包
```

### 2. 下载依赖

```bash
cd server
go mod tidy
```

### 3. 配置环境变量

在 `server/` 目录创建 `.env`（或复用根目录 `.env.local`）：

```env
# 数据库路径（相对于 server/ 目录）
DB_PATH=../prisma/dev.db

# 管理员账号（对应前台 ADMIN_USER / ADMIN_PASS）
ADMIN_USER=admin
ADMIN_PASS=your_password

# JWT 签名密钥
JWT_SECRET=your_jwt_secret

# 图片上传目录（相对于 server/ 目录）
UPLOAD_DIR=../public/uploads

# 服务端口（默认 8080）
GO_PORT=8080
```

### 4. 启动服务

```bash
cd server
go run main.go
```

服务启动后监听 `http://localhost:8080`。

## API 接口

### 公开接口（无需鉴权）

| 方法 | 路径 | 说明 |
|------|------|------|
| POST | `/api/auth/login` | 登录，返回 JWT token |
| GET  | `/api/cities` | 获取所有城市列表 |
| GET  | `/api/cities/:slug` | 获取单个城市详情（含 photos/videos/guide/story） |

### 鉴权接口（需 `Authorization: Bearer <token>`）

| 方法 | 路径 | 说明 |
|------|------|------|
| POST   | `/api/cities` | 创建城市 |
| PUT    | `/api/cities/:id` | 更新城市基础信息 |
| DELETE | `/api/cities/:id` | 删除城市 |
| PUT    | `/api/cities/:id/guide` | 更新旅行攻略 |
| PUT    | `/api/cities/:id/story` | 更新城市故事 |
| PUT    | `/api/cities/:id/photos` | 替换城市照片列表 |
| GET    | `/api/hero-polaroids` | Hero 拍立得列表 |
| POST   | `/api/hero-polaroids` | 创建拍立得 |
| PUT    | `/api/hero-polaroids/:id` | 更新拍立得 |
| DELETE | `/api/hero-polaroids/:id` | 删除拍立得 |
| GET    | `/api/recent-updates` | 最近更新列表 |
| POST   | `/api/recent-updates` | 创建条目 |
| PUT    | `/api/recent-updates/:id` | 更新条目 |
| DELETE | `/api/recent-updates/:id` | 删除条目 |
| GET    | `/api/photography-cities` | 摄影城市列表（含照片） |
| POST   | `/api/photography-cities` | 创建摄影城市 |
| DELETE | `/api/photography-cities/:id` | 删除摄影城市 |
| PUT    | `/api/photography-cities/:id/photos` | 替换摄影照片列表 |
| POST   | `/api/upload` | 上传图片（multipart/form-data, field: `file`） |

## 与 Next.js 的关系

- Go 服务仅提供 REST API（端口 8080）
- Next.js 前台/后台继续运行在端口 3000
- 两者共享同一个 SQLite 文件 `prisma/dev.db`
- 如需让 Next.js 调用 Go API，将 `NEXT_PUBLIC_API_BASE=http://localhost:8080` 写入 `.env.local`
