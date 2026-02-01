# Docker 部署到云服务器配置指南

## 1. 服务器准备

### 安装 Docker 和 Docker Compose

```bash
# 更新系统
sudo apt update && sudo apt upgrade -y

# 安装 Docker
curl -fsSL https://get.docker.com | sh

# 启动 Docker 服务
sudo systemctl start docker
sudo systemctl enable docker

# 安装 Docker Compose
sudo apt install docker-compose -y

# 将当前用户添加到 docker 组（可选，避免每次使用 sudo）
sudo usermod -aG docker $USER
```

### 创建项目目录

```bash
# 创建项目目录
sudo mkdir -p /opt/ai_lab
sudo chown $USER:$USER /opt/ai_lab
cd /opt/ai_lab

# 下载 docker-compose.yml
# 你需要手动将 docker-compose.yml 文件上传到这个目录
```

### 配置 GitHub Container Registry 访问

```bash
# 登录到 GitHub Container Registry
# 需要创建一个 Personal Access Token (PAT)
echo "YOUR_GITHUB_TOKEN" | docker login ghcr.io -u chunhuiy20-bot --password-stdin
```

## 2. 配置 GitHub Secrets

在 GitHub 仓库中添加以下 Secrets：

访问：https://github.com/chunhuiy20-bot/ai_lab/settings/secrets/actions

### 需要添加的 Secrets：

1. **SERVER_HOST**
   - 你的服务器 IP 地址或域名
   - 例如：`123.45.67.89` 或 `example.com`

2. **SERVER_USER**
   - SSH 登录用户名
   - 例如：`root` 或 `ubuntu`

3. **SERVER_SSH_KEY**
   - SSH 私钥内容
   - 生成方法见下文

### 生成 SSH 密钥对

在你的本地电脑或服务器上执行：

```bash
# 生成新的 SSH 密钥对
ssh-keygen -t ed25519 -C "github-actions" -f ~/.ssh/github_actions

# 查看私钥（复制到 GitHub Secrets 的 SERVER_SSH_KEY）
cat ~/.ssh/github_actions

# 查看公钥
cat ~/.ssh/github_actions.pub
```

### 将公钥添加到服务器

```bash
# 在服务器上执行
mkdir -p ~/.ssh
chmod 700 ~/.ssh

# 将公钥内容添加到 authorized_keys
echo "你的公钥内容" >> ~/.ssh/authorized_keys
chmod 600 ~/.ssh/authorized_keys
```

## 3. 上传 docker-compose.yml 到服务器

```bash
# 在服务器上创建 docker-compose.yml
cd /opt/ai_lab
nano docker-compose.yml
```

将以下内容粘贴进去：

```yaml
version: '3.8'

services:
  ai-lab:
    image: ghcr.io/chunhuiy20-bot/ai_lab:latest
    container_name: ai_lab
    ports:
      - "3000:80"
    restart: unless-stopped
    environment:
      - TZ=Asia/Shanghai
```

保存并退出（Ctrl+X, Y, Enter）

## 4. 配置 GitHub Container Registry 为公开（可选）

如果你想让镜像公开访问：

1. 访问：https://github.com/users/chunhuiy20-bot/packages/container/ai_lab/settings
2. 在 "Danger Zone" 中点击 "Change visibility"
3. 选择 "Public"

## 5. 测试部署

推送代码到 main 分支后：

1. GitHub Actions 会自动构建 Docker 镜像
2. 推送到 GitHub Container Registry
3. SSH 连接到服务器
4. 拉取最新镜像并重启容器

访问：`http://你的服务器IP:3000`

## 6. 配置 Nginx 反向代理（可选）

如果想使用域名和 HTTPS：

```bash
# 安装 Nginx
sudo apt install nginx -y

# 创建配置文件
sudo nano /etc/nginx/sites-available/ai_lab
```

配置内容：

```nginx
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

启用配置：

```bash
sudo ln -s /etc/nginx/sites-available/ai_lab /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

## 7. 配置 SSL（可选）

```bash
# 安装 Certbot
sudo apt install certbot python3-certbot-nginx -y

# 获取 SSL 证书
sudo certbot --nginx -d your-domain.com
```

## 故障排查

### 查看容器日志
```bash
cd /opt/ai_lab
docker-compose logs -f
```

### 查看容器状态
```bash
docker ps
```

### 手动拉取镜像
```bash
docker pull ghcr.io/chunhuiy20-bot/ai_lab:latest
```

### 重启容器
```bash
cd /opt/ai_lab
docker-compose restart
```
