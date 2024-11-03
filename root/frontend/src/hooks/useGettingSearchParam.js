import { useSearchParams } from "react-router-dom";

function useGettingSearchParam(params) {
  const [searchParams] = useSearchParams();
  return searchParams.get(params);
}

export default useGettingSearchParam;
