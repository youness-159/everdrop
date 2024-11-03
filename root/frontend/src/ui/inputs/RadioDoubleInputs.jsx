import styles from "./RadioInputs.module.css";
import PropTypes from "prop-types";

function RadioDoubleInputs({ label, name, titles, values, register }) {
  return (
    <div className={"flex flex-col gap-4 justify-between"}>
      {label && (
        <label htmlFor="" className={"text-xl text-slate-600 tracking-widest"}>
          {label}
        </label>
      )}

      <div className="radio-button-container pr-6" style={styles}>
        <div className="radio-button">
          <input
            type="radio"
            className="radio-button__input"
            id={name + "1"}
            name={name}
            value={values[0]}
            {...register(name)}
          />
          <label
            className="radio-button__label tracking-wide"
            htmlFor={name + "1"}
          >
            <span className="radio-button__custom"></span>
            {titles[0]}
          </label>
        </div>
        <div className="radio-button">
          <input
            type="radio"
            className="radio-button__input"
            id={name + "2"}
            name={name}
            value={values[1]}
            {...register(name)}
          />
          <label
            className="radio-button__label tracking-wide"
            htmlFor={name + "2"}
          >
            <span className="radio-button__custom"></span>
            {titles[1]}
          </label>
        </div>
      </div>
    </div>
  );
}

export default RadioDoubleInputs;

RadioDoubleInputs.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string,
  titles: PropTypes.arrayOf(PropTypes.string).isRequired,
  values: PropTypes.arrayOf(PropTypes.number).isRequired,
  register: PropTypes.func,
};
