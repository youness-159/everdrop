import Field from "../../ui/Field.jsx";
import Input from "../../ui/inputs/Input.jsx";
import TextareaInput from "../../ui/inputs/TextareaInput.jsx";

function SEOInputs({ register }) {
  return (
    <Field legend={"Search engine optimize"}>
      <Input
        label={"URL Key"}
        placeholder={"URL Key"}
        type={"text"}
        name={"urlKey"}
        register={register}
      />
      <Input
        label={"Meta Title"}
        placeholder={"Meta Title"}
        type={"text"}
        name={"metaTitle"}
        register={register}
      />
      <Input
        label={"Meta Keywords"}
        placeholder={"Meta Keywords"}
        type={"text"}
        name={"metaKeywords"}
        register={register}
      />
      <TextareaInput
        label={"Meta Description"}
        placeholder={"Meta Description"}
        name={"metaDescription"}
        register={register}
      />
    </Field>
  );
}

export default SEOInputs;
