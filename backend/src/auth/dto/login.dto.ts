/**
 * ============================================================
 * DTO PARA INICIO DE SESIÓN
 * ============================================================
 *
 * Este DTO representa las credenciales enviadas
 * por el usuario para autenticarse.
 * ============================================================
 */
export class LoginDto {
  /**
   * Correo electrónico del usuario.
   */
  correo!: string;

  /**
   * Contraseña del usuario.
   */
  password!: string;
}