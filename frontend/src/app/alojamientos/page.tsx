"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

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
};

export default function AlojamientosPage() {
    const [propiedades, setPropiedades] = useState<Propiedad[]>([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function cargarPropiedades() {
            try {
                const respuesta = await fetch(
                    "http://localhost:3000/properties",
                );

                if (!respuesta.ok) {
                    throw new Error(
                        "No fue posible obtener los alojamientos.",
                    );
                }

                const datos: Propiedad[] = await respuesta.json();

                setPropiedades(datos);
            } catch (error) {
                console.error(error);

                setError(
                    "No fue posible cargar los alojamientos.",
                );
            } finally {
                setCargando(false);
            }
        }

        cargarPropiedades();
    }, []);

    if (cargando) {
        return (
            <main className="min-h-screen bg-white px-8 py-16">
                <div className="mx-auto max-w-7xl">
                    <p className="text-lg text-slate-600">
                        Cargando alojamientos...
                    </p>
                </div>
            </main>
        );
    }

    if (error) {
        return (
            <main className="min-h-screen bg-white px-8 py-16">
                <div className="mx-auto max-w-7xl">
                    <p className="text-lg text-red-600">
                        {error}
                    </p>
                </div>
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-white px-8 py-16">
            <div className="mx-auto max-w-7xl">

                <div className="mb-10">
                    <p className="mb-2 font-semibold uppercase tracking-wide text-teal-700">
                        Explora Antioquia
                    </p>

                    <h1 className="text-4xl font-bold text-slate-950">
                        Alojamientos
                    </h1>

                    <p className="mt-3 max-w-2xl text-lg text-slate-600">
                        Encuentra fincas, casas campestres y apartamentos
                        disponibles para tu próxima escapada.
                    </p>
                </div>

                {propiedades.length === 0 ? (
                    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-10 text-center">
                        <p className="text-lg text-slate-600">
                            No hay alojamientos disponibles.
                        </p>
                    </div>
                ) : (
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">

                        {propiedades.map((propiedad) => (
                            <article
                                key={propiedad.id}
                                className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:shadow-md"
                            >

                                <div className="flex h-56 items-center justify-center bg-teal-50">
                                    <span className="text-5xl">
                                        🏡
                                    </span>
                                </div>

                                <div className="p-6">

                                    <div className="mb-3">
                                        <p className="text-sm font-semibold uppercase tracking-wide text-teal-700">
                                            {propiedad.tipoPropiedad.nombre}
                                        </p>

                                        <h2 className="mt-1 text-2xl font-bold text-slate-950">
                                            {propiedad.nombre}
                                        </h2>

                                        <p className="mt-1 text-slate-500">
                                            {propiedad.municipio.nombre}
                                        </p>
                                    </div>

                                    <p className="line-clamp-2 text-slate-600">
                                        {propiedad.descripcion}
                                    </p>

                                    <div className="mt-5 grid grid-cols-3 gap-2 border-y border-slate-100 py-4 text-sm text-slate-600">
                                        <span>
                                            👥 {propiedad.capacidad}
                                        </span>

                                        <span>
                                            🛏️ {propiedad.habitaciones}
                                        </span>

                                        <span>
                                            🚿 {propiedad.banos}
                                        </span>
                                    </div>

                                    <div className="mt-5 flex items-end justify-between">

                                        <div>
                                            <p className="text-sm text-slate-500">
                                                Desde
                                            </p>

                                            <p className="text-xl font-bold text-slate-950">
                                                $
                                                {Number(
                                                    propiedad.precioNoche,
                                                ).toLocaleString("es-CO")}
                                            </p>

                                            <p className="text-sm text-slate-500">
                                                por noche
                                            </p>
                                        </div>

                                        <Link
                                            href={`/alojamientos/${propiedad.id}`}
                                            className="rounded-xl bg-teal-700 px-5 py-3 font-semibold text-white transition hover:bg-teal-800"
                                        >
                                            Ver alojamiento
                                        </Link>

                                    </div>

                                </div>
                            </article>
                        ))}

                    </div>
                )}

            </div>
        </main>
    );
}