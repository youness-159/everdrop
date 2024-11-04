import { HiCheckCircle } from "react-icons/hi2";
import { HiMiniXCircle } from "react-icons/hi2";

import { useNavigate, useSearchParams } from "react-router-dom";

function PaymentCheckoutStatus() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const paymentStatus = searchParams.get("status");

  return (
    <>
      <div
        className={
          "absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center"
        }
      >
        <span className={`text-[12rem] ${paymentStatus==="success"?"text-green-700":"text-red-700"} mb-8`}>
          {paymentStatus==="success"?<HiCheckCircle />:<HiMiniXCircle />}
        </span>
        <h3 className={`text-4xl uppercase ${paymentStatus==="success"?"text-green-700":"text-red-700"}  mb-4`}>
          {paymentStatus === "success" ? "Success" : "Fail"}
        </h3>
        <p>
          Payment was {paymentStatus === "success" ? "Successful" : "Failed"}
        </p>
        <button
          className={"text-zinc-50 my-12 py-2 px-8 bg-zinc-700"}
          onClick={() => {
            navigate("/");
          }}
        >
          Continue
        </button>
      </div>
    </>
  );
}

export default PaymentCheckoutStatus;
