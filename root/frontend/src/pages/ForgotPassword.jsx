import Form from "../ui/Form.jsx";
import Logo from "../ui/Logo.jsx";
import Input from "../ui/inputs/Input.jsx";
import Button from "../ui/buttons/Button.jsx";
import { useForm } from "react-hook-form";
import Header from "../features/frontStore/Header.jsx";
import useForgotPassword from "../hooks/useForgotPassword.js";

function ForgotPassword() {
  const { register, handleSubmit, errors } = useForm();
  const { mutate, isSuccess } = useForgotPassword();

  function onSubmit(data) {
    mutate(data);
  }

  if (isSuccess)
    return (
      <>
        <div
          className={
            "w-1/4 absolute top-1/2 left-1/2 bg-green-200 p-12 -translate-x-1/2 -translate-y-1/2 rounded-xl"
          }
        >
          Reset password token has sent to the email 👌
        </div>
      </>
    );

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
            type={"email"}
            placeholder={"email@example.com"}
            name={"email"}
            register={register}
          />
        </div>
        <Button className={"filled w-full mt-6"}>Reset Password</Button>
      </Form>
    </>
  );
}

export default ForgotPassword;
