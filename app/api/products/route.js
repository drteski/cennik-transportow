import prisma from "@/db";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export async function GET() {
  const products = await prisma.product.findMany({
    include: {
      Group: true,
    },
  });

  const preparedProducts = products
    .map((product) => {
      const {
        id,
        active,
        productId,
        activeVariant,
        variantId,
        name,
        variantName,
        sku,
        ean,
        Group,
      } = product;
      if (Group === null)
        return {
          group: "---",
          id,
          active,
          productId,
          activeVariant,
          variantId,
          name,
          variantName,
          sku,
          ean,
        };
      return {
        group: Group.name.toLowerCase(),
        id,
        active,
        productId,
        activeVariant,
        variantId,
        name,
        variantName,
        sku,
        ean,
      };
    })
    .sort((a, b) => a.id - b.id);

  return NextResponse.json({ products: preparedProducts });
}
export async function POST(request) {
  const { group, productsIds } = await request.json();
  const existingGroup = await prisma.group.findFirst({
    where: {
      name: group,
    },
  });
  const assignGroups = await prisma.product.updateMany({
    data: {
      groupId: existingGroup.id,
    },
    where: {
      id: {
        in: productsIds,
      },
    },
  });

  return NextResponse.json({ assignGroups });
}
