import styles from "./SwitchInput.module.css";
import PropTypes from "prop-types";

function SwitchInput({ name }) {
  return (
    <label className="toggle-switch w-[5rem] h-[2.2rem]" style={styles}>
      <input type="checkbox" name={name} checked />
      <div className="toggle-switch-background ">
        <div className="toggle-switch-handle "></div>
      </div>
    </label>
  );
}

export default SwitchInput;

SwitchInput.defaultProps = {
  name: PropTypes.string,
};
