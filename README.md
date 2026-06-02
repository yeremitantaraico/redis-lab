<p align="center">
  <img src="https://cdn.simpleicons.org/redis/DC382D" alt="Redis Lab" width="128" height="128" />
</p>

<h1 align="center">Redis Lab</h1>

<p align="center">
  Laboratorio de integración Fullstack para validar mensajes temporales con TTL usando React, NestJS y Redis.
</p>

<p align="center">
  <a href="https://github.com/yeremitantaraico/redis-lab">
    <img src="https://img.shields.io/badge/GitHub-yeremitantaraico%2Fredis--lab-181717?style=flat&logo=github&logoColor=white" alt="Repositorio" />
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
  <img src="https://visitor-badge.laobi.icu/badge?page_id=yeremitantaraico.redis-lab" alt="Visitas al repositorio" />
</p>

---

## 📋 Descripción

**Redis Lab** es un entorno de experimentación **fullstack** para validar mensajes temporales con expiración automática (TTL) en Redis, usando frontend en React y backend en NestJS.

**Capacidades actuales:**

- Creación de mensajes con TTL desde frontend
- Persistencia temporal de mensajes en Redis
- Consulta de mensajes activos desde API
- Healthchecks de aplicación y conectividad con Redis

> [!IMPORTANT]
> El frontend no se conecta directamente a Redis.  
> Todo acceso a Redis se realiza mediante el backend.

> [!NOTE]
> Este proyecto está orientado a pruebas locales de integración y comportamiento de expiración.

## 🔄 Flujo principal

1. El usuario envía un mensaje desde el frontend.
2. El backend guarda el mensaje en Redis con un TTL definido.
3. El frontend lista mensajes activos y observa cómo expiran.

## 🧩 Arquitectura del laboratorio

- **Frontend:** React + Vite para captura y visualización de mensajes.
- **Backend:** NestJS para exponer endpoints y gestionar reglas del flujo.
- **Cache:** Redis para persistencia temporal de mensajes con expiración.

## 🌐 Endpoints principales

| Método | Ruta | Descripción |
|---|---|---|
| `GET` | `/` | Estado general de la API |
| `GET` | `/health` | Healthcheck de la aplicación |
| `GET` | `/health/redis` | Verificación de conectividad con Redis |
| `POST` | `/messages` | Crea un mensaje temporal con TTL |
| `GET` | `/messages` | Lista mensajes activos |

## 🗂️ Modelo de datos en Redis

Prefijo de clave:

```text
lab:message:<uuid>
```

Ejemplo de payload:

```json
{
  "id": "uuid",
  "user": "yeremi",
  "text": "hola redis",
  "at": "2026-06-02T06:00:00.000Z"
}
```

## 🔐 Configuración de Redis ACL

> [!TIP]
> `REDIS_URL` incluye usuario, password, host, puerto y base de datos.

Formato recomendado:

```bash
REDIS_URL=redis://admin:password@localhost:6379/0
```

## Troubleshooting rápido

| Problema | Causa probable | Solución |
|---|---|---|
| `ECONNREFUSED` a Redis | Redis apagado o URL incorrecta | Validar `REDIS_URL` y estado del servicio |
| `NOAUTH Authentication required` | Credenciales ACL inválidas | Revisar usuario/password en `REDIS_URL` |
| `404 /api/*` en frontend | Backend no levantado en puerto esperado | Iniciar backend y revisar proxy de Vite |
| Mensajes desaparecen | TTL activo | Comportamiento esperado |

## 📦 Requisitos

- **Node.js** 20+
- **pnpm** 9+
- **Redis** 6+

## ⚙️ Stack

| Capa | Tecnología |
|------|------------|
| Frontend | React 19 + Vite 8 |
| Backend | NestJS 11 |
| Cache | Redis 6+ |
| Runtime | Node.js 20+ |
| Paquetes | pnpm 9+ |

## 📄 Licencia

Proyecto público desarrollado con fines educativos y de demostración para prácticas locales de integración frontend-backend con Redis.
