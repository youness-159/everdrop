import AdminOutletSectionHeader from "../../../features/admin/AdminOutletSectionHeader.jsx";
import AdminTable from "../../../features/admin/admin-table/AdminTable.jsx";
import Search from "../../../ui/inputs/Search.jsx";
import SelectInput from "../../../ui/inputs/SelectInput.jsx";
import { statusOptions } from "../../../utils/helpers.js";
import FromToInputs from "../../../ui/inputs/FromToInputs.jsx";
import { HiOutlineCalendarDays, HiOutlineClock } from "react-icons/hi2";
import { useForm } from "react-hook-form";
import { useQuery } from "@tanstack/react-query";
import { getCoupons, getCouponsLength } from "../../../services/couponAPI.js";
import AdminTableHeader from "../../../features/admin/admin-table/AdminTableHeader.jsx";
import AdminTableHeaderColumn from "../../../features/admin/admin-table/AdminTableHeaderColumn.jsx";
import AdminTableBodyRow from "../../../features/admin/admin-table/AdminTableBodyRow.jsx";
import AdminTableBody from "../../../features/admin/admin-table/AdminTableBody.jsx";
import AdminTableBodyColumn from "../../../features/admin/admin-table/AdminTableBodyColumn.jsx";
import Paginator from "../../../features/admin/admin-table/Paginator.jsx";
import AdminTableOperations from "../../../features/admin/admin-table/AdminTableOperations.jsx";
import Loader from "../../../ui/Loader.jsx";
import useDeleteCoupon from "../../../hooks/coupons/useDeleteCoupon.js";

function Coupons() {
  const {
    data: coupons,
    error,
    isLoading,
  } = useQuery({ queryKey: ["coupons"], queryFn: getCoupons });

  if (isLoading) return <Loader />;

  return (
    <>
      <AdminOutletSectionHeader
        title={"Coupons"}
        buttonName={"Add coupon"}
        buttonLink={"new"}
      />
      <CouponsFilter />
      <AdminTable>
        <AdminTableHeader>
          <AdminTableHeaderColumn>Coupon Code</AdminTableHeaderColumn>
          <AdminTableHeaderColumn>Start Date</AdminTableHeaderColumn>
          <AdminTableHeaderColumn>End Date</AdminTableHeaderColumn>
          <AdminTableHeaderColumn>Status</AdminTableHeaderColumn>
          <AdminTableHeaderColumn>Used Times</AdminTableHeaderColumn>
        </AdminTableHeader>
        <AdminTableBody>
          {coupons?.map((coupon) => (
            <AdminTableBodyRow key={coupon._id}>
              <AdminTableBodyColumn>{coupon.code}</AdminTableBodyColumn>
              <AdminTableBodyColumn>{coupon.startDate}</AdminTableBodyColumn>
              <AdminTableBodyColumn>{coupon.endDate}</AdminTableBodyColumn>
              <AdminTableBodyColumn>
                {coupon.status ? "Enable" : "Disable"}
              </AdminTableBodyColumn>
              <AdminTableBodyColumn>{"??"}</AdminTableBodyColumn>
              <AdminTableBodyColumn>
                <CouponsTableOperations id={coupon._id} />
              </AdminTableBodyColumn>
            </AdminTableBodyRow>
          ))}
        </AdminTableBody>
      </AdminTable>
      <Paginator getRecordsFn={getCouponsLength} />
    </>
  );
}

export default Coupons;

function CouponsFilter() {
  const { register, handleSubmit } = useForm();

  function onSubmit(data) {
    console.log(data);
  }

  return (
    <form
      className={"px-6 py-6 flex justify-between gap-[4%]"}
      onSubmit={handleSubmit(onSubmit)}
    >
      <Search placeholder={"Coupon"} className={"w-[35%]"} />
      <FromToInputs>
        <HiOutlineCalendarDays />
      </FromToInputs>
      <FromToInputs>
        <HiOutlineCalendarDays />
      </FromToInputs>
      <SelectInput
        defaultValue={"Status"}
        options={statusOptions}
        name={"status"}
        register={register}
      />
      <FromToInputs>
        <HiOutlineClock />
      </FromToInputs>
    </form>
  );
}

function CouponsTableOperations({ id }) {
  const { mutate } = useDeleteCoupon();
  return <AdminTableOperations id={id} mutate={mutate} />;
}
