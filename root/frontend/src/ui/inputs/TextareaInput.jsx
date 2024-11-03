import PropTypes from "prop-types";

function TextareaInput({ name, placeholder, label, defaultValue, register }) {
  return (
    <div className={"w-full bg-dark flex flex-col gap-6"}>
      {label && (
        <label className={"text-slate-600 text-xl tracking-widest"}>
          {label}
        </label>
      )}
      <textarea
        name={name}
        placeholder={placeholder}
        className={"p-6 border rounded-xl border-zinc-200"}
        defaultValue={defaultValue}
        {...register(name)}
      />
    </div>
  );
}

export default TextareaInput;

TextareaInput.propTypes = {
  name: PropTypes.string,
  placeholder: PropTypes.string,
  label: PropTypes.string,
  defaultValue: PropTypes.string,
  register: PropTypes.func,
};
