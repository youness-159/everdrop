import Field from "../../../ui/Field.jsx";
import SelectInput from "../../../ui/inputs/SelectInput.jsx";
import { provinceOptions } from "../../../utils/helpers.js";
import AdminTable from "../../../features/admin/admin-table/AdminTable.jsx";
import Form from "../../../ui/Form.jsx";
import Button from "../../../ui/buttons/Button.jsx";
import { useForm } from "react-hook-form";

function TaxSetting() {
  const attributes2 = {
    headerRow: ["Name", "Rate", "Compound", "Priority", "Action"],
    bodyRows: [
      ["VAT", "10%", "No", "0", "EditDelete"],
      ["Hungary", "27%", "No", "1", "EditDelete"],
    ],
  };

  const { register, handleSubmit } = useForm();

  function onSubmit(data) {
    console.log(data);
  }

  return (
    <>
      <div className={"space-y-6"}>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Field legend={"Basic Configuration"}>
            <div className={"w-full"}>
              <SelectInput
                label={"Shipping tax class"}
                defaultValue={"Shipping tax class"}
                name={"shipping"}
                options={provinceOptions}
                className={"bg-white"}
                register={register}
              />
            </div>
            <div className={"w-full"}>
              <SelectInput
                label={"Shipping tax class"}
                name={"taxClass"}
                options={provinceOptions}
                className={"bg-white"}
                register={register}
              />
            </div>
            <Button className="filled w-full">Save</Button>
          </Field>
        </Form>
        <Form>
          <Field legend={"Tax Classes"}>
            <AdminTable
              tableData={attributes2}
              className={"text-start"}
              headerColumnsClassName={"text-start"}
              noFooter={"noFooter"}
            />
            <Button className="filled w-full">Create New Tax Class</Button>
          </Field>
        </Form>
      </div>
    </>
  );
}

export default TaxSetting;
