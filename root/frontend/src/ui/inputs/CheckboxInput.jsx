import styles from "./CheckboxInput.module.css";
import PropTypes from "prop-types";

function CheckboxInput({ label, name, payload, register, onChange, size }) {
  return (
    <div className={"flex gap-4 "}>
      <label className="container w-fit h-fit" style={styles}>
        <input
          type="checkbox"
          onChange={onChange}
          data-payload={payload}
          {...(register ? register(name) : {})}
        />
        <CheckboxIcon size={size} />
      </label>
      <span className={"text-2xl"}>{label}</span>
    </div>
  );
}

export default CheckboxInput;

CheckboxInput.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string,
  payload: PropTypes.string,
  register: PropTypes.func,
  onChange: PropTypes.func,
};

function CheckboxIcon({ size }) {
  return (
    <svg viewBox="0 0 64 64" height={size ?? "2em"} width={size ?? "2em"}>
      <path
        d="M 0 16 V 56 A 8 8 90 0 0 8 64 H 56 A 8 8 90 0 0 64 56 V 8 A 8 8 90 0 0 56 0 H 8 A 8 8 90 0 0 0 8 V 16 L 32 48 L 64 16 V 8 A 8 8 90 0 0 56 0 H 8 A 8 8 90 0 0 0 8 V 56 A 8 8 90 0 0 8 64 H 56 A 8 8 90 0 0 64 56 V 16"
        pathLength="575.0541381835938"
        className="path"
      ></path>
    </svg>
  );
}

CheckboxIcon.propTypes = {
  size: PropTypes.string,
};
