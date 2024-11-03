import Form from "../../ui/Form.jsx";
import Field from "../../ui/Field.jsx";
import Input from "../../ui/inputs/Input.jsx";
import TextareaInput from "../../ui/inputs/TextareaInput.jsx";
import SEOInputs from "./SEOInputs.jsx";
import RadioDoubleInputs from "../../ui/inputs/RadioDoubleInputs.jsx";
import FormButtons from "../../ui/FormButtons.jsx";
import { useForm } from "react-hook-form";

function CategoryForm({ defaultValues, mutate }) {
  const { register, handleSubmit, errors } = useForm({
    defaultValues: defaultValues,
  });

  function onSubmit(data) {
    data.status = !!data.status;
    data.inStartMenu = !!data.inStartMenu;
    mutate(data);
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <div className={"flex gap-32 mb-9"}>
        <div className={"grow"}>
          <Field legend={"General"} className={"mb-12"}>
            <Input placeholder={"Name"} name={"name"} register={register} />

            <TextareaInput
              label={"Description"}
              placeholder={"Description"}
              name={"description"}
              register={register}
            />
          </Field>
          <SEOInputs register={register} />
        </div>
        <div>
          <Field legend={"Status"} className={"mb-12"}>
            <RadioDoubleInputs
              name={"status"}
              register={register}
              titles={["Disabled", "Enabled"]}
              values={[0, 1]}
            />
          </Field>
          <Field legend={"Include in Store Menu"}>
            <RadioDoubleInputs
              name={"inStartMenu"}
              register={register}
              titles={["No", "Yes"]}
              values={[0, 1]}
            />
          </Field>
        </div>
      </div>
      <FormButtons />
    </Form>
  );
}

export default CategoryForm;
