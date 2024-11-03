import Button from "../../ui/buttons/Button.jsx";
import useProduct from "../../hooks/products/useProduct.js";
import { useSearchParams } from "react-router-dom";
import Loader from "../../ui/Loader.jsx";

import { useContext, useEffect, useReducer } from "react";
import { twMerge } from "tailwind-merge";
import { UserContext } from "../../context/userContextAPI.jsx";
import useCreateCartItem from "../../hooks/carts/useCreateCartItem.js";
import {serverUrl} from "../../../configs.js";

const initialState = {
  quantity: 1,
  size: "",
  color: "",
};

function reducer(state, action) {
  switch (action.type) {
    case "product/quantity":
      return { ...state, quantity: action.payload };
    case "product/size":
      return { ...state, size: action.payload };
    case "product/color":
      return { ...state, color: action.payload };
    default:
      console.error("Unknown action type !", action);
  }
}

function ProductPage() {
  const [searchParams] = useSearchParams();
  const { product, isLoading } = useProduct(searchParams.get("id"));
  const [state, dispatch] = useReducer(reducer, initialState);
  const { user, setUser } = useContext(UserContext);
  const { mutate } = useCreateCartItem();

  useEffect(() => {
    if (!isLoading) {
      dispatch({ type: "product/color", payload: product.colors[0] });
      dispatch({ type: "product/size", payload: product.sizes[0] });
    }
  }, [isLoading, product]);

  function onChooseSize(sizeIndex) {
    return () =>
      dispatch({ type: "product/size", payload: product.sizes[sizeIndex] });
  }

  function onChooseColor(colorIndex) {
    return () =>
      dispatch({ type: "product/color", payload: product.colors[colorIndex] });
  }

  function onChooseQuantity(e) {
    const quantity = e.target.value;
    dispatch({ type: "product/quantity", payload: +quantity });
  }

  function onAddToCart() {
    const newCartItem = {
      product: product._id,
      productColor: state.color,
      productSize: state.size,
      quantity: state.quantity,
      user: user._id,
    };

    mutate(newCartItem);
  }

  if (isLoading) return <Loader />;

  return (
    <div className={"px-72 py-24 flex  gap-12"}>
      <div className={"flex items-center"}>
        <div className={"w-[50rem] h-[50rem] bg-gray-200 flex items-center "}>
          <img
            src={`${serverUrl}/imgs/products/${product.coverImage}`}
            alt=""
            className={"w-full"}
          />
        </div>
      </div>
      <div>
        <h2 className={"text-5xl mb-6"}>{product.name}</h2>
        <p className={"text-[2rem] mb-4"}>${product.price}</p>
        <div className={"space-y-2 mb-6"}>
          <p>Sku: {product.sku}</p>
          <p>Brand: {product?.brand}</p>
        </div>

        <div>
          <input
            type="number"
            className={"border-2 border-gray-400 w-16 h-12 p-2"}
            defaultValue={1}
            onChange={onChooseQuantity}
            min={1}
            max={product.quantity}
            id=""
          />
          <span className={"ml-4 uppercase"}>Item</span>
        </div>
        <Button
          className={
            "uppercase py-6 px-12 mt-4 mb-12 border-2 bg-zinc-700 text-zinc-50 hover:shadow-lg hover:shadow-zinc-300 duration-[.2s] "
          }
          onClick={onAddToCart}
        >
          Add To Cart
        </Button>
        <div className={"flex gap-4 flex-wrap mb-5"}>
          {product.sizes.map((size, i) => (
            <Button
              className={twMerge(
                " border-2 py-2 px-4 min-w-14 min-h-14",
                state?.size === size && "bg-zinc-700 text-zinc-100",
              )}
              onClick={onChooseSize(i)}
              key={i}
            >
              {size}
            </Button>
          ))}
        </div>
        <div className={"mb-8 flex gap-4 flex-wrap"}>
          {product.colors.map((color, i) => (
            <Button
              className={twMerge(
                " border-2 py-2 px-4 min-w-14 min-h-14",
                state?.color === color && "bg-zinc-700 text-zinc-100",
              )}
              onClick={onChooseColor(i)}
              key={i}
            >
              {color}
            </Button>
          ))}
        </div>
        <p>{product.description}</p>
      </div>
    </div>
  );
}

export default ProductPage;
