import {
  HiChevronDoubleLeft,
  HiChevronDoubleRight,
  HiChevronLeft,
  HiChevronRight,
} from "react-icons/hi";
import { Link } from "react-router-dom";
import PaginationInput from "./PaginationInput.jsx";
import { twMerge } from "tailwind-merge";
import { useForm } from "react-hook-form";
import useFilter from "../../../hooks/useFilter.jsx";
import { useEffect, useState } from "react";
import useGettingSearchParam from "../../../hooks/useGettingSearchParam.js";

function Paginator({ className, getRecordsFn }) {
  const { register, handleSubmit } = useForm();
  const { onSearchBy } = useFilter("products");

  function onSubmit(data) {
    onSearchBy("limit")(data.limit);
  }

  function onSubmitPageNumber(data) {
    onSearchBy("page")(data.page);
  }

  let prevPageValue = useGettingSearchParam("page");
  const [pageNumber, setPageNumber] = useState(1);

  function onPageIncrement() {
    onSearchBy("page")(++prevPageValue);
    setPageNumber(+prevPageValue);
  }

  function onPageDecrement() {
    onSearchBy("page")(prevPageValue > 1 ? --prevPageValue : prevPageValue);
    setPageNumber(+prevPageValue);
  }

  return (
    <div
      className={twMerge(
        "flex text-slate-500 justify-between items-center py-6 text-2xl",
        className,
      )}
    >
      <form className={"space-x-3"} onSubmit={handleSubmit(onSubmit)}>
        <span>Show</span>
        <PaginationInput name={"limit"} register={register} defaultValue={10} />
        <span>per page</span>
      </form>
      {getRecordsFn && <TableRecords getRecordsFn={getRecordsFn} />}
      <div className={"flex gap-4 items-center"}>
        <PaginationIcon onClick={onPageDecrement}>
          <HiChevronDoubleLeft />
        </PaginationIcon>
        <PaginationIcon onClick={onPageDecrement}>
          <HiChevronLeft />
        </PaginationIcon>
        <form action="" onSubmit={handleSubmit(onSubmitPageNumber)}>
          <PaginationInput
            name={"page"}
            defaultValue={pageNumber}
            register={register}
          />
        </form>
        <PaginationIcon onClick={onPageIncrement}>
          <HiChevronRight />
        </PaginationIcon>
        <PaginationIcon onClick={onPageIncrement}>
          <HiChevronDoubleRight />
        </PaginationIcon>
      </div>
    </div>
  );
}

export default Paginator;

function PaginationIcon({ children, to, onClick }) {
  return (
    <Link to={to} className={"p-3 text-3xl border bg-white rounded-full"}>
      <button onClick={onClick}>{children}</button>
    </Link>
  );
}

function TableRecords({ getRecordsFn }) {
  const [isLoading, setIsLoading] = useState(false);
  const [records, setRecords] = useState(0);

  useEffect(() => {
    setIsLoading(true);
    getRecordsFn()
      .then((res) => {
        setRecords(res);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [getRecordsFn]);

  if (isLoading) return <p>..</p>;
  return <p>{records} records</p>;
}
