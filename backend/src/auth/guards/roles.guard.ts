import {
  CanActivate,
  ExecutionContext,
  Injectable,
} from '@nestjs/common';

import { Reflector } from '@nestjs/core';

import { ROLES_KEY } from '../decorators/roles.decorator';

/**
 * ============================================================
 * ROLES GUARD
 * ============================================================
 *
 * Verifica si el usuario autenticado posee
 * alguno de los roles permitidos.
 * ============================================================
 */
@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
  ) {}

  canActivate(context: ExecutionContext): boolean {
    /**
     * Obtener los roles definidos
     * mediante @Roles(...)
     */
    const roles = this.reflector.getAllAndOverride<string[]>(
      ROLES_KEY,
      [
        context.getHandler(),
        context.getClass(),
      ],
    );

    /**
     * Si el endpoint no define roles,
     * permitir el acceso.
     */
    if (!roles) {
      return true;
    }

    /**
     * Obtener el usuario autenticado
     * desde la petición.
     */
    const request = context.switchToHttp().getRequest();

    const usuario = request.user;

    /**
     * Validar que el usuario tenga
     * alguno de los roles permitidos.
     */
    return roles.includes(usuario.rol);
  }
}