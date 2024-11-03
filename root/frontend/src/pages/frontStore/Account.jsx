import { HiOutlineUser } from "react-icons/hi2";
import { HiOutlineMail } from "react-icons/hi";
import { UserContext } from "../../context/userContextAPI.jsx";
import { useContext } from "react";
import useMyOrders from "../../hooks/orders/useMyOrders.js";
import Loader from "../../ui/Loader.jsx";
import { serverUrl } from "../../../configs.js";

function Account() {
  const { user } = useContext(UserContext);
  console.log(user);
  return (
    <>
      <h1
        className={"text-5xl text-center font-normal mt-12 text-zinc-700 py-24"}
      >
        My Account
      </h1>
      <div className={"flex px-64 gap-12"}>
        <div className={"w-[65vw]"}>
          <AccountSectionTitle title={"Order History"} />
          <OrdersTable />
        </div>

        <div className={" relative bg-red- w-[30vw]"}>
          <AccountSectionTitle title={"Account Details"} />

          <AccountInfo icon={<HiOutlineUser />} info={user.fullName} />
          <AccountInfo icon={<HiOutlineMail />} info={user.email} />
        </div>
      </div>
    </>
  );
}

export default Account;

function AccountSectionTitle({ title }) {
  return (
    <h1
      className={
        "pb-5 mb-6 text-[2.8rem] text-zinc-700 font-light border-b border-zinc-700"
      }
    >
      {title}
    </h1>
  );
}

function OrdersTable() {
  const { myOrders, isLoading } = useMyOrders();

  if (isLoading) return <Loader />;

  return (
    <div className={"w-full"}>
      {myOrders?.map((myOrder) => (
        <Order order={myOrder} key={myOrder._id} />
      ))}
    </div>
  );
}

function Order({ order }) {
  return (
    <div
      className={
        "py-12 border-b border-zinc-400 flex justify-between gap-12 pr-12"
      }
    >
      <div className={"space-y-6"}>
        {order.products?.map((product) => (
          <OrderProduct product={product} key={product._id} />
        ))}
      </div>
      <div className={"flex gap-12 "}>
        <div>
          <p className={"font-semibold mb-2"}>Order: #{order.orderNumber}</p>
          <p className={"font-semibold"}>Total: ${order.price}</p>
        </div>
        <div>{new Date(order.createdAt).toLocaleDateString()}</div>
      </div>
    </div>
  );
}

function OrderProduct({ product }) {
  return (
    <div className={"flex items-center gap-12 col-span-2 "}>
      <div>
        <div className={"w-32 h-32 border"}>
          <img
            src={`${serverUrl}/imgs/products/${product.coverImage}`}
            alt="image"
          />
        </div>
      </div>
      <div>
        <p>{product.name}</p>
        <p>Sku: #{product?.sku}</p>
        <p>
          {product.quantity} x ${product.price}
        </p>
      </div>
    </div>
  );
}

function AccountInfo({ icon, info }) {
  return (
    <div className={"flex gap-6 items-center py-4"}>
      <span className={"text-4xl text-zinc-700"}>{icon}</span>
      <span>{info}</span>
    </div>
  );
}
