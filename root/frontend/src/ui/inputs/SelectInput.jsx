import styles from "./SelectInput.module.css";
import { twMerge } from "tailwind-merge";
import PropTypes from "prop-types";

function SelectInput({
  options,
  className,
  label,
  containerClassName,
  name,
  register,
  onChange,
  hidden,
}) {
  return (
    <div
      className={twMerge(
        "h-fit flex justify-between items-center",
        containerClassName,
      )}
    >
      {label && (
        <label className="text-slate-600 text-xl tracking-widest">
          {label}
        </label>
      )}
      <div className="relative">
        <select
          hidden={hidden}
          className={twMerge(
            "w-fit h-fit text-slate-500 text-2xl border bg-zinc-50 py-4 px-6 pr-12 rounded-xl box-content",
            className,
          )}
          style={styles}
          name={name}
          {...(register ? register(name) : {})}
          onChange={onChange}
        >
          {options?.map((option, i) => (
            <option value={option.value} key={i}>
              {option.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default SelectInput;

SelectInput.propTypes = {
  className: PropTypes.string,
  options: PropTypes.object.isRequired,
  label: PropTypes.string,
  containerClassName: PropTypes.string,
  name: PropTypes.string,
  register: PropTypes.func,
  onChange: PropTypes.func,
  hidden: PropTypes.string,
};
