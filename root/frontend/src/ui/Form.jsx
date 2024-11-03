import PropTypes from "prop-types";

function Form({ children, className, onSubmit }) {
  return (
    <form
      action=""
      onSubmit={onSubmit}
      className={className}
      id={"form"}
      encType={"multipart/form-data"}
    >
      {children}
    </form>
  );
}

export default Form;

Form.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  onSubmit: PropTypes.func,
};
