import { HiCheckCircle } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";

function CheckoutSuccessPage() {
  const navigate = useNavigate();
  return (
    <>
      <div
        className={
          "absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center"
        }
      >
        <span className={"text-[12rem] text-green-700 mb-8"}>
          <HiCheckCircle />
        </span>
        <h3 className={"text-4xl uppercase mb-4"}>Success</h3>
        <p>Payment was Successful</p>
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

export default CheckoutSuccessPage;
