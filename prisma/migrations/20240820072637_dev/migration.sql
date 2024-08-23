-- CreateTable
CREATE TABLE "Product" (
    "id" SERIAL NOT NULL,
    "active" BOOLEAN NOT NULL,
    "productId" INTEGER NOT NULL,
    "activeVariant" BOOLEAN NOT NULL,
    "variantId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "variantName" TEXT NOT NULL,
    "sku" TEXT NOT NULL,
    "ean" TEXT NOT NULL,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Group" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Group_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_GroupToProduct" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Product_variantId_key" ON "Product"("variantId");

-- CreateIndex
CREATE UNIQUE INDEX "_GroupToProduct_AB_unique" ON "_GroupToProduct"("A", "B");

-- CreateIndex
CREATE INDEX "_GroupToProduct_B_index" ON "_GroupToProduct"("B");

-- AddForeignKey
ALTER TABLE "_GroupToProduct" ADD CONSTRAINT "_GroupToProduct_A_fkey" FOREIGN KEY ("A") REFERENCES "Group"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_GroupToProduct" ADD CONSTRAINT "_GroupToProduct_B_fkey" FOREIGN KEY ("B") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;
