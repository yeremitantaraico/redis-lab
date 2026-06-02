<p align="center">
  <img src="https://cdn.simpleicons.org/redis/DC382D" alt="Redis Lab" width="128" height="128" />
</p>

<h1 align="center">Redis Lab</h1>

<p align="center">
  Fullstack integration lab to validate temporary TTL-based messages using React, NestJS, and Redis.
</p>

<p align="center">
  <a href="https://github.com/yeremitantaraico/redis-lab">
    <img src="https://img.shields.io/badge/GitHub-yeremitantaraico%2Fredis--lab-181717?style=flat&logo=github&logoColor=white" alt="Repository" />
  </a>
  <a href="https://nodejs.org/">
    <img src="https://img.shields.io/badge/Node.js-20%2B-339933?style=flat&logo=node.js&logoColor=white" alt="Node.js 20+" />
  </a>
  <a href="https://pnpm.io/">
    <img src="https://img.shields.io/badge/pnpm-9%2B-F69220?style=flat&logo=pnpm&logoColor=white" alt="pnpm 9+" />
  </a>
  <a href="https://vite.dev/">
    <img src="https://img.shields.io/badge/Vite-8-646CFF?style=flat&logo=vite&logoColor=white" alt="Vite 8" />
  </a>
  <a href="https://react.dev/">
    <img src="https://img.shields.io/badge/React-19-61DAFB?style=flat&logo=react&logoColor=black" alt="React 19" />
  </a>
  <a href="https://nestjs.com/">
    <img src="https://img.shields.io/badge/NestJS-11-E0234E?style=flat&logo=nestjs&logoColor=white" alt="NestJS 11" />
  </a>
  <a href="https://redis.io/">
    <img src="https://img.shields.io/badge/Redis-6%2B-DC382D?style=flat&logo=redis&logoColor=white" alt="Redis 6+" />
  </a>
</p>

<p align="center">
  <img src="https://visitor-badge.laobi.icu/badge?page_id=yeremitantaraico.redis-lab" alt="Repository visitors" />
</p>

---

## 📋 Description

**Redis Lab** is a **fullstack** experimentation environment to validate temporary messages with automatic expiration (TTL) in Redis, using a React frontend and a NestJS backend.

**Current capabilities:**

- Create messages with TTL from the frontend
- Temporarily persist messages in Redis
- Query active messages through the API
- Run application and Redis connectivity health checks

> [!IMPORTANT]
> The frontend does not connect directly to Redis.  
> All Redis access is handled through the backend.

> [!NOTE]
> This project is intended for local integration testing and expiration behavior validation.

## 🔄 Main flow

1. The user sends a message from the frontend.
2. The backend stores the message in Redis with a defined TTL.
3. The frontend lists active messages and observes how they expire.

## 🧩 Lab architecture

- **Frontend:** React + Vite for message input and visualization.
- **Backend:** NestJS to expose endpoints and handle flow logic.
- **Cache:** Redis for temporary message persistence with expiration.

## 🌐 Main endpoints

| Method | Route | Description |
|---|---|---|
| `GET` | `/` | General API status |
| `GET` | `/health` | Application health check |
| `GET` | `/health/redis` | Redis connectivity check |
| `POST` | `/messages` | Creates a temporary message with TTL |
| `GET` | `/messages` | Lists active messages |

## 🗂️ Redis data model

Key prefix:

```text
lab:message:<uuid>
```

Payload example:

```json
{
  "id": "uuid",
  "user": "yeremi",
  "text": "hola redis",
  "at": "2026-06-02T06:00:00.000Z"
}
```

## 🔐 Redis ACL configuration

> [!TIP]
> `REDIS_URL` includes username, password, host, port, and database.

Recommended format:

```bash
REDIS_URL=redis://admin:password@localhost:6379/0
```

## Quick troubleshooting

| Problem | Likely cause | Solution |
|---|---|---|
| `ECONNREFUSED` to Redis | Redis is down or URL is incorrect | Validate `REDIS_URL` and service status |
| `NOAUTH Authentication required` | Invalid ACL credentials | Check username/password in `REDIS_URL` |
| `404 /api/*` on frontend | Backend is not running on expected port | Start backend and verify Vite proxy |
| Messages disappear | TTL is active | Expected behavior |

## 📦 Requirements

- **Node.js** 20+
- **pnpm** 9+
- **Redis** 6+

## ⚙️ Stack

| Layer | Technology |
|------|------------|
| Frontend | React 19 + Vite 8 |
| Backend | NestJS 11 |
| Cache | Redis 6+ |
| Runtime | Node.js 20+ |
| Packages | pnpm 9+ |

## 📄 License

Public project built for educational and demonstration purposes focused on local frontend-backend integration practices with Redis.
