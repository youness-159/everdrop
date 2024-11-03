import Modal from "../../ui/Modal.jsx";
import { forwardRef } from "react";
import { Link } from "react-router-dom";
import { HiOutlineUser } from "react-icons/hi2";

function UserOptions() {
  return (
    <div className="settings relative">
      <Modal>
        <Modal.Open opens={"user options"}>
          <button
            className={
              "text-[2rem]  border rounded-full p-2 text-zinc-700 border-zinc-700"
            }
          >
            {/*<UserPhoto />*/}
            <HiOutlineUser />
          </button>
        </Modal.Open>
        <Modal.Window name={"user options"}>
          <DropdownMenu />
        </Modal.Window>
      </Modal>
    </div>
  );
}

export default UserOptions;

const DropdownMenu = forwardRef(function DropdownMenu(_, ref) {
  return (
    <>
      <div
        className="tracking-wider absolute text-slate-600 py-8 z-50 border border-gray-100 left-1/2 bg-white top-full -translate-x-1/2 translate-y-4 shadow-xl shadow-gray-200 rounded-xl"
        ref={ref}
      >
        <p className={"text-nowrap px-12  pb-4"}>Hello, Youness</p>
        <ul className={""}>
          {["Settings", "Settings", "Settings", "Logout"].map((el, i) => (
            <li key={i}>
              <Link to={"settings"}>
                <div className=" py-4 px-6 hover:bg-cyan-500 hover:text-white  transition duration-[.3s] ">
                  {el}
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
});
