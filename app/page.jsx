"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useGetProducts from "@/hooks/useGetProducts";
import { ProductsTable } from "@/components/Table";
import { DataTable } from "@/components/DataTable";

export function SvgSpinners90RingWithBg(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        fill="currentColor"
        d="M12,1A11,11,0,1,0,23,12,11,11,0,0,0,12,1Zm0,19a8,8,0,1,1,8-8A8,8,0,0,1,12,20Z"
        opacity=".25"
      ></path>
      <path
        fill="currentColor"
        d="M10.14,1.16a11,11,0,0,0-9,8.92A1.59,1.59,0,0,0,2.46,12,1.52,1.52,0,0,0,4.11,10.7a8,8,0,0,1,6.66-6.61A1.42,1.42,0,0,0,12,2.69h0A1.57,1.57,0,0,0,10.14,1.16Z"
      >
        <animateTransform
          attributeName="transform"
          dur="0.75s"
          repeatCount="indefinite"
          type="rotate"
          values="0 12 12;360 12 12"
        ></animateTransform>
      </path>
    </svg>
  );
}
export default function Home() {
  const { data, isLoading } = useGetProducts();

  return (
    <main className="flex flex-col">
      <div className="py-4 px-4">
        <h1 className="text-3xl font-bold">MAPOWANIE GRUP TOWAROWYCH</h1>
      </div>
      <div className="px-4 h-[calc(100dvh_-_68px)] overflow-clip">
        {isLoading ? (
          <div className="flex items-center justify-center h-[calc(100dvh_-_68px)]">
            <SvgSpinners90RingWithBg className="h-24 w-24" />
          </div>
        ) : (
          <DataTable products={data} />
        )}

      </div>
    </main>
  );
}
