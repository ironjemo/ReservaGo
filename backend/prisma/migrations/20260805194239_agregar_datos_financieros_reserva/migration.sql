/*
  Warnings:

  - The `estado` column on the `Reserva` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "public"."EstadoReserva" AS ENUM ('PENDIENTE', 'CONFIRMADA', 'CANCELADA', 'FINALIZADA');

-- AlterTable
ALTER TABLE "public"."Reserva" ADD COLUMN     "cantidadNoches" INTEGER,
ADD COLUMN     "comision" DECIMAL(10,2),
ADD COLUMN     "precioNoche" DECIMAL(10,2),
ADD COLUMN     "subtotal" DECIMAL(10,2),
DROP COLUMN "estado",
ADD COLUMN     "estado" "public"."EstadoReserva" NOT NULL DEFAULT 'PENDIENTE';
