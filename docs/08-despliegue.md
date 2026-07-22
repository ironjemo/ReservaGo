# Despliegue e Infraestructura

## Proyecto

**ReservaGo**

---

# Objetivo

Definir la infraestructura tecnológica para el despliegue, administración y escalabilidad de la plataforma.

---

# Ambiente de Desarrollo

Sistema Operativo

- Windows 11

IDE

- Visual Studio Code

Control de versiones

- Git
- GitHub

---

# Contenedores Docker

El proyecto utilizará Docker para mantener un entorno de desarrollo consistente.

## Contenedores

- Frontend (Next.js)
- Backend (NestJS)
- PostgreSQL
- PgAdmin

---

# Base de Datos

Motor:

PostgreSQL

ORM:

Prisma

---

# Variables de Entorno

El proyecto utilizará archivos `.env` para configurar:

- Base de datos
- JWT
- URLs
- AWS
- Pasarela de pagos
- Correo electrónico

---

# Almacenamiento de Archivos

## Fase Inicial

- Disco local

## Fase de Producción

- Amazon S3

---

# Dominio

Producción:

www.reservago.com

Administración:

admin.reservago.com

API:

api.reservago.com

---

# Certificados SSL

Todo el tráfico utilizará HTTPS.

---

# Servidor Web

Nginx actuará como Reverse Proxy.

---

# Plataforma Cloud

Inicialmente:

AWS

Servicios previstos:

- EC2
- RDS PostgreSQL (futuro)
- S3
- CloudFront
- Route53

---

# Backups

La base de datos deberá contar con respaldos automáticos.

Las imágenes almacenadas en S3 tendrán redundancia.

---

# Monitoreo

Se implementará monitoreo utilizando:

- CloudWatch (AWS)
- Logs del Backend
- Logs de Docker

---

# Escalabilidad

La arquitectura permitirá escalar:

- Frontend
- Backend
- Base de Datos

de forma independiente.

---

# Pipeline CI/CD

El proyecto utilizará GitHub Actions para:

- Validar código
- Ejecutar pruebas
- Construir imágenes Docker
- Desplegar automáticamente

---

# Ambientes

- Desarrollo
- Pruebas
- Producción

Cada ambiente tendrá su propia configuración y variables de entorno.