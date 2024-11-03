import Field from "../../../ui/Field.jsx";
import AdminTable from "../../../features/admin/admin-table/AdminTable.jsx";
import { HiOutlineMapPin } from "react-icons/hi2";
import Button from "../../../ui/buttons/Button.jsx";
import AdminTableHeader from "../../../features/admin/admin-table/AdminTableHeader.jsx";
import AdminTableHeaderColumn from "../../../features/admin/admin-table/AdminTableHeaderColumn.jsx";
import AdminTableBody from "../../../features/admin/admin-table/AdminTableBody.jsx";
import AdminTableBodyRow from "../../../features/admin/admin-table/AdminTableBodyRow.jsx";
import AdminTableBodyColumn from "../../../features/admin/admin-table/AdminTableBodyColumn.jsx";

function ShippingSetting() {
  return (
    <>
      <div className={"space-y-8"}>
        <ShippingSettingField legend={"China"} country={"China"} />

        <Button className={"filled w-full"}>Add New Shipping Zone</Button>
      </div>
    </>
  );
}

export default ShippingSetting;

function ShippingSettingField({ legend, country, tableData }) {
  return (
    <Field legend={legend} edit={"edit"}>
      <div>
        <div className={"h-14 flex items-center gap-4"}>
          <HiOutlineMapPin className={"text-4xl text-zinc-700"} />
          <span className={"font-semibold text-slate-600"}>{country}</span>
        </div>
        <AdminTable
          tableData={tableData}
          className={"text-start"}
          headerColumnsClassName={"text-start"}
          noFooter={"noFooter"}
        />
        <AdminTable>
          <AdminTableHeader>
            <AdminTableHeaderColumn>Method</AdminTableHeaderColumn>
            <AdminTableHeaderColumn>Status</AdminTableHeaderColumn>
            <AdminTableHeaderColumn>Cost</AdminTableHeaderColumn>
            <AdminTableHeaderColumn>Condition</AdminTableHeaderColumn>
          </AdminTableHeader>
          <AdminTableBody>
            <AdminTableBodyRow>
              <AdminTableBodyColumn>Standard Delivery</AdminTableBodyColumn>
              <AdminTableBodyColumn>Enabled</AdminTableBodyColumn>
              <AdminTableBodyColumn>5.00</AdminTableBodyColumn>
              <AdminTableBodyColumn>None</AdminTableBodyColumn>
            </AdminTableBodyRow>
          </AdminTableBody>
        </AdminTable>
      </div>
    </Field>
  );
}
