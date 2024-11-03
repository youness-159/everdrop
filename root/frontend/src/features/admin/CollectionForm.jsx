import Form from "../../ui/Form.jsx";
import Field from "../../ui/Field.jsx";
import Input from "../../ui/inputs/Input.jsx";
import TextareaInput from "../../ui/inputs/TextareaInput.jsx";
import MultiProductSelect from "../../ui/MultiProductSelect.jsx";

import { useForm } from "react-hook-form";
import { useState } from "react";
import FormButtons from "../../ui/FormButtons.jsx";

function CollectionForm({ defaultValues, mutate }) {
  const { register, handleSubmit } = useForm({ defaultValues });
  const [selectedProducts, setSelectedProducts] = useState([]);

  function onSubmit(data) {
    data.products = selectedProducts.map((product) => product.value);
    mutate(data);
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Field legend={"General"}>
        <Input
          label={"Collection Name"}
          placeholder={"Collection Name"}
          name={"name"}
          type={"text"}
          register={register}
        />
        <MultiProductSelect
          selectedProducts={selectedProducts}
          setSelectedProducts={setSelectedProducts}
        />
        <Input
          label={"Unique ID"}
          placeholder={"Unique ID"}
          name={"uniqueId"}
          type={"text"}
          register={register}
        />

        <TextareaInput
          label={"Description"}
          placeholder={"Description"}
          name={"description"}
          register={register}
        />

        <FormButtons />
      </Field>
    </Form>
  );
}

export default CollectionForm;
