import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";
import { getProducts } from "@/services/getProducts";
import { setProductsToDb } from "@/services/setProductToDB";
export async function GET() {
  const products = await getProducts();
  const loadProducts = await setProductsToDb(products);
  return NextResponse.json({ loadProducts });
}
