"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";

type Propiedad = {
    id: number;
    nombre: string;
    descripcion: string;
    direccion: string | null;
    precioNoche: string;
    capacidad: number;
    habitaciones: number;
    banos: number;
    aceptaMascotas: boolean;
    piscina: boolean;
    jacuzzi: boolean;
    wifi: boolean;
    parqueadero: boolean;
    asador: boolean;
    estado: boolean;

    municipio: {
        id: number;
        nombre: string;
    };

    tipoPropiedad: {
        id: number;
        nombre: string;
        descripcion: string | null;
    };

    propietario: {
        id: number;
        nombre: string;
        apellido: string;
        correo: string;
        telefono?: string | null;
        whatsapp?: string | null;
        rol: string;
        activo: boolean;
    };
};

type Caracteristica = {
    icono: string;
    nombre: string;
};

export default function DetalleAlojamientoPage() {
    const params = useParams<{ id: string }>();
    const id = params.id;

    const [propiedad, setPropiedad] = useState<Propiedad | null>(null);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        if (!id) {
            return;
        }

        const obtenerPropiedad = async () => {
            try {
                setCargando(true);
                setError("");

                const response = await fetch(
                    `http://localhost:3000/properties/${id}`,
                );

                if (!response.ok) {
                    throw new Error(
                        "No fue posible obtener el alojamiento.",
                    );
                }

                const data: Propiedad = await response.json();

                setPropiedad(data);
            } catch (err) {
                console.error(err);

                setError(
                    "No fue posible cargar el alojamiento.",
                );
            } finally {
                setCargando(false);
            }
        };

        obtenerPropiedad();
    }, [id]);

    if (cargando) {
        return (
            <main className="min-h-screen bg-slate-50 px-4 py-16 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-7xl">
                    <div className="animate-pulse space-y-6">
                        <div className="h-4 w-24 rounded bg-slate-200" />

                        <div className="h-10 w-2/3 rounded bg-slate-200" />

                        <div className="h-5 w-1/2 rounded bg-slate-200" />

                        <div className="h-80 rounded-3xl bg-slate-200" />
                    </div>
                </div>
            </main>
        );
    }

    if (error || !propiedad) {
        return (
            <main className="flex min-h-screen items-center justify-center bg-slate-50 px-6">
                <div className="max-w-md rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
                    <div
                        className="mb-4 text-5xl"
                        aria-hidden="true"
                    >
                        🏡
                    </div>

                    <h1 className="text-2xl font-bold text-slate-950">
                        Alojamiento no encontrado
                    </h1>

                    <p className="mt-3 text-slate-600">
                        {error ||
                            "La propiedad solicitada no existe o ya no está disponible."}
                    </p>

                    <Link
                        href="/alojamientos"
                        className="mt-6 inline-flex rounded-xl bg-teal-700 px-5 py-3 font-semibold text-white transition hover:bg-teal-800"
                    >
                        Volver a alojamientos
                    </Link>
                </div>
            </main>
        );
    }

    const caracteristicas: Caracteristica[] = [
        propiedad.piscina && {
            icono: "🏊",
            nombre: "Piscina",
        },
        propiedad.jacuzzi && {
            icono: "🛁",
            nombre: "Jacuzzi",
        },
        propiedad.wifi && {
            icono: "📶",
            nombre: "WiFi",
        },
        propiedad.parqueadero && {
            icono: "🚗",
            nombre: "Parqueadero",
        },
        propiedad.asador && {
            icono: "🔥",
            nombre: "Asador",
        },
        propiedad.aceptaMascotas && {
            icono: "🐾",
            nombre: "Acepta mascotas",
        },
    ].filter(Boolean) as Caracteristica[];

    /*
     * ============================================================
     * WHATSAPP
     * ============================================================
     *
     * La API puede devolver whatsapp, telefono, ambos o ninguno.
     * Por eso primero obtenemos el valor disponible y verificamos
     * que exista antes de utilizar replace().
     */
    const contactoWhatsApp =
        propiedad.propietario.whatsapp?.trim() ||
        propiedad.propietario.telefono?.trim() ||
        "";

    const whatsappNumero = contactoWhatsApp.replace(/\D/g, "");

    const whatsappNumeroCompleto = whatsappNumero
        ? whatsappNumero.startsWith("57")
            ? whatsappNumero
            : `57${whatsappNumero}`
        : "";

    const whatsappUrl = whatsappNumeroCompleto
        ? `https://wa.me/${whatsappNumeroCompleto}`
        : null;

    /*
     * ============================================================
     * HUÉSPEDES
     * ============================================================
     */
    const cantidadHuespedesInicial =
        propiedad.capacidad >= 2 ? 2 : 1;

    /*
     * ============================================================
     * PRECIO
     * ============================================================
     */
    const precioFormateado = Number(
        propiedad.precioNoche,
    ).toLocaleString("es-CO");

    return (
        <main className="min-h-screen bg-slate-50">
            <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-10">

                {/* VOLVER */}
                <Link
                    href="/alojamientos"
                    className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-slate-600 transition hover:text-teal-700"
                >
                    <span aria-hidden="true">←</span>
                    Volver a alojamientos
                </Link>

                {/* ENCABEZADO */}
                <header className="mb-8">
                    <p className="text-sm font-bold uppercase tracking-[0.18em] text-teal-700">
                        {propiedad.tipoPropiedad.nombre}
                    </p>

                    <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl lg:text-5xl">
                        {propiedad.nombre}
                    </h1>

                    <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-slate-600 sm:text-base">
                        <span>
                            📍 {propiedad.municipio.nombre}
                        </span>

                        {propiedad.direccion && (
                            <>
                                <span className="hidden text-slate-300 sm:inline">
                                    •
                                </span>

                                <span>
                                    {propiedad.direccion}
                                </span>
                            </>
                        )}
                    </div>
                </header>

                {/* GALERÍA TEMPORAL */}
                <section
                    className="mb-10 overflow-hidden rounded-3xl"
                    aria-label="Galería del alojamiento"
                >
                    <div className="grid min-h-[320px] gap-2 sm:min-h-[420px] md:grid-cols-2">

                        <div
                            className="flex items-center justify-center bg-teal-100 text-8xl md:row-span-2"
                            aria-label="Imagen principal temporal"
                        >
                            🏡
                        </div>

                        <div
                            className="hidden items-center justify-center bg-teal-50 text-5xl md:flex"
                            aria-label="Imagen secundaria temporal"
                        >
                            🌳
                        </div>

                        <div
                            className="hidden items-center justify-center bg-emerald-50 text-5xl md:flex"
                            aria-label="Imagen secundaria temporal"
                        >
                            🌿
                        </div>

                    </div>
                </section>

                {/* CONTENIDO PRINCIPAL */}
                <div className="grid gap-10 lg:grid-cols-[minmax(0,2fr)_minmax(320px,1fr)]">

                    {/* COLUMNA IZQUIERDA */}
                    <div className="space-y-10">

                        {/* INFORMACIÓN PRINCIPAL */}
                        <section>
                            <div className="border-b border-slate-200 pb-6">
                                <h2 className="text-2xl font-bold text-slate-950 sm:text-3xl">
                                    Sobre este alojamiento
                                </h2>

                                <p className="mt-4 text-base leading-8 text-slate-600 sm:text-lg">
                                    {propiedad.descripcion}
                                </p>
                            </div>

                            {/* DATOS */}
                            <div className="grid grid-cols-1 divide-y divide-slate-200 py-6 sm:grid-cols-3 sm:divide-x sm:divide-y-0">

                                <div className="py-4 sm:px-5 sm:py-2">
                                    <p className="text-sm font-medium text-slate-500">
                                        Capacidad
                                    </p>

                                    <p className="mt-1 text-lg font-bold text-slate-950">
                                        👥 {propiedad.capacidad} personas
                                    </p>
                                </div>

                                <div className="py-4 sm:px-5 sm:py-2">
                                    <p className="text-sm font-medium text-slate-500">
                                        Habitaciones
                                    </p>

                                    <p className="mt-1 text-lg font-bold text-slate-950">
                                        🛏️ {propiedad.habitaciones}
                                    </p>
                                </div>

                                <div className="py-4 sm:px-5 sm:py-2">
                                    <p className="text-sm font-medium text-slate-500">
                                        Baños
                                    </p>

                                    <p className="mt-1 text-lg font-bold text-slate-950">
                                        🚿 {propiedad.banos}
                                    </p>
                                </div>

                            </div>
                        </section>

                        {/* CARACTERÍSTICAS */}
                        <section className="border-t border-slate-200 pt-8">
                            <h2 className="text-2xl font-bold text-slate-950">
                                Características
                            </h2>

                            {caracteristicas.length > 0 ? (
                                <div className="mt-6 grid gap-3 sm:grid-cols-2">

                                    {caracteristicas.map(
                                        (caracteristica) => (
                                            <div
                                                key={
                                                    caracteristica.nombre
                                                }
                                                className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-4"
                                            >
                                                <span
                                                    className="text-2xl"
                                                    aria-hidden="true"
                                                >
                                                    {
                                                        caracteristica.icono
                                                    }
                                                </span>

                                                <span className="font-medium text-slate-700">
                                                    {
                                                        caracteristica.nombre
                                                    }
                                                </span>
                                            </div>
                                        ),
                                    )}

                                </div>
                            ) : (
                                <p className="mt-5 text-slate-500">
                                    Esta propiedad no tiene
                                    características registradas.
                                </p>
                            )}
                        </section>

                        {/* PROPIETARIO */}
                        <section className="border-t border-slate-200 pt-8">
                            <h2 className="text-2xl font-bold text-slate-950">
                                Tu anfitrión
                            </h2>

                            <div className="mt-5 flex flex-col gap-5 rounded-2xl border border-slate-200 bg-white p-5 sm:flex-row sm:items-center sm:justify-between">

                                <div className="flex items-center gap-4">

                                    <div
                                        className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-teal-100 text-xl font-bold text-teal-800"
                                        aria-hidden="true"
                                    >
                                        {propiedad.propietario.nombre
                                            .charAt(0)
                                            .toUpperCase()}
                                    </div>

                                    <div>
                                        <p className="font-bold text-slate-950">
                                            {
                                                propiedad.propietario
                                                    .nombre
                                            }{" "}
                                            {
                                                propiedad.propietario
                                                    .apellido
                                            }
                                        </p>

                                        <p className="mt-1 text-sm text-slate-500">
                                            Propietario de la propiedad
                                        </p>
                                    </div>

                                </div>

                                {whatsappUrl ? (
                                    <a
                                        href={whatsappUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center justify-center gap-2 rounded-xl bg-green-600 px-5 py-3 font-semibold text-white transition hover:bg-green-700"
                                    >
                                        💬 Contactar por WhatsApp
                                    </a>
                                ) : (
                                    <span className="text-sm text-slate-500">
                                        Contacto no disponible
                                    </span>
                                )}

                            </div>
                        </section>

                        {/* UBICACIÓN */}
                        <section className="border-t border-slate-200 pt-8">
                            <h2 className="text-2xl font-bold text-slate-950">
                                Ubicación
                            </h2>

                            <div className="mt-5 rounded-2xl border border-slate-200 bg-white p-6">
                                <p className="text-lg font-semibold text-slate-950">
                                    📍 {propiedad.municipio.nombre}
                                </p>

                                {propiedad.direccion && (
                                    <p className="mt-2 text-slate-600">
                                        {propiedad.direccion}
                                    </p>
                                )}

                                <div className="mt-5 flex h-48 items-center justify-center rounded-xl bg-slate-100 text-slate-500">
                                    Mapa de ubicación
                                </div>
                            </div>
                        </section>

                    </div>

                    {/* TARJETA DE RESERVA */}
                    <aside className="lg:sticky lg:top-6 lg:self-start">

                        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-lg">

                            <p className="text-sm text-slate-500">
                                Desde
                            </p>

                            <div className="mt-1 flex items-baseline gap-2">
                                <span className="text-3xl font-bold text-slate-950">
                                    ${precioFormateado}
                                </span>

                                <span className="text-slate-500">
                                    / noche
                                </span>
                            </div>

                            <div className="my-6 border-t border-slate-200" />

                            {/* FECHAS */}
                            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">

                                <div>
                                    <label
                                        htmlFor="fechaEntrada"
                                        className="mb-2 block text-sm font-semibold text-slate-700"
                                    >
                                        Entrada
                                    </label>

                                    <input
                                        id="fechaEntrada"
                                        type="date"
                                        className="w-full rounded-xl border border-slate-300 px-3 py-3 text-sm outline-none transition focus:border-teal-600 focus:ring-2 focus:ring-teal-100"
                                    />
                                </div>

                                <div>
                                    <label
                                        htmlFor="fechaSalida"
                                        className="mb-2 block text-sm font-semibold text-slate-700"
                                    >
                                        Salida
                                    </label>

                                    <input
                                        id="fechaSalida"
                                        type="date"
                                        className="w-full rounded-xl border border-slate-300 px-3 py-3 text-sm outline-none transition focus:border-teal-600 focus:ring-2 focus:ring-teal-100"
                                    />
                                </div>

                            </div>

                            {/* HUÉSPEDES */}
                            <div className="mt-4">
                                <label
                                    htmlFor="huespedes"
                                    className="mb-2 block text-sm font-semibold text-slate-700"
                                >
                                    Huéspedes
                                </label>

                                <select
                                    id="huespedes"
                                    defaultValue={
                                        cantidadHuespedesInicial
                                    }
                                    className="w-full rounded-xl border border-slate-300 bg-white px-3 py-3 text-sm outline-none transition focus:border-teal-600 focus:ring-2 focus:ring-teal-100"
                                >
                                    {Array.from(
                                        {
                                            length: propiedad.capacidad,
                                        },
                                        (_, index) => index + 1,
                                    ).map((cantidad) => (
                                        <option
                                            key={cantidad}
                                            value={cantidad}
                                        >
                                            {cantidad}{" "}
                                            {cantidad === 1
                                                ? "huésped"
                                                : "huéspedes"}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* RESERVAR */}
                            <button
                                type="button"
                                className="mt-6 w-full rounded-xl bg-teal-700 px-5 py-4 font-bold text-white transition hover:bg-teal-800"
                            >
                                Reservar alojamiento
                            </button>

                            <p className="mt-4 text-center text-xs leading-5 text-slate-500">
                                Las fechas y el valor total se
                                calcularán antes de confirmar la
                                reserva.
                            </p>

                        </div>

                    </aside>

                </div>
            </div>
        </main>
    );
}