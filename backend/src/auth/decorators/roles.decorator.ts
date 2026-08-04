import { SetMetadata } from '@nestjs/common';

/**
 * ============================================================
 * ROLES DECORATOR
 * ============================================================
 *
 * Permite indicar qué roles pueden acceder
 * a un endpoint.
 *
 * Ejemplo:
 *
 * @Roles('ADMIN')
 *
 * o
 *
 * @Roles('PROPIETARIO')
 *
 * o
 *
 * @Roles('ADMIN', 'PROPIETARIO')
 * ============================================================
 */

export const ROLES_KEY = 'roles';

export const Roles = (...roles: string[]) =>
  SetMetadata(ROLES_KEY, roles);