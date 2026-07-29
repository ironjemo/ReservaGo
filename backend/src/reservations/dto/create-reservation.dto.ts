/**
 * ============================================================
 * DTO PARA CREAR UNA RESERVA
 * ============================================================
 *
 * El cliente únicamente enviará la información necesaria
 * para realizar la reserva.
 *
 * El valorTotal NO será enviado desde el frontend.
 * Será calculado automáticamente por el backend.
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
   * Estado inicial.
   * Si no se envía, Prisma utilizará el valor por defecto.
   */
  estado?: string;

  /**
   * Cliente que realiza la reserva.
   */
  usuarioId!: number;

  /**
   * Propiedad que será reservada.
   */
  propiedadId!: number;
}