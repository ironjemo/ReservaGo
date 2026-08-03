import {
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';

import { JwtService } from '@nestjs/jwt';

import { PrismaService } from '../prisma/prisma.service';

import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly jwtService: JwtService,
    ) { }

    /**
     * ============================================================
     * VALIDAR USUARIO
     * ============================================================
     *
     * Busca el usuario por correo.
     * Todavía NO validaremos la contraseña.
     * Eso será el siguiente paso con bcrypt.
     * ============================================================
     */
    async validarUsuario(
        correo: string,
        password: string,
    ) {
        /**
         * Buscar el usuario por correo.
         */
        const usuario =
            await this.prisma.usuario.findUnique({
                where: {
                    correo,
                },
            });

        /**
         * Usuario inexistente.
         */
        if (!usuario) {
            throw new UnauthorizedException(
                'Correo o contraseña incorrectos.',
            );
        }

        /**
         * Usuario inactivo.
         */
        if (!usuario.activo) {
            throw new UnauthorizedException(
                'El usuario está inactivo.',
            );
        }

        /**
         * ============================================================
         * IMPORTANTE
         * ============================================================
         *
         * En este sprint todavía NO usamos bcrypt.
         * Por ahora simplemente comparamos el texto plano.
         *
         * En el siguiente paso reemplazaremos esta comparación
         * por bcrypt.compare().
         * ============================================================
         */
        const passwordValido = await bcrypt.compare(
            password,
            usuario.password,
        );

        if (!passwordValido) {
            throw new UnauthorizedException(
                'Correo o contraseña incorrectos.',
            );
        }

        /**
 * ============================================================
 * GENERAR EL PAYLOAD DEL JWT
 * ============================================================
 */
        const payload = {
            sub: usuario.id,
            correo: usuario.correo,
            rol: usuario.rol,
        };

        /**
         * ============================================================
         * GENERAR EL TOKEN
         * ============================================================
         */
        const token = await this.jwtService.signAsync(payload);

        /**
         * ============================================================
         * RETORNAR EL TOKEN Y LA INFORMACIÓN BÁSICA
         * ============================================================
         */
        return {
            access_token: token,

            usuario: {
                id: usuario.id,
                nombre: usuario.nombre,
                apellido: usuario.apellido,
                correo: usuario.correo,
                rol: usuario.rol,
            },
        };
    }
}