import { useRef } from "react";
import PropTypes from "prop-types";

function ImageInput({ children, name, register, i }) {
  const ref = useRef(null);

  function handleChange(e) {
    const reader = new FileReader();

    reader.readAsDataURL(e.target.files[0]);
    reader.onload = (e) => {
      ref.current.src = e.target.result;
    };
  }

  return (
    <div>
      <input
        type="file"
        accept={"image/*"}
        id={"image-input-" + i}
        hidden
        multiple
        required
        onChange={handleChange}
        {...(register ? register(name) : {})}
      />
      <div className={"relative w-fit mx-auto h-fit"}>
        <label htmlFor={"image-input-" + i} className={"relative z-50"}>
          {children}
        </label>
        <img
          src={"../../imgs/transparent.png"}
          alt={`${name} image`}
          className="absolute top-0 left-0 w-full h-full bg-white "
          ref={ref}
        />
      </div>
    </div>
  );
}

export default ImageInput;

ImageInput.propTypes = {
  name: PropTypes.string,
  register: PropTypes.func,
};
