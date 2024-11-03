import { useQueryClient } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";

function useFilter(category) {
  const queryClient = useQueryClient();
  const [searchParams, setSearchParams] = useSearchParams();

  function onSearchBy(searchBy) {
    return function onSearch(e) {
      searchParams.set(searchBy, e?.target?.value ?? e);
      if ((!e?.target?.value && e.target !== undefined) || e === "")
        searchParams.delete(searchBy);
      setSearchParams(searchParams);
      queryClient.invalidateQueries([category]);
    };
  }

  return { onSearchBy };
}

export default useFilter;
