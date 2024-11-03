import { twMerge } from "tailwind-merge";
import PropTypes from "prop-types";

function Input({
  label,
  icon,
  type = "text",
  placeholder,
  className,
  name,
  defaultValue,
  register,
  iconClassName,
  maxLength,
}) {
  return (
    <div className={twMerge(className, " space-y-3")}>
      {label && <InputLabel label={label} />}
      <div className={"relative h-full"}>
        <input
          type={type}
          placeholder={placeholder}
          name={name}
          defaultValue={defaultValue}
          className={" p-4 w-full h-full border border-slate-200  rounded-xl"}
          // defaultValue={defaultValue}
          maxLength={maxLength}
          {...(register ? register(name) : {})}
        />
        {icon && <InputIcon icon={icon} iconClassname={iconClassName} />}
      </div>
    </div>
  );
}

export default Input;

function InputIcon({ icon, iconClassName }) {
  return (
    <span
      className={twMerge(
        "absolute top-1/2 right-6 text-slate-600 -translate-y-1/2 ",
        iconClassName,
      )}
    >
      {icon}
    </span>
  );
}

function InputLabel({ label }) {
  return (
    <label htmlFor="" className={"text-slate-600 text-xl  tracking-widest"}>
      {label}
    </label>
  );
}

Input.propTypes = {
  label: PropTypes.string,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  className: PropTypes.string,
  name: PropTypes.string,
  defaultValue: PropTypes.string,
  register: PropTypes.func,
  iconClassName: PropTypes.string,
  maxLength: PropTypes.string,
};

InputIcon.propTypes = {
  iconClassName: PropTypes.string,
};

InputLabel.propTypes = {
  label: PropTypes.string.isRequired,
};
