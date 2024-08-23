/*
  Warnings:

  - You are about to drop the `_GroupToProduct` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_GroupToProduct" DROP CONSTRAINT "_GroupToProduct_A_fkey";

-- DropForeignKey
ALTER TABLE "_GroupToProduct" DROP CONSTRAINT "_GroupToProduct_B_fkey";

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "groupId" INTEGER;

-- DropTable
DROP TABLE "_GroupToProduct";

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "Group"("id") ON DELETE SET NULL ON UPDATE CASCADE;
