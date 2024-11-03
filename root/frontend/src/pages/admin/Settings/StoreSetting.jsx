import SelectInput from "../../../ui/inputs/SelectInput.jsx";
import { provinceOptions } from "../../../utils/helpers.js";
import Input from "../../../ui/inputs/Input.jsx";
import Field from "../../../ui/Field.jsx";
import TextareaInput from "../../../ui/inputs/TextareaInput.jsx";
import Form from "../../../ui/Form.jsx";
import Button from "../../../ui/buttons/Button.jsx";
import { useForm } from "react-hook-form";
import countriesName from "../../../services/countriesName.js";
import Loader from "../../../ui/Loader.jsx";
import useStoreSettings from "../../../hooks/settings/store-settings/useStoreSettings.js";

function StoreSetting() {
  const { register, handleSubmit } = useForm();

  const { data, isLoading } = useStoreSettings();
  if (isLoading) return <Loader />;
  const storeSettings = data[0];

  console.log("store", storeSettings);

  function onSubmit(data) {
    console.log(data);
  }

  return (
    <>
      <Form className={"space-y-6"} onSubmit={handleSubmit(onSubmit)}>
        <Field legend={"Store Information"}>
          <Input
            type="text"
            placeholder=" Store Name"
            name={"name"}
            defaultValue={storeSettings.name}
            register={register}
          />
          <TextareaInput
            name={"description"}
            placeholder={"Store Description"}
            defaultValue={storeSettings.description}
            register={register}
          />
        </Field>
        <Field legend={"Contact Information"}>
          <Input
            type="text"
            placeholder=" Phone Number"
            name={"phoneNumber"}
            defaultValue={storeSettings.phoneNumber}
            register={register}
          />
          <Input
            type="email"
            placeholder=" Email"
            name={"email"}
            defaultValue={storeSettings.email}
            register={register}
          />
        </Field>
        <Field legend={"Address"}>
          <div className={"flex gap-4"}>
            <SelectInput
              defaultValue={StoreSetting.country}
              name={"country"}
              options={countriesName}
              className={"bg-white"}
              register={register}
            />
            <Input
              type="text"
              placeholder=" Store Address"
              name={"address"}
              defaultValue={storeSettings.address}
              className={"w-full"}
              register={register}
            />
          </div>
          <div className={"flex gap-4"}>
            <Input
              type="text"
              placeholder="City"
              name={"city"}
              defaultValue={storeSettings.city}
              register={register}
            />
            <SelectInput
              defaultValue={StoreSetting.province}
              name={"province"}
              options={provinceOptions}
              className={"bg-white"}
              register={register}
            />
            <Input
              type="text"
              placeholder="Postal Code"
              name={"postalCode"}
              defaultValue={storeSettings.postalCode}
              register={register}
            />
          </div>
        </Field>
        <Button className="filled w-full">Save</Button>
      </Form>
    </>
  );
}

export default StoreSetting;
