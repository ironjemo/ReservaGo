/**
 * ============================================================
 * DTO PARA CREAR UNA RESERVA
 * ============================================================
 *
 * El cliente únicamente enviará la información necesaria
 * para solicitar la reserva.
 *
 * El usuario autenticado se obtiene desde el JWT.
 * El estado inicial será controlado por el backend.
 * Los valores financieros serán calculados automáticamente.
 * ============================================================
 */

export class CreateReservationDto {
  /**
   * Fecha de ingreso a la propiedad.
   */
  fechaEntrada!: Date;

  /**
   * Fecha de salida.
   */
  fechaSalida!: Date;

  /**
   * Número de personas.
   */
  cantidadPersonas!: number;

  /**
   * Propiedad que será reservada.
   */
  propiedadId!: number;
}