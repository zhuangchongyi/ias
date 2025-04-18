# 智能考勤系统 (IAS)

## 项目简介

智能考勤系统 (IAS) 是一个基于现代化技术构建的高效考勤管理解决方案，支持多种考勤记录方式（如人脸识别），提供实时的考勤数据分析和管理功能，旨在帮助企业优化考勤管理流程。

## 功能特性

- **多方式考勤**：支持刷卡、人脸识别、定位打卡等多种考勤记录方式。
- **实时数据分析**：生成考勤报表并支持多种格式导出。
- **权限管理**：区分管理员与普通用户的操作权限。
- **异常提醒**：考勤异常自动提醒。
- **易部署**：支持 Docker 快速部署。

## 技术栈

### 前端

- **语言**：TypeScript
- **框架与库**：React + Ant Design

### 后端

- **语言**：Java
- **框架**：Spring Boot 3
- **ORM**：MyBatis-Plus
- **数据库**：MySQL

### 人脸识别服务

- **语言**：Python
- **框架**：FastAPI
- **库**：InsightFace、Milvus

### 部署

- Docker

## 系统架构

```
ias/
├── admin-back/              # 后端代码（本地端口38080）
├── admin-fornt-antd/        # 前端代码（本地端口37070）
├── face-server-py/          # 人脸识别服务（本地端口39090）
├── docker/                  # docker部署环境
└── README.md                # 项目说明文件
```

## 快速开始

### 环境要求

- **Node.js**：`>=18.0.0`
- **Java**：`>=17`
- **Python**：`>=3.9`
- **MySQL**：`>=8.0`
- **Docker**：已安装

### 安装步骤

1. 克隆代码仓库：

   ```bash
   git clone https://github.com/zhuangchongyi/ias.git
   cd ias
   ```

2. 配置后端服务：

   - 进入 `admin-back` 目录。
   - 修改 `application-dev.yml` 中的数据库配置为您的本地设置。

3. 配置前端服务：

   - 进入 `admin-fornt-antd` 目录。
   - 安装依赖：
     ```bash
     npm install
     ```
   - 启动前端服务：
     ```bash
     npm run dev
     ```

4. 配置人脸识别服务：

   - 进入 `face-server-py` 目录。
   - 安装依赖：
     ```bash
     pip install -r requirements.txt
     ```
   - 启动服务：
     ```bash
     uvicorn main:app --host 0.0.0.0 --port 39090
     ```

5. 通过 Docker 部署（可选）：

   - 进入 `docker` 目录。
   - 运行：
     1、启动 mysql 容器
     ```bash
     cd mysql
     docker compose up -d
     ```
     2、启动 redis 容器
     ```bash
     cd redis
     docker compose up -d
     ```
     1、启动 milvus 容器
     ```bash
     cd milvus
     docker compose up -d
     访问可视化：http://localhost:3000
     ```

6. 访问系统：
   - 在浏览器中打开 [http://localhost:37070](http://localhost:37070)。

## 使用说明

1. **管理员功能**：

   - 管理员工考勤记录。
   - 查看和导出考勤报表。
   - 配置考勤规则与异常处理。

2. **员工功能**：
   - 查看个人考勤记录。
   - 提交考勤异常申请。
   - 查看考勤通知。

## 贡献指南

欢迎对本项目的贡献！如果您有任何建议或改进，可以通过提交 Issue 或 Pull Request 的方式参与。

### 提交 Issue

- 描述清晰的问题。
- 提供重现步骤（如必要）。

### 提交 Pull Request

- 确保代码风格与项目一致。
- 提供简要描述和必要的文档更新。

## 许可证

本项目基于 [MIT License](LICENSE) 开源。

## 联系方式

如果您有任何问题或建议，请通过以下方式联系：

- GitHub Issues：[提交问题](https://github.com/zhuangchongyi/ias/issues)
