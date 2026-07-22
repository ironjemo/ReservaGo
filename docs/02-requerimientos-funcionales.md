# Requerimientos Funcionales

## Proyecto

**ReservaGo**

---

# Introducción

Este documento describe los requerimientos funcionales de la plataforma ReservaGo.

Cada requerimiento representa una funcionalidad que el sistema deberá cumplir para satisfacer las necesidades de los huéspedes, propietarios y administradores.

---

# RF-001 Registro de usuarios

El sistema deberá permitir el registro de nuevos usuarios mediante:

- Nombre
- Apellidos
- Documento de identidad
- Correo electrónico
- Número celular
- Contraseña

---

# RF-002 Inicio de sesión

El sistema deberá permitir autenticarse mediante:

- Correo electrónico
- Contraseña

---

# RF-003 Recuperación de contraseña

El usuario podrá recuperar su contraseña mediante correo electrónico.

---

# RF-004 Administración del perfil

El usuario podrá:

- Editar información personal.
- Cambiar contraseña.
- Actualizar fotografía.
- Actualizar teléfono.
- Actualizar correo.

---

# RF-005 Registro de propietarios

Un usuario podrá solicitar convertirse en propietario.

El administrador podrá aprobar o rechazar la solicitud.

---

# RF-006 Registro de propiedades

El propietario podrá registrar una propiedad indicando:

- Nombre
- Descripción
- Tipo
- Ciudad
- Municipio
- Dirección
- Barrio o vereda
- Coordenadas GPS
- Cantidad de habitaciones
- Cantidad de baños
- Capacidad máxima
- Servicios incluidos
- Reglas de la propiedad

---

# RF-007 Gestión de imágenes

Cada propiedad podrá tener múltiples fotografías.

El propietario podrá:

- Subir imágenes.
- Eliminar imágenes.
- Cambiar el orden.
- Definir imagen principal.

---

# RF-008 Gestión de precios

Cada propiedad podrá definir:

- Precio por noche.
- Precio por fin de semana.
- Precio temporada alta.
- Precio temporada baja.
- Precio por festivos.
- Descuentos.

---

# RF-009 Calendario de disponibilidad

Cada propiedad tendrá un calendario donde el propietario podrá:

- Bloquear fechas.
- Habilitar fechas.
- Visualizar reservas.
- Administrar disponibilidad.

---

# RF-010 Búsqueda de propiedades

Los visitantes podrán buscar utilizando filtros como:

- Ciudad
- Municipio
- Tipo
- Precio mínimo
- Precio máximo
- Número de huéspedes
- Habitaciones
- Piscina
- Jacuzzi
- Parqueadero
- Mascotas
- WiFi

---

# RF-011 Visualización de propiedades

Cada propiedad mostrará:

- Fotografías
- Descripción
- Servicios
- Precio
- Disponibilidad
- Opiniones
- Ubicación
- Información del propietario

---

# RF-012 Favoritos

Los usuarios podrán guardar propiedades favoritas.

---

# RF-013 Reservas

Los huéspedes podrán:

- Seleccionar fechas.
- Ver disponibilidad.
- Reservar.

---

# RF-014 Confirmación de reservas

El propietario podrá:

- Aprobar.
- Rechazar.
- Cancelar.

---

# RF-015 Gestión de pagos

El sistema permitirá:

- Registrar pagos.
- Validar pagos.
- Consultar pagos.

---

# RF-016 Comisión

El sistema calculará automáticamente la comisión correspondiente a ReservaGo.

La comisión será configurable.

---

# RF-017 Contacto

Cada propiedad tendrá:

- Botón de WhatsApp.
- Información del propietario.

---

# RF-018 Opiniones

Los huéspedes podrán:

- Calificar propiedades.
- Escribir comentarios.

---

# RF-019 Panel del propietario

El propietario tendrá acceso a:

- Dashboard.
- Reservas.
- Ingresos.
- Propiedades.
- Calendario.
- Estadísticas.

---

# RF-020 Panel Administrativo

El administrador podrá administrar:

- Usuarios.
- Propietarios.
- Propiedades.
- Reservas.
- Pagos.
- Comisiones.
- Reportes.

---

# RF-021 Reportes

El sistema generará reportes sobre:

- Reservas.
- Ingresos.
- Comisiones.
- Propiedades más visitadas.
- Propiedades más reservadas.

---

# RF-022 Notificaciones

El sistema enviará notificaciones mediante:

- Correo electrónico.
- WhatsApp (futuro).

---

# RF-023 Responsive Design

La plataforma deberá funcionar correctamente desde:

- Computador.
- Tablet.
- Celular.

---

# RF-024 Seguridad

El sistema deberá garantizar:

- Autenticación segura.
- Encriptación de contraseñas.
- Protección contra accesos no autorizados.

---

# RF-025 Escalabilidad

La arquitectura permitirá agregar nuevos módulos sin afectar los existentes.