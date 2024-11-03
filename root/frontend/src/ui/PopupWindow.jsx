import { createPortal } from "react-dom";
import { forwardRef } from "react";

const PopupWindow = forwardRef(function PopupWindow({ children }, ref) {
  return createPortal(
    <div
      className={
        "absolute left-0 top-0 w-screen h-screen bg-gray-200 bg-opacity-50 flex items-center justify-center "
      }
    >
      <div
        ref={ref}
        className={"bg-white shadow-3xl shadow-gray-200 rounded-2xl"}
      >
        {children}
      </div>
    </div>,
    document.getElementById("root"),
  );
});

export default PopupWindow;
