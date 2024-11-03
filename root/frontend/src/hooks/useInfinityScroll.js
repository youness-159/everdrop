import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

function useInfinityScroll(queryFn) {
  const [data, setData] = useState([]);
  const [hasMore, setHasMore] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    setIsLoading(true);
    queryFn()
      .then((res) => {
        setData(res);
        setHasMore(res.length > 0);
        setPageNumber((prevNmber) => ++prevNmber);
        setIsLoading(false);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [searchParams, queryFn]);

  return { data, isLoading, hasMore, pageNumber };
}

export default useInfinityScroll;
