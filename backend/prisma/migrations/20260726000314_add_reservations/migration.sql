-- CreateTable
CREATE TABLE "public"."Reserva" (
    "id" SERIAL NOT NULL,
    "fechaEntrada" TIMESTAMP(3) NOT NULL,
    "fechaSalida" TIMESTAMP(3) NOT NULL,
    "cantidadPersonas" INTEGER NOT NULL,
    "valorTotal" DECIMAL(10,2) NOT NULL,
    "estado" TEXT NOT NULL DEFAULT 'PENDIENTE',
    "usuarioId" INTEGER NOT NULL,
    "propiedadId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Reserva_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."Reserva" ADD CONSTRAINT "Reserva_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "public"."Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Reserva" ADD CONSTRAINT "Reserva_propiedadId_fkey" FOREIGN KEY ("propiedadId") REFERENCES "public"."Propiedad"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
