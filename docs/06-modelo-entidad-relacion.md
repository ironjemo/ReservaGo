# Modelo Entidad - Relación

## Proyecto

**ReservaGo**

---

# Objetivo

Definir las entidades principales de la plataforma, sus atributos y las relaciones entre ellas.

---

# Entidad: Usuario

Representa cualquier persona registrada en la plataforma.

## Atributos

- id
- nombres
- apellidos
- tipoDocumento
- numeroDocumento
- correo
- telefono
- contraseña
- fotoPerfil
- estado
- fechaRegistro
- ultimoAcceso

---

# Entidad: Rol

Define el tipo de usuario.

## Valores

- Administrador
- Propietario
- Huésped

Relación:

Un rol puede pertenecer a muchos usuarios.

---

# Entidad: Propiedad

Representa un alojamiento turístico.

## Atributos

- id
- nombre
- descripción
- tipo
- capacidad
- habitaciones
- baños
- camas
- precioBase
- ciudad
- municipio
- dirección
- barrioVereda
- latitud
- longitud
- estado
- fechaCreación

Relación:

Una propiedad pertenece a un propietario.

---

# Entidad: Imagen

Cada propiedad tendrá varias imágenes.

## Atributos

- id
- url
- principal
- orden

Relación:

Muchas imágenes pertenecen a una propiedad.

---

# Entidad: Servicio

Servicios disponibles.

Ejemplo:

- Piscina
- Jacuzzi
- WiFi
- BBQ
- Parqueadero
- Aire acondicionado
- Cocina
- Televisión

Una propiedad podrá tener muchos servicios.

---

# Entidad: Reserva

Representa una reserva realizada por un huésped.

## Atributos

- id
- fechaIngreso
- fechaSalida
- cantidadHuéspedes
- valorReserva
- estado
- fechaReserva

---

# Estados de Reserva

- Pendiente
- Aprobada
- Rechazada
- Pagada
- Confirmada
- En Curso
- Finalizada
- Cancelada

---

# Entidad: Pago

Representa el pago de una reserva.

## Atributos

- id
- valor
- métodoPago
- referencia
- fechaPago
- estado

---

# Métodos de Pago

- Nequi
- Bancolombia
- Daviplata
- Wompi (Futuro)
- Mercado Pago (Futuro)

---

# Entidad: Comisión

Representa el ingreso generado para ReservaGo.

## Atributos

- id
- porcentaje
- valorComisión
- fechaGeneración
- estado

---

# Entidad: Opinión

Calificaciones realizadas por los huéspedes.

## Atributos

- id
- puntuación
- comentario
- fecha

---

# Entidad: Favorito

Permite guardar propiedades favoritas.

---

# Entidad: Disponibilidad

Calendario de cada propiedad.

## Atributos

- fecha
- disponible
- motivoBloqueo

---

# Relaciones

## Usuario

1 Usuario

↓

Muchas Propiedades

---

## Propiedad

1 Propiedad

↓

Muchas Imágenes

---

## Propiedad

1 Propiedad

↓

Muchas Reservas

---

## Usuario

1 Usuario

↓

Muchas Reservas

---

## Reserva

1 Reserva

↓

1 Pago

---

## Pago

1 Pago

↓

1 Comisión

---

## Propiedad

Muchos Servicios

↓

Muchos Servicios

(Relación Muchos a Muchos)

---

## Propiedad

1 Propiedad

↓

Muchas Opiniones

---

## Usuario

1 Usuario

↓

Muchas Opiniones

---

## Propiedad

1 Propiedad

↓

Muchos Registros de Disponibilidad