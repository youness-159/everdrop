import { Link } from "react-router-dom";

import { forwardRef } from "react";
import {serverUrl} from "../../../configs.js";

const Product = forwardRef(({ product }, ref) => {
  return (
    <div className={"w-[30rem]"} ref={ref}>
      <Link to={`/product?id=${product._id}`}>
        <div
          className={
            "w-[30rem] h-[30rem] flex items-center border-2 border-zinc-200"
          }
        >
          <img
            src={`${serverUrl}/imgs/products/${product.coverImage}`}
            alt=""
            className={"w-full"}
          />
        </div>
      </Link>
      <h2 className={"text-3xl mt-4 mb-2"}>
        <Link
          to={`/product?id=${product._id}`}
          className={"hover:border-b-2 hover:border-gray-600"}
        >
          {product.name}
        </Link>
      </h2>
      <p className={"font-semibold"}>${product.price}</p>
    </div>
  );
});

export default Product;
