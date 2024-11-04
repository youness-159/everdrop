import Button from "../../ui/buttons/Button.jsx";
import { useEffect, useState } from "react";
import { getCheckoutSession } from "../../services/stripeAPI.js";
import toast from "react-hot-toast";
import { STRIPE_PUBLIC_KEY } from "../../utils/configs.js";
import { useForm } from "react-hook-form";
import useApplyCoupon from "../../hooks/coupons/useApplyCoupon.js";
import { HiArrowLongRight } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import useMyCart from "../../hooks/carts/useMyCart.js";
import Loader from "../../ui/Loader.jsx";
import useDeleteCartItem from "../../hooks/carts/useDeleteCartItem.js";
import { useQueryClient } from "@tanstack/react-query";
import { serverUrl } from "../../../configs.js";

function Cart() {
  const { cartItems, isLoading } = useMyCart();

  if (isLoading) return <Loader />;

  if (!cartItems || cartItems.length === 0) return <EmptyCart />;

  return <FilledCart cartItems={cartItems} />;
}

export default Cart;

function EmptyCart() {
  const navigate = useNavigate();

  function handleClick() {
    navigate("/");
  }

  return (
    <div
      className={
        "absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center"
      }
    >
      <h2 className={"text-5xl mb-12 text-zinc-700"}>Shopping Cart</h2>
      <p className={"mb-9 text-3xl font-light "}>Your cart is empty !</p>
      <button
        className={
          "uppercase py-6 px-8 text-2xl bg-zinc-700 text-zinc-50 flex items-center gap-4 hover:bg-zinc-800 duration-[.3s]"
        }
        onClick={handleClick}
      >
        <span>Continue Shopping</span>{" "}
        <span className={"text-4xl "}>
          <HiArrowLongRight />
        </span>
      </button>
    </div>
  );
}

function FilledCart({ cartItems }) {
  const [subTotal, setSubTotal] = useState(0);

  useEffect(() => {
    const calculateSubTotal = () => {
      return (
        cartItems?.reduce(
          (total, cartItem) =>
            total + cartItem.product.price * cartItem.quantity,
          0,
        ) ?? 0
      );
    };
    setSubTotal(calculateSubTotal());
  }, [cartItems]);

  async function handleCheckout(e) {
    e.preventDefault();
    const stripe = Stripe(STRIPE_PUBLIC_KEY);

    document.getElementById("checkout-button").innerHTML = "isLoading";

    const session = await getCheckoutSession();
    console.log(session)
    if (!session) return toast.error("failed to create session");

    await stripe.redirectToCheckout({
      sessionId: session.id,
    });
  }

  return (
    <div className="px-80 py-44 flex flex-wrap items-start gap-9 min-h-screen">
      <table className="w-3/4">
        <thead>
          <tr className="border-b">
            <th className="text-start font-light w-[33vw] pb-4">PRODUCT</th>
            <th className="text-start font-light pb-4 pr-24">PRICE</th>
            <th className="text-start font-light pb-4 pr-24">QUANTITY</th>
            <th className="text-start font-light pb-4 pr-24">TOTAL</th>
          </tr>
        </thead>
        <tbody>
          <Orders cartItems={cartItems} />
        </tbody>
      </table>

      <div>
        <h2 className="text-4xl mb-6 text-gray-700">Order summary</h2>
        <table>
          <tbody>
            <tr>
              <td className="pr-44 py-3">Sub total</td>
              <td>${subTotal.toFixed(2)}</td>
            </tr>
            <tr>
              <td className="py-3">
                <strong>Total</strong>
              </td>
              <td>${subTotal.toFixed(2)}</td>
            </tr>
            <tr className="text-xl">
              <td>(Inclusive of tax $0.00)</td>
            </tr>
          </tbody>
        </table>
        <Button
          className="uppercase py-4 mt-9 px-8 bg-zinc-700 text-zinc-100"
          onClick={handleCheckout}
          id={"checkout-button"}
        >
          Checkout
        </Button>
      </div>
      <CouponForm />
    </div>
  );
}

function Orders({ cartItems }) {
  return cartItems?.map((cartItem, i) => <Order cartItem={cartItem} key={i} />);
}

function Order({ cartItem }) {
  const { mutate, isSuccess } = useDeleteCartItem();
  const client = useQueryClient();

  useEffect(() => {
    if (isSuccess) {
      client.invalidateQueries("myCart");
    }
  }, [client, isSuccess]);

  function handleRemove(id) {
    mutate(id);
  }

  return (
    <tr className="border-b">
      <td className="flex my-4">
        <div className="w-36 h-36 mr-4 border border-zinc-300">
          <img
            src={`${serverUrl}/imgs/products/${cartItem.product.coverImage}`}
            alt=""
          />
        </div>
        <div>
          <h2 className="font-medium text-gray-600">{cartItem.product.name}</h2>
          <div className="text-gray-700 my-2">
            <p>Size: {cartItem.productSize}</p>
            <p>Color: {cartItem.productColor}</p>
          </div>
          <Button
            className="text-gray-500 border-b-2"
            onClick={() => handleRemove(cartItem._id)}
          >
            Remove
          </Button>
        </div>
      </td>
      <td>${cartItem.product.price.toFixed(2)}</td>
      <td>{cartItem.quantity}</td>
      <td>${(cartItem.product.price * cartItem.quantity).toFixed(2)}</td>
    </tr>
  );
}

function CouponForm() {
  const { register, handleSubmit } = useForm();
  const { mutate, isSuccess } = useApplyCoupon();

  function onSubmit(data) {
    mutate(data);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <p className="font-medium">Promotion code?</p>
      <div className="space-x-6">
        <input
          type="text"
          placeholder="Enter coupon code"
          className="py-4 px-4 border border-gray-400 rounded-md"
          {...register("code")}
        />
        <Button className="px-8 py-4 bg-zinc-700 text-zinc-100">Apply</Button>
      </div>
    </form>
  );
}
