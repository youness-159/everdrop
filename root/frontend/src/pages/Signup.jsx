import { HiOutlineKey, HiOutlineUser } from "react-icons/hi2";
import { useForm } from "react-hook-form";
import Input from "../ui/inputs/Input.jsx";
import Form from "../ui/Form.jsx";
import Logo from "../ui/Logo.jsx";
import { HiOutlineMail } from "react-icons/hi";
import { useContext } from "react";
import { UserContext } from "../context/userContextAPI.jsx";
import { Link, useNavigate } from "react-router-dom";
import Button from "../ui/buttons/Button.jsx";
import Header from "../features/frontStore/Header.jsx";
import useSignup from "../hooks/useSignup.jsx";
import useEmailVerification from "../hooks/useEmailVerification.js";
import Loader from "../ui/Loader.jsx";
import GoogleButton from "../ui/GoogleButton.jsx";
import { onOauth } from "../services/authAPI.js";

function Signup() {
  const { register, handleSubmit } = useForm();
  const {
    register: registerVerificationCode,
    handleSubmit: handleSubmitVerificationCode,
  } = useForm();

  const { mutate, isSuccess, isPending } = useSignup();
  const { mutate: mutate2 } = useEmailVerification();

  const navigate = useNavigate();

  const { user } = useContext(UserContext);

  if (localStorage.token) navigate("/");

  function onSubmit(data) {
    mutate(data);
    localStorage.setItem("email", data.email);
  }

  function onSubmit2(data) {
    mutate2({
      ...data,
      email: localStorage.getItem("email"),
    });
  }

  if (isPending)
    return (
      <>
        <Header />
        <Loader />
      </>
    );

  if (isSuccess)
    return (
      <>
        <Header />
        <Form
          className={
            "w-1/4 absolute top-1/2 left-1/2 bg-white p-12 -translate-x-1/2 -translate-y-1/2 rounded-xl"
          }
          onSubmit={handleSubmitVerificationCode(onSubmit2)}
        >
          <div className={"mb-9  text-center text-[1.7rem] text-zinc-700"}>
            {user.email}
          </div>
          <Input
            type={"text"}
            name={"verificationCode"}
            placeholder={"Enter Verification Code"}
            maxLength={6}
            register={registerVerificationCode}
          />
        </Form>
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
            type={"text"}
            placeholder={"Full Name"}
            register={register}
            name={"fullName"}
            icon={<HiOutlineUser />}
          />
          <Input
            type={"text"}
            placeholder={"Email"}
            register={register}
            name={"email"}
            icon={<HiOutlineMail />}
          />
          <Input
            type={"password"}
            placeholder={"Password"}
            register={register}
            name={"password"}
            icon={<HiOutlineKey />}
          />
          <Input
            type={"password"}
            placeholder={"Confirm Password"}
            register={register}
            name={"passwordConfirm"}
            icon={<HiOutlineKey />}
          />
        </div>
        <Button className={"filled w-full mt-6"}>Sign up</Button>
        <p className={"mt-6"}>
          Already have an account? &nbsp;{" "}
          <Link
            to={"/login"}
            className={"hover:border-b border-zinc-800 duration-[.3s]"}
          >
            login
          </Link>
        </p>
        <div
          className={
            "text-center text-[1.5rem] font-semibold text-zinc-700  mt-6"
          }
        >
          OR
        </div>
        <div className={"mt-6"}>
          <GoogleButton
            onClick={onOauth}
            iconClassName={"w-10"}
            text={"Sign up with Google"}
          />
        </div>
      </Form>
    </>
  );
}

export default Signup;
