import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import {
  HiArrowRightCircle,
  HiOutlineMagnifyingGlass,
  HiOutlineShoppingBag,
  HiOutlineUser,
} from "react-icons/hi2";

import Logo from "../../ui/Logo.jsx";
import Modal from "../../ui/Modal.jsx";
import { UserContext } from "../../context/userContextAPI.jsx";
import Loader from "../../ui/Loader.jsx";
import Button from "../../ui/buttons/Button.jsx";
import Input from "../../ui/inputs/Input.jsx";
import { useForm } from "react-hook-form";
import { getCategories } from "../../services/categoryAPI.js";

function Header() {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      setCategories(await getCategories());
      setIsLoading(false);
    })();
  }, []);

  if (isLoading) return <Loader />;

  return (
    <header className={"flex justify-between py-8 px-24 border-b bg-zinc-50"}>
      <Logo />
      <nav>
        <ul className={"flex gap-4 "}>
          {categories?.map((category) => (
            <li key={category._id}>
              <Link
                to={`/products?category=${category._id}&page=1`}
                className={"hover:border-b-2 hover:border-gray-800"}
              >
                {category.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <div className={"flex gap-4"}>
        <SearchInput />
        <Link to="/cart">
          <HiOutlineShoppingBag className={"w-9 h-9"} />
        </Link>
        <UserOptions />
      </div>
    </header>
  );
}

export default Header;

function UserOptions() {
  const navigate = useNavigate();

  const { setUser } = useContext(UserContext);

  let isLogin = true;
  const localStorageUser = localStorage.getItem("token");
  if (localStorageUser === "null" || localStorageUser === null) isLogin = false;
  const [searchParams, setSearchParams] = useSearchParams();

  function logout() {
    localStorage.removeItem("token");

    setUser({});
    navigate("/");
  }

  return (
    <div className={"relative"}>
      <Modal>
        <Modal.Open opens={"userOptions"}>
          <button>
            <HiOutlineUser className={"w-9 h-9"} />
          </button>
        </Modal.Open>
        <Modal.Window name={"userOptions"}>
          <ul
            className={
              "absolute top-[120%]  z-40 left-1/2 rounded-lg -translate-x-1/2 bg-white shadow-lg p-6"
            }
          >
            <li className={"p-2"}>
              <Link to={"/admin"}>admin</Link>
            </li>
            {!isLogin && (
              <>
                <li className={"p-2"}>
                  <Link to={"/login"}>login</Link>
                </li>
                <li className={"p-2"}>
                  <Link to={"/signup"}>sign up</Link>
                </li>
              </>
            )}
            {isLogin && (
              <>
                <li className={"p-2"}>
                  <Link to={"/account"}>account</Link>
                </li>

                <li className={"p-2"}>
                  <button onClick={logout} className={"text-red-700"}>
                    logout
                  </button>
                </li>
              </>
            )}
          </ul>
        </Modal.Window>
      </Modal>
    </div>
  );
}

function SearchInput() {
  const [openSearchInput, setOpenSearchInput] = useState(false);
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  function onOpenSearch() {
    setOpenSearchInput((prev) => !prev);
  }

  function onSubmit(data) {
    navigate("/products?name=" + data["search-products"]);
  }

  return (
    <div className={"flex gap-6 items-baseline relative"}>
      {openSearchInput && (
        <form
          action=""
          onSubmit={handleSubmit(onSubmit)}
          className={
            "absolute -left-[25rem] w-96 top-0 flex items-center gap-4 "
          }
        >
          <Input
            type={"search"}
            name={"search-products"}
            register={register}
            className={"h-10"}
          />
          <button className={"text-4xl"}>
            <HiArrowRightCircle />
          </button>
        </form>
      )}
      <Button onClick={onOpenSearch}>
        <HiOutlineMagnifyingGlass className={"w-9 h-9"} />
      </Button>
    </div>
  );
}
