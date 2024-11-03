import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { HiOutlinePhoto } from "react-icons/hi2";

import Form from "../../ui/Form.jsx";
import FormButtons from "../../ui/FormButtons.jsx";
import Field from "../../ui/Field.jsx";
import Input from "../../ui/inputs/Input.jsx";
import SelectInput from "../../ui/inputs/SelectInput.jsx";
import TextareaInput from "../../ui/inputs/TextareaInput.jsx";
import ImageInput from "../../ui/inputs/ImageInput.jsx";
import SEOInputs from "./SEOInputs.jsx";
import RadioDoubleInputs from "../../ui/inputs/RadioDoubleInputs.jsx";
import Loader from "../../ui/Loader.jsx";
import useCategories from "../../hooks/categories/useCategories.js";
import Button from "../../ui/buttons/Button.jsx";

function ProductForm({ defaultValues, mutate }) {
  const { register, handleSubmit } = useForm({ defaultValues });

  function onSubmit(data) {
    data.sizes = data.sizes.split(",");
    data.colors = data.colors.split(",");
    mutate(data);
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <div className={"flex justify-between gap-6 mb-9"}>
        <NewProductLeftSide register={register} />
        <NewProductRightSide register={register} />
      </div>
      <FormButtons />
    </Form>
  );
}

export default ProductForm;

function ProductCategory({ register }) {
  const { categories, isLoading } = useCategories();

  if (isLoading) return <Loader />;

  const categoryOptions = categories.map((category) => ({
    name: category.name,
    value: category._id,
  }));
  return (
    <>
      <SelectInput
        label={"Category"}
        name={"category"}
        options={categoryOptions}
        register={register}
      />
    </>
  );
}

function NewProductLeftSide({ register }) {
  return (
    <div className={"w-[40vw] space-y-12"}>
      <Field legend={"General"}>
        <Input placeholder={"Name"} name={"name"} register={register} />
        <div className={"flex gap-4"}>
          <Input placeholder={"SKU"} name={"sku"} register={register} />
          <Input
            placeholder={"Price"}
            icon={"USD"}
            name={"price"}
            register={register}
          />
          <Input
            placeholder={"Weight"}
            icon={"Kg"}
            name={"weight"}
            register={register}
          />
        </div>
        <ProductCategory register={register} />
        <Input
          label={"Sizes"}
          placeholder={"X, XL, ..."}
          name={"sizes"}
          register={register}
        />
        <Input
          label={"Colors"}
          placeholder={"Black, Green, ..."}
          name={"colors"}
          register={register}
        />
        <Input
          label={"Brand"}
          placeholder={"Nike, Adidas, ..."}
          name={"colors"}
          register={register}
        />

        <TextareaInput
          label={"Description"}
          placeholder={"Description"}
          name={"description"}
          register={register}
        />
      </Field>

      <Field legend={"Media"}>
        <ImagesInputs register={register} />
      </Field>
      <SEOInputs register={register} />
    </div>
  );
}

function ImagesInputs({ register }) {
  const [imagesNumber, setImagesNumber] = useState(1);

  function onAddImageInput() {
    setImagesNumber((prev) => ++prev);
  }

  useEffect(() => {
    console.log(imagesNumber);
  }, [imagesNumber]);

  return (
    <div>
      {Array.from({ length: imagesNumber }).map((_, i) => (
        <>
          <ImageInput
            label={"test"}
            name={"image-" + i}
            register={register}
            key={i}
            i={i}
          >
            <div
              className={
                "w-96 h-60  text-9xl text-slate-600 opacity-30 hover:opacity-100  border-[.3rem] border-dashed border-slate-950 hover:border-zinc-800 hover:text-zinc-700 transition duration-[.3s] cursor-pointer flex justify-center items-center"
              }
            >
              <HiOutlinePhoto />
            </div>
          </ImageInput>
        </>
      ))}

      <Button
        type={"button"}
        className={"p-6 bg-blue-300"}
        onClick={onAddImageInput}
      >
        +
      </Button>
    </div>
  );
}

function NewProductRightSide({ register }) {
  return (
    <div className={"space-y-6"}>
      <Field legend={"Product Status"} register={register}>
        <RadioDoubleInputs
          label={"Status"}
          titles={["Disable", "Enable"]}
          values={[0, 1]}
          name={"status"}
          register={register}
        />
        <RadioDoubleInputs
          label={"Visibility"}
          titles={["Not Visible", "Visible"]}
          values={[0, 1]}
          name={"visibility"}
          register={register}
        />
      </Field>
      <Field legend={"Inventory"} register={register}>
        <RadioDoubleInputs
          label={"Manage Stock ?"}
          titles={["No", "Yes"]}
          values={[0, 1]}
          name={"inStock"}
          register={register}
        />
        <RadioDoubleInputs
          label={"Stock Availability"}
          titles={["No", "Yes"]}
          values={[0, 1]}
          name={"availability"}
          register={register}
        />
        <Input
          label={"Quantity"}
          placeholder={"Quantity"}
          type={"number"}
          name={"quantity"}
          register={register}
        />
      </Field>
    </div>
  );
}
