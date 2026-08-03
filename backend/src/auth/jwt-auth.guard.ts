import { Injectable } from '@nestjs/common';

import { AuthGuard } from '@nestjs/passport';

/**
 * ============================================================
 * JWT AUTH GUARD
 * ============================================================
 *
 * Este guard protege los endpoints utilizando
 * la estrategia JWT.
 *
 * Si el token es válido:
 *      ✔ permite el acceso.
 *
 * Si el token no existe o es inválido:
 *      ✖ responde 401 Unauthorized.
 * ============================================================
 */
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}