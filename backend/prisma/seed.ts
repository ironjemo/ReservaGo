import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Iniciando carga de datos...");

  // Departamento
  const antioquia = await prisma.departamento.create({
    data: {
      nombre: "Antioquia",
    },
  });

  // Municipios
  await prisma.municipio.createMany({
    data: [
      { nombre: "Medellín", departamentoId: antioquia.id },
      { nombre: "Guatapé", departamentoId: antioquia.id },
      { nombre: "El Peñol", departamentoId: antioquia.id },
      { nombre: "Santa Fe de Antioquia", departamentoId: antioquia.id },
      { nombre: "Jardín", departamentoId: antioquia.id },
      { nombre: "Jericó", departamentoId: antioquia.id },
      { nombre: "San Rafael", departamentoId: antioquia.id },
      { nombre: "Sopetrán", departamentoId: antioquia.id },
    ],
  });

  // Tipos de propiedad
  await prisma.tipoPropiedad.createMany({
    data: [
      { nombre: "Apartamento" },
      { nombre: "Casa" },
      { nombre: "Finca" },
      { nombre: "Cabaña" },
      { nombre: "Glamping" },
      { nombre: "Hotel" },
      { nombre: "Apartaestudio" },
    ],
  });

  console.log("✅ Datos cargados correctamente.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });