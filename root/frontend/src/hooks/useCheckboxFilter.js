import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";

function useCheckboxFilter(category, field) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState([]);
  const queryClient = useQueryClient();

  useEffect(() => {
    if (search.length > 0) searchParams.set(field + "[in]", search.join(","));
    else searchParams.delete(field + "[in]");

    setSearchParams(searchParams);
    queryClient.removeQueries([category]);
  }, [search, searchParams, setSearchParams, queryClient, category, field]);

  function onCheckboxChange(e) {
    const { payload } = e.target.dataset;

    if (e.target.checked) setSearch((bef) => [...bef, payload]);
    else setSearch((bef) => bef.filter((el) => el !== payload));
  }

  return onCheckboxChange;
}

export default useCheckboxFilter;
