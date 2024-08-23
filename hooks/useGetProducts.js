"use client";

import axios from "axios";
import { useQuery } from "@tanstack/react-query";

const useGetProducts = () => {
  const getProducts = async () => {
    return await axios
      .get("/api/products")
      .then((res) => res.data.products)
      .catch((error) => ({
        message: error,
      }));
  };

  const { data, isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });
  return { data, isLoading };
};

export default useGetProducts;
