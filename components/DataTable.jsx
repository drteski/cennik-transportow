import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useEffect, useMemo, useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  CarbonCheckmark,
  CarbonChevronLeft,
  CarbonChevronRight,
  CarbonPageFirst,
  CarbonPageLast,
  CarbonSubtract,
} from "@/components/Icons";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useGetGroups from "@/hooks/useGetGroups";
import { Skeleton } from "@/components/ui/skeleton";
import { CaretSortIcon } from "@radix-ui/react-icons";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export const DataTable = ({ products }) => {
  const { data, isLoading } = useGetGroups();
  const [productsData, setProductsData] = useState(() => products);
  const [sorting, setSorting] = useState([]);
  // const rerender = useReducer(() => ({}), {})[1];
  const [rowSelection, setRowSelection] = useState({});
  // const [globalFilter, setGlobalFilter] = useState("");
  const [productGroup, setProductGroup] = useState([]);

  const queryClient = useQueryClient();

  const updateGroups = async (groupData) => {
    return await axios.post("/api/products", {
      ...groupData,
    });
  };

  const handleGroups = useMutation({
    mutationFn: updateGroups,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      queryClient.invalidateQueries({ queryKey: ["groups"] });
    },
  });

  const columns = useMemo(
    () => [
      {
        id: "select",
        header: ({ table }) => (
          <div className="flex flex-col justify-start items-center h-full">
            <Button
              variant="ghost"
              className="h-8 hover:bg-transparent p-0 text-xs mb-2"
            >
              All
            </Button>
            <div className="flex items-center justify-center">
              <IndeterminateCheckbox
                {...{
                  checked: table.getIsAllRowsSelected(),
                  indeterminate: table.getIsSomeRowsSelected(),
                  onChange: table.getToggleAllRowsSelectedHandler(),
                }}
              />
            </div>
          </div>
        ),
        cell: ({ row }) => (
          <div className="flex items-center justify-center">
            <IndeterminateCheckbox
              {...{
                checked: row.getIsSelected(),
                disabled: !row.getCanSelect(),
                indeterminate: row.getIsSomeSelected(),
                onChange: row.getToggleSelectedHandler(),
              }}
            />
          </div>
        ),
      },
      {
        accessorKey: "productId",
        header: (props) => (
          <div className="w-full">
            <Button
              variant="ghost"
              className="h-8 hover:bg-transparent p-0"
              onClick={() =>
                props.column.toggleSorting(props.column.getIsSorted() === "asc")
              }
            >
              <span className="block text-xs">Product ID</span>
              <CaretSortIcon className="ml-1 h-4 w-4" />
            </Button>
          </div>
        ),
        cell: (info) => info.getValue(),
        footer: (props) => props.column.id,
      },
      {
        accessorKey: "active",
        header: (props) => (
          <div className="w-full">
            <Button
              variant="ghost"
              className="h-8 hover:bg-transparent p-0"
              onClick={() =>
                props.column.toggleSorting(props.column.getIsSorted() === "asc")
              }
            >
              <span className="block text-xs">Active</span>
              <CaretSortIcon className="ml-1 h-4 w-4" />
            </Button>
          </div>
        ),
        cell: (info) => <Checkbox checked={info.getValue()} disabled />,
        footer: (props) => props.column.id,
      },
      {
        accessorKey: "variantId",
        header: (props) => (
          <div className="w-full">
            <Button
              variant="ghost"
              className="h-8 hover:bg-transparent p-0"
              onClick={() =>
                props.column.toggleSorting(props.column.getIsSorted() === "asc")
              }
            >
              <span className="block text-xs">Variant ID</span>
              <CaretSortIcon className="ml-1 h-4 w-4" />
            </Button>
          </div>
        ),
        cell: (info) => info.getValue(),
        footer: (props) => props.column.id,
      },
      {
        accessorKey: "activeVariant",
        header: (props) => (
          <div className="w-full">
            <Button
              variant="ghost"
              className="h-8 hover:bg-transparent p-0"
              onClick={() =>
                props.column.toggleSorting(props.column.getIsSorted() === "asc")
              }
            >
              <span className="block text-xs">Active Variant</span>
              <CaretSortIcon className="ml-1 h-4 w-4" />
            </Button>
          </div>
        ),
        cell: (info) => <Checkbox checked={info.getValue()} disabled />,
        footer: (props) => props.column.id,
      },
      {
        accessorKey: "name",
        header: (props) => (
          <div className="w-full">
            <Button
              variant="ghost"
              className="h-8 hover:bg-transparent p-0"
              onClick={() =>
                props.column.toggleSorting(props.column.getIsSorted() === "asc")
              }
            >
              <span className="block text-xs">Name</span>
              <CaretSortIcon className="ml-1 h-4 w-4" />
            </Button>
          </div>
        ),
        cell: (info) => info.getValue(),
        footer: (props) => props.column.id,
      },
      {
        accessorKey: "variantName",
        header: (props) => (
          <div className="w-full">
            <Button
              variant="ghost"
              className="h-8 hover:bg-transparent p-0"
              onClick={() =>
                props.column.toggleSorting(props.column.getIsSorted() === "asc")
              }
            >
              <span className="block text-xs">Variant Name</span>
              <CaretSortIcon className="ml-1 h-4 w-4" />
            </Button>
          </div>
        ),
        cell: (info) => info.getValue(),
        footer: (props) => props.column.id,
      },
      {
        accessorKey: "sku",
        header: (props) => (
          <div className="w-full">
            <Button
              variant="ghost"
              className="h-8 hover:bg-transparent p-0"
              onClick={() =>
                props.column.toggleSorting(props.column.getIsSorted() === "asc")
              }
            >
              <span className="block text-xs">SKU</span>
              <CaretSortIcon className="ml-1 h-4 w-4" />
            </Button>
          </div>
        ),
        cell: (info) => info.getValue(),
        footer: (props) => props.column.id,
      },
      {
        accessorKey: "ean",
        header: (props) => (
          <div className="w-full">
            <Button
              variant="ghost"
              className="h-8 hover:bg-transparent p-0"
              onClick={() =>
                props.column.toggleSorting(props.column.getIsSorted() === "asc")
              }
            >
              <span className="block text-xs">EAN</span>
              <CaretSortIcon className="ml-1 h-4 w-4" />
            </Button>
          </div>
        ),
        cell: (info) => info.getValue(),
        footer: (props) => props.column.id,
      },
      {
        accessorKey: "group",
        header: (props) => (
          <div className="w-full">
            <Button
              variant="ghost"
              className="h-8 hover:bg-transparent p-0"
              onClick={() =>
                props.column.toggleSorting(props.column.getIsSorted() === "asc")
              }
            >
              <span className="block text-xs">Group</span>
              <CaretSortIcon className="ml-1 h-4 w-4" />
            </Button>
          </div>
        ),
        cell: (info) => (
          <>
            {isLoading ? (
              <Skeleton className="h-9 w-[295px]" />
            ) : (
              <Select
                value={
                  productGroup.findIndex(
                    (prod) => prod.id === info.row.original.id,
                  ) >= 0
                    ? productGroup[
                        productGroup.findIndex(
                          (prod) => prod.id === info.row.original.id,
                        )
                      ].name
                    : info.getValue()
                }
                onValueChange={(e) => {
                  handleGroups.mutate({
                    group: e.toUpperCase(),
                    productsIds: [info.row.original.id],
                  });
                  setProductGroup((prevState) => {
                    return [
                      { id: info.row.original.id, groupName: e },
                      ...prevState,
                    ];
                  });
                }}
              >
                <SelectTrigger className="w-[295px]">
                  <SelectValue placeholder="Wybierz grupę" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="---">---</SelectItem>
                    {data.map((item) => (
                      <SelectItem key={item.id} value={item.name.toLowerCase()}>
                        {item.name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            )}
          </>
        ),
        footer: (props) => props.column.id,
      },
    ],
    [data, productGroup],
  );

  const table = useReactTable({
    data: productsData,
    columns,
    state: {
      rowSelection,
      sorting,
    },
    enableRowSelection: true, //enable row selection for all rows
    // enableRowSelection: row => row.original.age > 18, // or enable row selection conditionally per row
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    // debugTable: true,
    initialState: {
      pagination: {
        pageSize: 25,
      },
      sorting: [{ id: "name", asc: true }],
    },
  });

  const headerWidthClasses = [3, 6, 5, 6, 7, 30, 14, 7, 7, 15];
  const textClasses = [
    "text-center text-[13px] truncate max-w-[566.39px]",
    "text-center text-[13px] truncate max-w-[566.39px]",
    "text-center text-[13px] truncate max-w-[566.39px]",
    "text-center text-[13px] truncate max-w-[566.39px]",
    "text-center text-[13px] truncate max-w-[566.39px]",
    "text-left text-[13px] truncate max-w-[566.39px]",
    "text-left text-[13px] truncate max-w-[566.39px]",
    "text-left text-[13px] truncate max-w-[566.39px]",
    "text-left text-[13px] truncate max-w-[566.39px]",
    "text-left text-[13px] truncate max-w-[566.39px]",
  ];

  return (
    <div>
      <div className="h-[calc(100dvh_-_68px_-_68px)] overflow-y-auto">
        <Table className="overflow-clip rounded-lg">
          <TableHeader className="sticky top-0 bg-gray-100 z-10">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header, index) => {
                  return (
                    <TableHead
                      className={`w-[${headerWidthClasses[index]}%] ${textClasses[index]} pt-2`}
                      key={header.id}
                      colSpan={header.colSpan}
                    >
                      {header.isPlaceholder ? null : (
                        <>
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                          {header.column.getCanFilter() ? (
                            <div className="mb-2">
                              <Filter
                                column={header.column}
                                table={table}
                                data={data}
                                isLoading={isLoading}
                              />
                            </div>
                          ) : null}
                        </>
                      )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.map((row) => {
              return (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell, index) => {
                    return (
                      <TableCell
                        key={cell.id}
                        className={`${textClasses[index]}`}
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
          <TableFooter className="sticky bottom-0 bg-gray-100">
            <TableRow>
              <TableCell className="p-1 text-center">
                <div className="flex items-center justify-center">
                  <IndeterminateCheckbox
                    {...{
                      checked: table.getIsAllPageRowsSelected(),
                      indeterminate: table.getIsSomePageRowsSelected(),
                      onChange: table.getToggleAllPageRowsSelectedHandler(),
                    }}
                  />
                </div>
              </TableCell>
              <TableCell colSpan={9}>
                Zaznacz wszystkie na stronie ({table.getRowModel().rows.length})
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </div>
      <div className="grid grid-cols-[1fr_auto_auto_auto_auto_168px] items-center gap-8 py-4">
        <div className="text-sm">
          Zaznaczonych {Object.keys(rowSelection).length} z{" "}
          {table.getFilteredRowModel().rows.length} Produktów
        </div>
        <div className="flex gap-2 items-center w-[700px]">
          <span className="text-sm">Edycja masowa</span>
          <div className="flex gap-2">
            {isLoading ? (
              <Skeleton className="h-9 w-[469px]" />
            ) : (
              <Select>
                <SelectTrigger className="w-[469px]">
                  <SelectValue placeholder="Wybierz grupę" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="---">---</SelectItem>
                    {data.map((item) => (
                      <SelectItem key={item.id} value={item.name.toLowerCase()}>
                        {item.name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            )}
            <Button className="w-28">Przypisz</Button>
          </div>
        </div>
        <Select
          value={table.getState().pagination.pageSize}
          onValueChange={(e) => {
            table.setPageSize(Number(e));
          }}
        >
          <SelectTrigger className="w-[125px]">
            <SelectValue placeholder="Select" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {[25, 50, 100, 200].map((pageSize) => (
                <SelectItem value={pageSize} key={pageSize}>
                  Pokaż {pageSize}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        <span className="flex items-center justify-end gap-1">
          <div>Strona</div>
          <strong>
            {table.getState().pagination.pageIndex + 1} z {table.getPageCount()}
          </strong>
        </span>
        <span className="flex items-center gap-1">
          Idź do:
          <Input
            type="number"
            min="1"
            max={table.getPageCount()}
            defaultValue={table.getState().pagination.pageIndex + 1}
            onChange={(e) => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0;
              table.setPageIndex(page);
            }}
            className="w-16"
          />
        </span>
        <div className="flex gap-2">
          <Button
            size="icon"
            className=""
            variant="outline"
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
          >
            <CarbonPageFirst />
          </Button>
          <Button
            size="icon"
            className=""
            variant="outline"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <CarbonChevronLeft />
          </Button>
          <Button
            size="icon"
            className=""
            variant="outline"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <CarbonChevronRight />
          </Button>
          <Button
            size="icon"
            className=""
            variant="outline"
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
          >
            <CarbonPageLast />
          </Button>
        </div>
      </div>

      {/*<hr />*/}
      {/*<br />*/}
      {/*<div>*/}
      {/*  <Button className="border rounded p-2 mb-2" onClick={() => rerender()}>*/}
      {/*    Force Rerender*/}
      {/*  </Button>*/}
      {/*</div>*/}
      {/*<div>*/}
      {/*  <Button*/}
      {/*    className="border rounded p-2 mb-2"*/}
      {/*    onClick={() => refreshData()}*/}
      {/*  >*/}
      {/*    Refresh Data*/}
      {/*  </Button>*/}
      {/*</div>*/}
      {/*<div>*/}
      {/*  <Button*/}
      {/*    className="border rounded p-2 mb-2"*/}
      {/*    onClick={() =>*/}
      {/*      console.info(*/}
      {/*        "table.getSelectedRowModel().flatRows",*/}
      {/*        table.getSelectedRowModel().flatRows*/}
      {/*      )*/}
      {/*    }*/}
      {/*  >*/}
      {/*    Log table.getSelectedRowModel().flatRows*/}
      {/*  </Button>*/}
      {/*</div>*/}
      {/*<div>*/}
      {/*  <label>Row Selection State:</label>*/}
      {/*  <pre>{JSON.stringify(table.getState().rowSelection, null, 2)}</pre>*/}
      {/*</div>*/}
    </div>
  );
};

function Filter({ column, table, data, isLoading }) {
  const firstValue = table
    .getPreFilteredRowModel()
    .flatRows[0]?.getValue(column.id);
  if (column.id === "group") {
    return (
      <>
        {isLoading ? (
          <Skeleton className="h-9 w-[295px]" />
        ) : (
          <Select
            value={
              column.getFilterValue() === "---" ? "" : column.getFilterValue()
            }
            onValueChange={(e) => {
              e === "---"
                ? column.setFilterValue("---")
                : column.setFilterValue(e);
            }}
          >
            <SelectTrigger className="w-[295px] bg-white">
              <SelectValue placeholder="Wybierz grupę" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="---">---</SelectItem>
                {data.map((item) => (
                  <SelectItem key={item.id} value={item.name.toLowerCase()}>
                    {item.name}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        )}
      </>
    );
  }
  if (typeof firstValue === "number") {
    return (
      <div className="flex space-x-2">
        <Input
          type="number"
          value={column.getFilterValue()?.[0] ?? ""}
          onChange={(e) =>
            column.setFilterValue((old) => [e.target.value, old?.[1]])
          }
          placeholder={`Min`}
          className="bg-white"
        />
        <Input
          type="number"
          value={column.getFilterValue()?.[1] ?? ""}
          onChange={(e) =>
            column.setFilterValue((old) => [old?.[0], e.target.value])
          }
          placeholder={`Max`}
          className="w-24bg-white"
        />
      </div>
    );
  }
  if (typeof firstValue === "string") {
    return (
      <Input
        type="text"
        value={column.getFilterValue() ?? ""}
        onChange={(e) => column.setFilterValue(e.target.value)}
        placeholder={`Szukaj...`}
        className="bg-white"
      />
    );
  }
  if (typeof firstValue === "boolean") {
    return (
      <Select
        value={
          column.getFilterValue() === "---" ? "" : `${column.getFilterValue()}`
        }
        onValueChange={(e) => {
          if (e === "undefined") {
            column.setFilterValue(undefined);
          } else {
            column.setFilterValue(e === "true");
          }
        }}
      >
        <SelectTrigger className="w-[100px] bg-white">
          <SelectValue placeholder="Select" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value="undefined">---</SelectItem>
            <SelectItem value="true">Active</SelectItem>
            <SelectItem value="false">Inactive</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    );
  }
}

function IndeterminateCheckbox({ indeterminate, className = "", ...rest }) {
  const ref = useRef(null);
  useEffect(() => {
    if (typeof indeterminate === "boolean") {
      ref.current.indeterminate = !rest.checked && indeterminate;
    }
  }, [ref, indeterminate]);

  return (
    <div className="relative">
      <input
        type="checkbox"
        ref={ref}
        className="h-4 w-4 shrink-0 cursor-pointer appearance-none z-1 rounded-sm border border-primary shadow focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 indeterminate:bg-gray-200 checked:bg-primary checked:text-primary-foreground"
        {...rest}
      />
      {rest.checked && (
        <CarbonCheckmark className="absolute top-[2px] left-[1px] text-white h-3.5 w-3.5 pointer-events-none" />
      )}
      {!rest.checked && indeterminate && (
        <CarbonSubtract className="absolute top-[1px] left-[1px] text-black h-3.5 w-3.5 pointer-events-none" />
      )}
    </div>
  );
}
