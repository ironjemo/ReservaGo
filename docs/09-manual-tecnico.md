# Manual Técnico

## Proyecto

**ReservaGo**

---

# Introducción

Este documento describe la configuración técnica del proyecto ReservaGo, las herramientas utilizadas, la estructura del repositorio y el procedimiento para ejecutar la aplicación en un entorno de desarrollo.

---

# Tecnologías

## Frontend

- Next.js
- React
- TypeScript
- Tailwind CSS

## Backend

- NestJS
- TypeScript
- Prisma ORM

## Base de Datos

- PostgreSQL

## Contenedores

- Docker
- Docker Compose

## Control de Versiones

- Git
- GitHub

---

# Requisitos Previos

- Node.js 22+
- Docker Desktop
- Git
- Visual Studio Code

---

# Clonar el Proyecto

```bash
git clone <repositorio>
cd ReservaGo
```

---

# Variables de Entorno

Cada aplicación utilizará un archivo `.env`.

Ejemplos:

Frontend

```env
NEXT_PUBLIC_API_URL=http://localhost:3001/api/v1
```

Backend

```env
DATABASE_URL=
JWT_SECRET=
PORT=3001
```

---

# Instalación

Frontend

```bash
npm install
```

Backend

```bash
npm install
```

---

# Docker

Levantar contenedores

```bash
docker compose up -d
```

Detener contenedores

```bash
docker compose down
```

---

# Prisma

Crear migración

```bash
npx prisma migrate dev
```

Abrir Prisma Studio

```bash
npx prisma studio
```

---

# Ejecutar Proyecto

Frontend

```bash
npm run dev
```

Backend

```bash
npm run start:dev
```

---

# Flujo de Git

Rama principal

main

Rama desarrollo

develop

Ramas de funcionalidades

feature/nombre-funcionalidad

Ejemplo:

feature/auth

feature/properties

feature/reservations

---

# Convención de Commits

Ejemplos:

feat: agregar módulo de autenticación

fix: corregir validación de reservas

docs: actualizar documentación

refactor: optimizar consulta de propiedades

style: ajustes de interfaz

---

# Estructura General

/frontend

/backend

/database

/docker

/docs

/scripts

/assets

---

# Despliegue

El proyecto podrá desplegarse utilizando:

- Vercel
- Render
- PostgreSQL Cloud
- AWS

---

# Seguridad

- JWT
- bcrypt
- Variables de entorno
- HTTPS
- Control de acceso por roles

---

# Mantenimiento

Se recomienda:

- Mantener dependencias actualizadas.
- Realizar copias de seguridad periódicas.
- Documentar nuevas funcionalidades.
- Utilizar Pull Requests para integrar cambios.

---

# Licencia

MIT