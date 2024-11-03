import { HiOutlinePencilSquare } from "react-icons/hi2";
import { twMerge } from "tailwind-merge";
import { useForm } from "react-hook-form";
import Modal from "./Modal.jsx";
import PopupWindow from "./PopupWindow.jsx";
import Input from "./inputs/Input.jsx";
import SelectInput from "./inputs/SelectInput.jsx";
import { countryOptions } from "../utils/helpers.js";
import PropTypes from "prop-types";

function Field({ children, legend, edit, className, childrenClassName }) {
  return (
    <div
      className={twMerge(
        "relative bg-white p-12 rounded-xl shadow-md hover:shadow-2xl hover:shadow-zinc-300 duration-[.3s] ",
        className,
      )}
    >
      <fieldset>
        <div className={"flex justify-between"}>
          {legend && (
            <legend className={"text-slate-600 tracking-wide"}>{legend}</legend>
          )}
          {/*{displaySwitch && <SwitchInput name={switchName} />}*/}
          {edit && <FieldEditModal />}
        </div>
        <div
          className={twMerge(
            "mt-6 p-4 flex flex-col flex-wrap gap-9 ",
            childrenClassName,
          )}
        >
          {children}
        </div>
      </fieldset>
    </div>
  );
}

export default Field;

Field.propTypes = {
  legend: PropTypes.string,
  className: PropTypes.string,
  childrenClassName: PropTypes.string,
};

// Only Usable With Shipping Fields
function FieldEditModal() {
  const { register } = useForm();

  return (
    <Modal>
      <Modal.Open opens={"editWindow"}>
        <button>
          <HiOutlinePencilSquare className={"text-4xl text-cyan-700"} />
        </button>
      </Modal.Open>
      <Modal.Window name={"editWindow"}>
        <PopupWindow>
          <Field legend={"Create a shipping zone"}>
            <Input
              label={"Zone Name"}
              type={"text"}
              placeholder={"Zone Name"}
              name={"zone"}
              register={register}
            />
            <SelectInput
              label={"Country"}
              options={countryOptions}
              name={"country"}
              register={register}
            />
          </Field>
        </PopupWindow>
      </Modal.Window>
    </Modal>
  );
}
