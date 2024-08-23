-- DropIndex
DROP INDEX "Product_variantId_key";

-- AlterTable
ALTER TABLE "Product" ALTER COLUMN "productId" SET DATA TYPE TEXT,
ALTER COLUMN "variantId" SET DATA TYPE TEXT;
