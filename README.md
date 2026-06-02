# Redis Lab

[![Repo](https://img.shields.io/badge/GitHub-yeremitantaraico%2Fredis--lab-181717?logo=github)](https://github.com/yeremitantaraico/redis-lab)
![Node](https://img.shields.io/badge/Node.js-20%2B-339933?logo=node.js&logoColor=white)
![pnpm](https://img.shields.io/badge/pnpm-9%2B-F69220?logo=pnpm&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-8-646CFF?logo=vite&logoColor=white)
![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)
![NestJS](https://img.shields.io/badge/NestJS-11-E0234E?logo=nestjs&logoColor=white)
![Redis](https://img.shields.io/badge/Redis-6%2B-DC382D?logo=redis&logoColor=white)
![Visits](https://visitor-badge.laobi.icu/badge?page_id=yeremitantaraico.redis-lab)

Prueba basica de integracion entre **Frontend (React + Vite)**, **Backend (NestJS)** y **Redis** usando mensajes temporales con TTL.

> [!IMPORTANT]
> El frontend no se conecta directo a Redis.  
> Todo acceso a Redis ocurre desde el backend.

## Objetivo del laboratorio

Validar un flujo simple de integracion:

1. El usuario envia un mensaje desde el frontend.
2. El backend guarda el mensaje en Redis con TTL.
3. El frontend lista mensajes activos y ve como expiran.

## Endpoints principales

| Metodo | Ruta | Descripcion |
|---|---|---|
| `GET` | `/` | Estado general de la API |
| `GET` | `/health` | Estado general de la API |
| `GET` | `/health/redis` | Ping a Redis |
| `POST` | `/messages` | Crea mensaje con TTL |
| `GET` | `/messages` | Lista mensajes activos |

## Modelo de datos en Redis

Prefijo de clave:

```text
lab:message:<uuid>
```

Payload (JSON):

```json
{
  "id": "uuid",
  "user": "yeremi",
  "text": "hola redis",
  "at": "2026-06-02T06:00:00.000Z"
}
```

## Redis con ACL (referencia)

> [!TIP]
> Este proyecto usa `REDIS_URL`, que ya incluye usuario, password, host, puerto y DB.

Formato recomendado:

```bash
REDIS_URL=redis://admin:password@localhost:6379/0
```

## Troubleshooting rapido

| Problema | Causa probable | Solucion |
|---|---|---|
| `ECONNREFUSED` a Redis | Redis apagado o URL incorrecta | Validar `REDIS_URL` y servicio Redis |
| `NOAUTH Authentication required` | Credenciales ACL invalidas | Revisar usuario/password en `REDIS_URL` |
| `404 /api/*` en frontend | Backend no levantado en puerto esperado | Iniciar backend y revisar proxy de Vite |
| Mensajes desaparecen | TTL activo | Comportamiento esperado |

---

Desarrollado como laboratorio de integracion basica con Redis para pruebas locales.
