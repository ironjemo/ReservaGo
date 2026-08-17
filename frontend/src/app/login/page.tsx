"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

type UsuarioLogin = {
    id: number;
    nombre: string;
    apellido: string;
    correo: string;
    rol: string;
};

type LoginResponse = {
    access_token?: string;
    token?: string;
    usuario?: UsuarioLogin;
    message?: string;
};

export default function LoginPage() {
    const router = useRouter();

    const [correo, setCorreo] = useState("");
    const [contrasena, setContrasena] = useState("");

    const [cargando, setCargando] = useState(false);
    const [error, setError] = useState("");

    const manejarLogin = async (
        evento: FormEvent<HTMLFormElement>,
    ) => {
        evento.preventDefault();

        setError("");

        const correoLimpio = correo.trim();

        if (!correoLimpio) {
            setError(
                "Por favor ingresa tu correo electrónico.",
            );
            return;
        }

        if (!contrasena) {
            setError(
                "Por favor ingresa tu contraseña.",
            );
            return;
        }

        try {
            setCargando(true);

            const response = await fetch(
                "http://localhost:3000/auth/login",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        correo: correoLimpio,
                        password: contrasena,
                    }),
                },
            );

            let data: LoginResponse = {};

            try {
                data = await response.json();
            } catch {
                data = {};
            }

            if (!response.ok) {
                throw new Error(
                    data.message ||
                        "El correo o la contraseña no son correctos.",
                );
            }

            /*
             * ========================================================
             * GUARDAR SESIÓN
             * ========================================================
             *
             * El backend devuelve:
             *
             * {
             *   access_token: "...",
             *   usuario: {
             *      id,
             *      nombre,
             *      apellido,
             *      correo,
             *      rol
             *   }
             * }
             *
             * Guardamos ambos datos para que el frontend pueda
             * reconocer al usuario autenticado en las siguientes
             * páginas.
             * ========================================================
             */

            const token = data.access_token || data.token;

            if (!token) {
                throw new Error(
                    "El servidor no devolvió el token de autenticación.",
                );
            }

            if (!data.usuario) {
                throw new Error(
                    "El servidor no devolvió la información del usuario.",
                );
            }

            localStorage.setItem(
                "reservago_token",
                token,
            );

            localStorage.setItem(
                "reservago_usuario",
                JSON.stringify(data.usuario),
            );

            /*
             * ========================================================
             * LOGIN EXITOSO
             * ========================================================
             */

            console.log(
                "Login exitoso. Sesión almacenada:",
                data.usuario,
            );

            router.push("/alojamientos");
        } catch (err) {
            console.error(
                "Error durante el login:",
                err,
            );

            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError(
                    "No fue posible iniciar sesión. Intenta nuevamente.",
                );
            }
        } finally {
            setCargando(false);
        }
    };

    return (
        <main className="min-h-screen bg-slate-50">
            <div className="mx-auto flex min-h-screen max-w-7xl items-center justify-center px-4 py-10 sm:px-6 lg:px-8">
                <div className="grid w-full max-w-5xl overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl lg:grid-cols-2">

                    {/* PANEL INFORMATIVO */}
                    <section className="hidden bg-teal-700 p-10 text-white lg:flex lg:flex-col lg:justify-between">
                        <div>
                            <Link
                                href="/"
                                className="inline-flex items-center gap-2 text-xl font-bold"
                            >
                                <span
                                    className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/15 text-2xl"
                                    aria-hidden="true"
                                >
                                    🏡
                                </span>

                                ReservaGo
                            </Link>

                            <div className="mt-16">
                                <p className="text-sm font-bold uppercase tracking-[0.18em] text-teal-100">
                                    Bienvenido nuevamente
                                </p>

                                <h1 className="mt-4 text-4xl font-bold leading-tight">
                                    Encuentra tu próximo lugar
                                    para descansar.
                                </h1>

                                <p className="mt-6 max-w-md text-lg leading-8 text-teal-50">
                                    Inicia sesión para consultar
                                    tus reservas y disfrutar de
                                    una experiencia sencilla al
                                    encontrar alojamientos en
                                    Antioquia.
                                </p>
                            </div>
                        </div>

                        <div className="rounded-2xl bg-white/10 p-5">
                            <p className="text-sm leading-6 text-teal-50">
                                ReservaGo conecta viajeros con
                                alojamientos disponibles de forma
                                rápida, clara y segura.
                            </p>
                        </div>
                    </section>

                    {/* FORMULARIO */}
                    <section className="p-6 sm:p-10 lg:p-12">

                        {/* MARCA MOBILE */}
                        <div className="mb-8 lg:hidden">
                            <Link
                                href="/"
                                className="inline-flex items-center gap-2 text-xl font-bold text-slate-950"
                            >
                                <span
                                    className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-100 text-2xl"
                                    aria-hidden="true"
                                >
                                    🏡
                                </span>

                                ReservaGo
                            </Link>
                        </div>

                        <div>
                            <p className="text-sm font-bold uppercase tracking-[0.18em] text-teal-700">
                                Cuenta
                            </p>

                            <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-950">
                                Iniciar sesión
                            </h2>

                            <p className="mt-3 text-slate-600">
                                Ingresa tus datos para acceder a
                                ReservaGo.
                            </p>
                        </div>

                        {/* ERROR */}
                        {error && (
                            <div
                                className="mt-6 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm leading-6 text-red-700"
                                role="alert"
                            >
                                <div className="flex gap-3">
                                    <span
                                        className="shrink-0 text-lg"
                                        aria-hidden="true"
                                    >
                                        ⚠️
                                    </span>

                                    <p>{error}</p>
                                </div>
                            </div>
                        )}

                        <form
                            onSubmit={manejarLogin}
                            className="mt-8 space-y-5"
                        >
                            {/* CORREO */}
                            <div>
                                <label
                                    htmlFor="correo"
                                    className="mb-2 block text-sm font-semibold text-slate-700"
                                >
                                    Correo electrónico
                                </label>

                                <input
                                    id="correo"
                                    name="correo"
                                    type="email"
                                    autoComplete="email"
                                    value={correo}
                                    onChange={(evento) =>
                                        setCorreo(
                                            evento.target.value,
                                        )
                                    }
                                    placeholder="ejemplo@correo.com"
                                    disabled={cargando}
                                    className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3.5 text-sm text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-teal-600 focus:ring-2 focus:ring-teal-100 disabled:cursor-not-allowed disabled:bg-slate-100"
                                />
                            </div>

                            {/* CONTRASEÑA */}
                            <div>
                                <div className="mb-2 flex items-center justify-between gap-4">
                                    <label
                                        htmlFor="contrasena"
                                        className="block text-sm font-semibold text-slate-700"
                                    >
                                        Contraseña
                                    </label>

                                    <button
                                        type="button"
                                        disabled
                                        className="text-xs font-semibold text-slate-400"
                                    >
                                        ¿Olvidaste tu contraseña?
                                    </button>
                                </div>

                                <input
                                    id="contrasena"
                                    name="contrasena"
                                    type="password"
                                    autoComplete="current-password"
                                    value={contrasena}
                                    onChange={(evento) =>
                                        setContrasena(
                                            evento.target.value,
                                        )
                                    }
                                    placeholder="Ingresa tu contraseña"
                                    disabled={cargando}
                                    className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3.5 text-sm text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-teal-600 focus:ring-2 focus:ring-teal-100 disabled:cursor-not-allowed disabled:bg-slate-100"
                                />
                            </div>

                            {/* BOTÓN */}
                            <button
                                type="submit"
                                disabled={cargando}
                                className="flex w-full items-center justify-center rounded-xl bg-teal-700 px-5 py-4 font-bold text-white transition hover:bg-teal-800 focus:outline-none focus:ring-2 focus:ring-teal-600 focus:ring-offset-2 disabled:cursor-not-allowed disabled:bg-teal-400"
                            >
                                {cargando ? (
                                    <>
                                        <span
                                            className="mr-3 h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white"
                                            aria-hidden="true"
                                        />

                                        Iniciando sesión...
                                    </>
                                ) : (
                                    "Iniciar sesión"
                                )}
                            </button>
                        </form>

                        {/* REGISTRO */}
                        <div className="mt-8 border-t border-slate-200 pt-6 text-center">
                            <p className="text-sm text-slate-600">
                                ¿Todavía no tienes una cuenta?
                            </p>

                            <Link
                                href="/registro"
                                className="mt-2 inline-flex font-bold text-teal-700 transition hover:text-teal-800"
                            >
                                Crear una cuenta
                            </Link>
                        </div>

                        {/* VOLVER */}
                        <div className="mt-6 text-center">
                            <Link
                                href="/alojamientos"
                                className="text-sm font-semibold text-slate-500 transition hover:text-teal-700"
                            >
                                ← Volver a alojamientos
                            </Link>
                        </div>

                    </section>
                </div>
            </div>
        </main>
    );
}