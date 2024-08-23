import prisma from "@/db";

export const setProductsToDb = async (data) => {
  return new Promise(async (resolve, reject) => {
    const saveDataToDb = data.map(async (item) => {
      const {
        active,
        id,
        activeVariant,
        variantId,
        sku,
        ean,
        name,
        variantName,
      } = item;

      return await prisma.Product.upsert({
        where: { id: parseInt(id + variantId) },
        create: {
          id: parseInt(id + variantId),
          active,
          productId: id,
          activeVariant,
          variantId,
          sku,
          ean,
          name,
          variantName,
        },
        update: {
          active,
          activeVariant,
          sku,
          ean,
          name,
          variantName,
        },
      });
    });
    const savedProducts = await Promise.all(saveDataToDb);
    resolve(savedProducts);
  });
};
