"use client";

import { useEffect, useState } from "react";
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
};

export default function DetalleAlojamientoPage() {
    const params = useParams();
    const id = params.id;

    const [propiedad, setPropiedad] = useState<Propiedad | null>(null);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        if (!id) return;

        const obtenerPropiedad = async () => {
            try {
                setCargando(true);
                setError("");

                const response = await fetch(
                    `http://localhost:3000/properties/${id}`,
                );

                if (!response.ok) {
                    throw new Error("No fue posible obtener el alojamiento.");
                }

                const data: Propiedad = await response.json();

                setPropiedad(data);
            } catch (err) {
                console.error(err);
                setError("No fue posible cargar el alojamiento.");
            } finally {
                setCargando(false);
            }
        };

        obtenerPropiedad();
    }, [id]);

    if (cargando) {
        return (
            <main
                style={{
                    minHeight: "100vh",
                    padding: "60px 36px",
                    fontFamily: "Arial, sans-serif",
                }}
            >
                <p>Cargando alojamiento...</p>
            </main>
        );
    }

    if (error || !propiedad) {
        return (
            <main
                style={{
                    minHeight: "100vh",
                    padding: "60px 36px",
                    fontFamily: "Arial, sans-serif",
                }}
            >
                <h1>Alojamiento no encontrado</h1>
                <p>{error}</p>
            </main>
        );
    }

    const caracteristicas = [
        propiedad.piscina && "Piscina",
        propiedad.jacuzzi && "Jacuzzi",
        propiedad.wifi && "WiFi",
        propiedad.parqueadero && "Parqueadero",
        propiedad.asador && "Asador",
        propiedad.aceptaMascotas && "Acepta mascotas",
    ].filter(Boolean);

    return (
        <main
            style={{
                minHeight: "100vh",
                background: "#ffffff",
                padding: "40px 36px 80px",
                fontFamily: "Arial, sans-serif",
            }}
        >
            <div
                style={{
                    maxWidth: "1200px",
                    margin: "0 auto",
                }}
            >
                {/* ENCABEZADO */}
                <div style={{ marginBottom: "30px" }}>
                    <p
                        style={{
                            margin: 0,
                            color: "#087f78",
                            fontWeight: 700,
                            textTransform: "uppercase",
                            fontSize: "14px",
                        }}
                    >
                        {propiedad.tipoPropiedad.nombre}
                    </p>

                    <h1
                        style={{
                            margin: "8px 0",
                            fontSize: "42px",
                            color: "#07162d",
                        }}
                    >
                        {propiedad.nombre}
                    </h1>

                    <p
                        style={{
                            margin: 0,
                            color: "#64748b",
                            fontSize: "18px",
                        }}
                    >
                        {propiedad.municipio.nombre}
                        {propiedad.direccion
                            ? ` · ${propiedad.direccion}`
                            : ""}
                    </p>
                </div>

                {/* IMAGEN TEMPORAL */}
                <div
                    style={{
                        height: "420px",
                        borderRadius: "20px",
                        background: "#effcfb",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "80px",
                        marginBottom: "40px",
                    }}
                >
                    🏡
                </div>

                {/* CONTENIDO */}
                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "2fr 1fr",
                        gap: "50px",
                        alignItems: "start",
                    }}
                >
                    {/* INFORMACIÓN */}
                    <section>
                        <h2
                            style={{
                                fontSize: "28px",
                                color: "#07162d",
                                marginBottom: "15px",
                            }}
                        >
                            Sobre este alojamiento
                        </h2>

                        <p
                            style={{
                                color: "#475569",
                                fontSize: "17px",
                                lineHeight: 1.7,
                            }}
                        >
                            {propiedad.descripcion}
                        </p>

                        {/* CAPACIDAD */}
                        <div
                            style={{
                                display: "grid",
                                gridTemplateColumns:
                                    "repeat(3, minmax(0, 1fr))",
                                gap: "15px",
                                marginTop: "30px",
                            }}
                        >
                            <div>
                                <strong>👥 Capacidad</strong>
                                <p>{propiedad.capacidad} personas</p>
                            </div>

                            <div>
                                <strong>🛏️ Habitaciones</strong>
                                <p>{propiedad.habitaciones}</p>
                            </div>

                            <div>
                                <strong>🚿 Baños</strong>
                                <p>{propiedad.banos}</p>
                            </div>
                        </div>

                        {/* CARACTERÍSTICAS */}
                        <h2
                            style={{
                                fontSize: "28px",
                                color: "#07162d",
                                marginTop: "40px",
                            }}
                        >
                            Características
                        </h2>

                        <div
                            style={{
                                display: "grid",
                                gridTemplateColumns:
                                    "repeat(2, minmax(0, 1fr))",
                                gap: "12px",
                                marginTop: "20px",
                            }}
                        >
                            {caracteristicas.map((caracteristica) => (
                                <div
                                    key={String(caracteristica)}
                                    style={{
                                        padding: "15px",
                                        border: "1px solid #e2e8f0",
                                        borderRadius: "10px",
                                        color: "#334155",
                                    }}
                                >
                                    ✓ {caracteristica}
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* TARJETA DE RESERVA */}
                    <aside
                        style={{
                            border: "1px solid #e2e8f0",
                            borderRadius: "18px",
                            padding: "25px",
                            boxShadow:
                                "0 10px 30px rgba(15, 23, 42, 0.08)",
                            position: "sticky",
                            top: "25px",
                        }}
                    >
                        <p
                            style={{
                                margin: 0,
                                color: "#64748b",
                            }}
                        >
                            Desde
                        </p>

                        <div
                            style={{
                                marginTop: "5px",
                                fontSize: "30px",
                                fontWeight: 700,
                                color: "#07162d",
                            }}
                        >
                            ${Number(propiedad.precioNoche).toLocaleString(
                                "es-CO",
                            )}
                        </div>

                        <p
                            style={{
                                marginTop: "4px",
                                color: "#64748b",
                            }}
                        >
                            por noche
                        </p>

                        <button
                            style={{
                                width: "100%",
                                marginTop: "25px",
                                padding: "15px",
                                border: "none",
                                borderRadius: "10px",
                                background: "#087f78",
                                color: "#ffffff",
                                fontSize: "16px",
                                fontWeight: 700,
                                cursor: "pointer",
                            }}
                        >
                            Reservar alojamiento
                        </button>
                    </aside>
                </div>
            </div>
        </main>
    );
}