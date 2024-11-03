import { useQuery } from "@tanstack/react-query";
import { getTaxes } from "../../services/settings/taxAPI.js";

function UseTaxes() {
  const {
    data: taxes,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["taxes"],
    queryFn: getTaxes,
  });

  return { taxes, isLoading, error };
}

export default UseTaxes;
