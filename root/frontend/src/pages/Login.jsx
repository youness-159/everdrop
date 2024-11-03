import { HiOutlineKey } from "react-icons/hi2";
import { useForm } from "react-hook-form";
import { HiOutlineMail } from "react-icons/hi";
import { useContext, useEffect } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";

import { UserContext } from "../context/userContextAPI.jsx";
import Input from "../ui/inputs/Input.jsx";
import useLogin from "../hooks/useLogin.jsx";
import Form from "../ui/Form.jsx";
import Logo from "../ui/Logo.jsx";
import Button from "../ui/buttons/Button.jsx";
import Header from "../features/frontStore/Header.jsx";
import GoogleButton from "../ui/GoogleButton.jsx";
import { onOauth } from "../services/authAPI.js";

function Login() {
  const { register, handleSubmit } = useForm();

  const { mutate, isSuccess, loggedUser } = useLogin();

  const navigate = useNavigate();

  const { setUser } = useContext(UserContext);

  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    if (searchParams.get("token")) {
      localStorage.setItem("token", searchParams.get("token"));
      searchParams.delete("token");
      setSearchParams(searchParams);
      setUser({});
      navigate("/");
    }
  }, [searchParams, setUser, setSearchParams, navigate]);

  useEffect(() => {
    let isLogin = true;
    if (localStorage.getItem("token") !== "null") isLogin = false;
    if (localStorage.getItem("token") !== null) isLogin = false;
    if (isLogin) navigate("/");
  }, [navigate]);

  function onSubmit(data) {
    mutate(data);
  }

  useEffect(() => {
    if (isSuccess) {
      setUser(loggedUser.user);
      localStorage.setItem("token", loggedUser.token);
      navigate("/");
    }
  }, [isSuccess, loggedUser, navigate, setUser]);

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
        </div>
        <Button className={"filled w-full mt-6"}>Log in</Button>
        <div className={"mt-8 flex justify-between"}>
          <Link to={"/signup"}>Create an acoount</Link>
          <Link to={"/account/forgot-password"}>Forget Password ?</Link>
        </div>
        <div className={"mt-8 text-center font-semibold"}>OR</div>
        <div className={"mt-8 "}>
          <GoogleButton
            text={"Sign in with Google"}
            onClick={onOauth}
            iconClassName={"w-10"}
          />
        </div>
      </Form>
    </>
  );
}

export default Login;
