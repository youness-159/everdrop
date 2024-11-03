import { useSearchParams } from "react-router-dom";
import Header from "../features/frontStore/Header.jsx";
import Form from "../ui/Form.jsx";
import Logo from "../ui/Logo.jsx";
import Input from "../ui/inputs/Input.jsx";
import Button from "../ui/buttons/Button.jsx";
import { useForm } from "react-hook-form";
import useResetPassword from "../hooks/useResetPassword.jsx";

function ResetPassword() {
  const [searchParams] = useSearchParams();
  const { register, handleSubmit } = useForm();
  const { mutate } = useResetPassword();

  function onSubmit(data) {
    mutate({ ...data, token: searchParams.get("token") });
  }

  return (
    <>
      <Header />
      <Form
        className={
          "w-1/4 absolute top-1/2 left-1/2 bg-white p-12 -translate-x-1/2 -translate-y-1/2 rounded-xl"
        }
        onSubmit={handleSubmit(onSubmit)}
      >
        <Logo className={"flex justify-center mb-12"} />
        <div className={"space-y-6"}>
          <Input
            type={"password"}
            placeholder={"*******"}
            name={"password"}
            register={register}
          />
          <Input
            type={"passwordConfirm"}
            placeholder={"*******"}
            name={"passwordConfirm"}
            register={register}
          />
        </div>
        <Button className={"filled w-full mt-6"}>Reset Password</Button>
      </Form>
    </>
  );
}

export default ResetPassword;
