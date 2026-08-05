/*
  Warnings:

  - Made the column `cantidadNoches` on table `Reserva` required. This step will fail if there are existing NULL values in that column.
  - Made the column `comision` on table `Reserva` required. This step will fail if there are existing NULL values in that column.
  - Made the column `precioNoche` on table `Reserva` required. This step will fail if there are existing NULL values in that column.
  - Made the column `subtotal` on table `Reserva` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "public"."Reserva" ALTER COLUMN "cantidadNoches" SET NOT NULL,
ALTER COLUMN "comision" SET NOT NULL,
ALTER COLUMN "precioNoche" SET NOT NULL,
ALTER COLUMN "subtotal" SET NOT NULL;
