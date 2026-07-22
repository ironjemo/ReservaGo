# Arquitectura del Sistema

## Proyecto

ReservaGo

---

# Objetivo

Definir la arquitectura tecnológica de la plataforma para garantizar escalabilidad, seguridad, mantenibilidad y facilidad de despliegue.

---

# Arquitectura General

ReservaGo utilizará una arquitectura de tres capas.

Cliente (Frontend)

↓

API REST (Backend)

↓

Base de Datos

---

# Frontend

Tecnología:

- Next.js
- React
- TypeScript
- Tailwind CSS

Responsabilidades:

- Mostrar propiedades
- Búsquedas
- Filtros
- Login
- Registro
- Panel del huésped
- Panel del propietario
- Panel administrador

---

# Backend

Tecnología:

- NestJS
- Prisma ORM

Responsabilidades:

- Autenticación
- Gestión de usuarios
- Gestión de propiedades
- Reservas
- Pagos
- Comisión
- Reportes
- API REST

---

# Base de Datos

Motor:

PostgreSQL

Responsabilidades:

- Usuarios
- Propiedades
- Reservas
- Pagos
- Fotografías
- Opiniones
- Disponibilidad
- Comisiones

---

# Infraestructura

Docker

Docker Compose

AWS

---

# Almacenamiento de imágenes

Inicialmente:

Almacenamiento local.

Futuro:

Amazon S3.

---

# Seguridad

- JWT
- Password Hash (bcrypt)
- Roles
- Permisos
- HTTPS

---

# API

Comunicación mediante API REST utilizando JSON.

---

# Roles del sistema

Administrador

Propietario

Huésped

---

# Escalabilidad

La arquitectura permitirá agregar nuevos módulos sin afectar los existentes.

Ejemplos:

- Aplicación móvil
- Inteligencia Artificial
- Programa de fidelización
- Facturación electrónica
- Multi idioma
- Multi moneda

---

# Contenedores Docker

- Frontend
- Backend
- PostgreSQL
- PgAdmin

---

# Flujo General

Usuario

↓

Frontend

↓

Backend

↓

Base de Datos

↓

Respuesta

↓

Frontend

↓

Usuario