import AdminOutletSectionHeader from "../../features/admin/AdminOutletSectionHeader.jsx";
import AdminTable from "../../features/admin/admin-table/AdminTable.jsx";
import Search from "../../ui/inputs/Search.jsx";
import SelectInput from "../../ui/inputs/SelectInput.jsx";
import { statusOptions } from "../../utils/helpers.js";
import FromToInputs from "../../ui/inputs/FromToInputs.jsx";
import {
  HiOutlineCalendarDays,
  HiOutlineCurrencyDollar,
} from "react-icons/hi2";
import { useForm } from "react-hook-form";
import AdminTableHeader from "../../features/admin/admin-table/AdminTableHeader.jsx";
import AdminTableHeaderColumn from "../../features/admin/admin-table/AdminTableHeaderColumn.jsx";
import AdminTableBody from "../../features/admin/admin-table/AdminTableBody.jsx";
import AdminTableBodyRow from "../../features/admin/admin-table/AdminTableBodyRow.jsx";
import AdminTableBodyColumn from "../../features/admin/admin-table/AdminTableBodyColumn.jsx";
import Paginator from "../../features/admin/admin-table/Paginator.jsx";
import Loader from "../../ui/Loader.jsx";
import useOrders from "../../hooks/orders/useOrders.js";
import { getOrdersLength } from "../../services/orderAPI.js";

function Orders() {
  const { orders, isLoading } = useOrders();

  if (isLoading) return <Loader />;
  console.log(orders);
  return (
    <>
      <AdminOutletSectionHeader title={"Orders"} />
      <OrdersFilter />
      <AdminTable>
        <AdminTableHeader>
          <AdminTableHeaderColumn>Order Number</AdminTableHeaderColumn>
          <AdminTableHeaderColumn>Date</AdminTableHeaderColumn>
          <AdminTableHeaderColumn>Customer Email</AdminTableHeaderColumn>
          <AdminTableHeaderColumn>Shipment Status</AdminTableHeaderColumn>
          <AdminTableHeaderColumn>Payment Status</AdminTableHeaderColumn>
          <AdminTableHeaderColumn>Total</AdminTableHeaderColumn>
        </AdminTableHeader>
        <AdminTableBody>
          {orders?.map((order) => (
            <AdminTableBodyRow key={order._id}>
              <AdminTableBodyColumn>
                {order.orderNumber ?? "??"}
              </AdminTableBodyColumn>
              <AdminTableBodyColumn>
                {new Date(order.createdAt).toLocaleDateString()}
              </AdminTableBodyColumn>
              <AdminTableBodyColumn>{order.user.email}</AdminTableBodyColumn>
              <AdminTableBodyColumn>
                {order.shipmentStatus ?? "??"}
              </AdminTableBodyColumn>
              <AdminTableBodyColumn>
                {order.paid ? "Paid" : "Unpaid"}
              </AdminTableBodyColumn>
              <AdminTableBodyColumn>${order.price}</AdminTableBodyColumn>
            </AdminTableBodyRow>
          ))}
        </AdminTableBody>
      </AdminTable>
      <Paginator getRecordsFn={getOrdersLength} />
    </>
  );
}

export default Orders;

function OrdersFilter() {
  const { register, handleSubmit } = useForm();

  return (
    <form className={"px-6 py-6 flex justify-between gap-[4%]"}>
      <Search placeholder={"Order"} className={"w-[35%]"} />
      <FromToInputs>
        <HiOutlineCalendarDays />
      </FromToInputs>
      <Search placeholder={"Email"} className={"w-[35%]"} />
      <SelectInput
        defaultValue={"Status"}
        options={statusOptions}
        name={"status"}
        register={register}
      />
      <SelectInput
        defaultValue={"Status"}
        options={statusOptions}
        name={"status"}
        register={register}
      />
      <FromToInputs>
        <HiOutlineCurrencyDollar />
      </FromToInputs>
    </form>
  );
}
