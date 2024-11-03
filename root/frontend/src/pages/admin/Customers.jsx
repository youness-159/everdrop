import AdminOutletSectionHeader from "../../features/admin/AdminOutletSectionHeader.jsx";
import AdminTable from "../../features/admin/admin-table/AdminTable.jsx";
import Search from "../../ui/inputs/Search.jsx";
import SelectInput from "../../ui/inputs/SelectInput.jsx";
import { statusOptions } from "../../utils/helpers.js";
import AdminTableHeader from "../../features/admin/admin-table/AdminTableHeader.jsx";
import AdminTableHeaderColumn from "../../features/admin/admin-table/AdminTableHeaderColumn.jsx";
import AdminTableBodyRow from "../../features/admin/admin-table/AdminTableBodyRow.jsx";
import AdminTableBodyColumn from "../../features/admin/admin-table/AdminTableBodyColumn.jsx";
import AdminTableBody from "../../features/admin/admin-table/AdminTableBody.jsx";
import Paginator from "../../features/admin/admin-table/Paginator.jsx";
import useFilter from "../../hooks/useFilter.jsx";
import Loader from "../../ui/Loader.jsx";
import useCustomers from "../../hooks/users/useUsers.js";
import { getUsersLength } from "../../services/userAPI.js";

function Customers() {
  const { customers, isLoading } = useCustomers();

  if (isLoading) return <Loader />;

  return (
    <>
      <AdminOutletSectionHeader title={"Customers"} />
      <CustomersFilter />
      <AdminTable>
        <AdminTableHeader>
          <AdminTableHeaderColumn>Full Name</AdminTableHeaderColumn>
          <AdminTableHeaderColumn>Email</AdminTableHeaderColumn>
          <AdminTableHeaderColumn>Status</AdminTableHeaderColumn>
          <AdminTableHeaderColumn>Created At</AdminTableHeaderColumn>
        </AdminTableHeader>
        <AdminTableBody>
          {customers?.map((customer) => (
            <AdminTableBodyRow key={customer._id}>
              <AdminTableBodyColumn>{customer.fullName}</AdminTableBodyColumn>
              <AdminTableBodyColumn>{customer.email}</AdminTableBodyColumn>
              <AdminTableBodyColumn>
                {customer.active ? "Active" : "Disactive"}
              </AdminTableBodyColumn>
              <AdminTableBodyColumn>
                {new Date(customer.createdAt).toLocaleDateString()}
              </AdminTableBodyColumn>
            </AdminTableBodyRow>
          ))}
        </AdminTableBody>
      </AdminTable>
      <Paginator getRecordsFn={getUsersLength} />
    </>
  );
}

export default Customers;

function CustomersFilter() {
  const { onSearchBy } = useFilter("users");

  return (
    <div className={"px-6 py-6 flex justify-between gap-[4%]"}>
      <Search
        placeholder={"Full Name"}
        onSearch={onSearchBy("username")}
        className={"w-[35%]"}
      />
      <Search
        placeholder={"Email"}
        onSearch={onSearchBy("email")}
        className={"w-[35%]"}
      />
      <SelectInput options={statusOptions} onChange={onSearchBy("status")} />
      {/*<SelectInput*/}
      {/*  defaultValue={"Status"}*/}
      {/*  options={statusOptions}*/}
      {/*  name={"status"}*/}
      {/*/>*/}
    </div>
  );
}
