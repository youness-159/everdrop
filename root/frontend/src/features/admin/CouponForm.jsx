import { useForm } from "react-hook-form";
import Form from "../../ui/Form.jsx";
import FormButtons from "../../ui/FormButtons.jsx";
import Field from "../../ui/Field.jsx";
import Input from "../../ui/inputs/Input.jsx";
import RadioDoubleInputs from "../../ui/inputs/RadioDoubleInputs.jsx";
import SelectInput from "../../ui/inputs/SelectInput.jsx";
import { useState } from "react";
import useProducts from "../../hooks/products/useProducts.js";
import MultiProductSelect from "../../ui/MultiProductSelect.jsx";
import CheckboxInput from "../../ui/inputs/CheckboxInput.jsx";

function CouponForm({ defaultValues, mutate }) {
  const [selectedProducts, setSelectedProducts] = useState([]);

  const { register, handleSubmit, errors } = useForm({
    defaultValues: defaultValues,
  });

  function onSubmit(data) {
    data.products = selectedProducts.map((product) => product.value);
    mutate(data);
  }

  return (
    <Form className={"space-y-10"} onSubmit={handleSubmit(onSubmit)}>
      <GeneralField
        register={register}
        selectedProducts={selectedProducts}
        setSelectedProducts={setSelectedProducts}
      />
      <SpecificationField register={register} />
      <FormButtons />
    </Form>
  );
}

export default CouponForm;

function GeneralField({ register, selectedProducts, setSelectedProducts }) {
  const discountTypeOptions = [
    { name: "Percentage Discount", value: "percentage" },
    { name: "Fixed Discount", value: "fixed" },
  ];
  const [discountType, setDiscountType] = useState("percentage");
  const [selectCouponFor, setSelectCouponFor] = useState("all");

  return (
    <Field>
      <SelectInput
        label={"Apply coupon to"}
        options={[
          { name: "All Products", value: "all" },
          {
            name: "Specific Product",
            value: "specific",
          },
        ]}
        onChange={(e) => setSelectCouponFor(e.target.value)}
      />

      {selectCouponFor === "specific" && (
        <MultiProductSelect
          selectedProducts={selectedProducts}
          setSelectedProducts={setSelectedProducts}
        />
      )}

      <Input
        label={"Coupon Code"}
        placeholder={"Coupon Code"}
        name={"code"}
        register={register}
      />
      <div className={"flex gap-6 mb-6"}>
        <SelectInput
          options={discountTypeOptions}
          onChange={(e) => setDiscountType(e.target.value)}
          name={"discountType"}
          register={register}
        />
        {discountType === "percentage" && (
          <Input
            placeholder={"Enter The Percentage"}
            type={"number"}
            icon={"%"}
            name={"discountAmount"}
            register={register}
          />
        )}
        {discountType === "fixed" && (
          <Input
            placeholder={"Enter The Price"}
            type={"number"}
            icon={"USD"}
            name={"discountAmount"}
            register={register}
          />
        )}
      </div>

      <RadioDoubleInputs
        label={"Status"}
        name={"status"}
        titles={["Disable", "Enable"]}
        values={[0, 1]}
        register={register}
      />
    </Field>
  );
}

function SpecificationField({ register }) {
  const [isUseLimit, setIsUseLimit] = useState(false);

  function onUseLimitCheckBoxValueChange() {
    setIsUseLimit((value) => !value);
  }

  return (
    <Field>
      <div>
        <CheckboxInput
          label={"Limit the total number of times this coupon can be used"}
          size={19}
          onChange={onUseLimitCheckBoxValueChange}
        />
        {isUseLimit && (
          <Input
            placeholder={"Limit Value"}
            className={"mt-3 w-44"}
            name={"useLimit"}
            register={register}
            type={"number"}
          />
        )}
      </div>
      <div className={"flex justify-between gap-6"}>
        <Input
          className={"w-full text-slate-600"}
          label={"Start Date"}
          placeholder={"Start Date"}
          name={"startDate"}
          type={"date"}
          register={register}
        />
        <Input
          className={"w-full text-slate-600"}
          label={"End Date"}
          placeholder={"End Date"}
          name={"endDate"}
          type={"date"}
          register={register}
        />
      </div>
    </Field>
  );
}

function ProductSelectInput({ register }) {
  const { products, isLoading } = useProducts();

  if (isLoading) return null;

  return (
    <SelectInput
      options={products.map((product) => ({
        name: product.name,
        value: product._id,
      }))}
      name={"product"}
      register={register}
      label={"Select Product"}
    />
  );
}
