# API REST

## Proyecto

**ReservaGo**

---

# Introducción

La API REST será el punto de comunicación entre el Frontend y el Backend.

Todas las solicitudes utilizarán el protocolo HTTPS y el formato JSON.

---

# URL Base

/api/v1

---

# Módulo de Autenticación

## Registro

POST

/api/v1/auth/register

---

## Inicio de sesión

POST

/api/v1/auth/login

---

## Recuperar contraseña

POST

/api/v1/auth/forgot-password

---

## Cambiar contraseña

PUT

/api/v1/auth/change-password

---

# Módulo Usuarios

## Obtener perfil

GET

/api/v1/users/profile

---

## Actualizar perfil

PUT

/api/v1/users/profile

---

## Listar usuarios (Administrador)

GET

/api/v1/users

---

## Obtener usuario por ID

GET

/api/v1/users/{id}

---

## Eliminar usuario

DELETE

/api/v1/users/{id}

---

# Módulo Propiedades

## Listar propiedades

GET

/api/v1/properties

---

## Obtener propiedad

GET

/api/v1/properties/{id}

---

## Crear propiedad

POST

/api/v1/properties

---

## Editar propiedad

PUT

/api/v1/properties/{id}

---

## Eliminar propiedad

DELETE

/api/v1/properties/{id}

---

## Buscar propiedades

GET

/api/v1/properties/search

Filtros:

- ciudad
- municipio
- tipo
- precio
- capacidad
- habitaciones

---

# Módulo Imágenes

## Subir imagen

POST

/api/v1/properties/{id}/images

---

## Eliminar imagen

DELETE

/api/v1/images/{id}

---

# Módulo Disponibilidad

## Consultar calendario

GET

/api/v1/properties/{id}/availability

---

## Bloquear fechas

POST

/api/v1/properties/{id}/availability

---

## Actualizar disponibilidad

PUT

/api/v1/availability/{id}

---

# Módulo Reservas

## Crear reserva

POST

/api/v1/reservations

---

## Obtener reserva

GET

/api/v1/reservations/{id}

---

## Listar reservas

GET

/api/v1/reservations

---

## Aprobar reserva

PUT

/api/v1/reservations/{id}/approve

---

## Rechazar reserva

PUT

/api/v1/reservations/{id}/reject

---

## Cancelar reserva

PUT

/api/v1/reservations/{id}/cancel

---

# Módulo Pagos

## Registrar pago

POST

/api/v1/payments

---

## Consultar pago

GET

/api/v1/payments/{id}

---

## Listar pagos

GET

/api/v1/payments

---

# Módulo Comisiones

## Listar comisiones

GET

/api/v1/commissions

---

## Obtener comisión

GET

/api/v1/commissions/{id}

---

# Módulo Opiniones

## Crear opinión

POST

/api/v1/reviews

---

## Listar opiniones

GET

/api/v1/reviews

---

# Módulo Dashboard

## Dashboard Administrador

GET

/api/v1/dashboard/admin

---

## Dashboard Propietario

GET

/api/v1/dashboard/owner

---

# Respuestas

La API responderá utilizando JSON.

Ejemplo:

{
  "success": true,
  "message": "Reserva creada correctamente",
  "data": {}
}

---

# Códigos HTTP

200 OK

201 Created

400 Bad Request

401 Unauthorized

403 Forbidden

404 Not Found

500 Internal Server Error

---

# Seguridad

La autenticación se realizará mediante JWT.

Los endpoints protegidos requerirán un token válido.