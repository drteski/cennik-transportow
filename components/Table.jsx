"use client";
import { TableBody, TableCell, TableRow } from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SvgSpinners90RingWithBg } from "@/app/page";

export const ProductsTable = ({ products, isLoading, currentPage, limit }) => {
  console.log(
    products.slice(currentPage * limit, currentPage * limit + limit).length
  );
  return (
    <>
      <TableBody>
        {isLoading ? (
          <TableRow>
            <TableCell className="text-center" colSpan={10}>
              <div className="flex items-center justify-center h-[calc(100dvh_-_330px)]">
                <SvgSpinners90RingWithBg className="h-24 w-24" />
              </div>
            </TableCell>
          </TableRow>
        ) : (
          products
            .slice(currentPage * limit, currentPage * limit + limit)
            .map((product) => {
              return (
                <TableRow key={product.id}>
                  <TableCell className="text-center">
                    <Checkbox />
                  </TableCell>
                  <TableCell>{product.productId}</TableCell>
                  <TableCell className="text-center">
                    <Checkbox className="" disabled checked={product.active} />
                  </TableCell>
                  <TableCell>{product.variantId}</TableCell>
                  <TableCell className="text-center">
                    <Checkbox
                      className=""
                      disabled
                      checked={product.activeVariant}
                    />
                  </TableCell>
                  <TableCell>{product.name}</TableCell>
                  <TableCell>{product.variantName}</TableCell>
                  <TableCell>{product.sku}</TableCell>
                  <TableCell>{product.ean}</TableCell>
                  <TableCell>
                    <Select>
                      <SelectTrigger className="max-w-[355px]">
                        <SelectValue placeholder="Wybierz grupę" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectItem value="apple">Apple</SelectItem>
                          <SelectItem value="banana">Banana</SelectItem>
                          <SelectItem value="blueberry">Blueberry</SelectItem>
                          <SelectItem value="grapes">Grapes</SelectItem>
                          <SelectItem value="pineapple">Pineapple</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </TableCell>
                </TableRow>
              );
            })
        )}
      </TableBody>
    </>
  );
};
