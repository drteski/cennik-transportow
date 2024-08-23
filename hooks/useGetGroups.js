"use client";

import axios from "axios";
import { useQuery } from "@tanstack/react-query";

const useGetGroups = () => {
  const getGroups = async () => {
    return await axios
      .get("/api/group")
      .then((res) => res.data.group)
      .catch((error) => ({
        message: error,
      }));
  };

  const { data, isLoading } = useQuery({
    queryKey: ["groups"],
    queryFn: getGroups,
  });
  return { data, isLoading };
};

export default useGetGroups;
