import styles from "./Button.module.css";

function Button({ children, className, type, onClick, id }) {
  return (
    <button
      onClick={onClick}
      className={className}
      style={styles}
      type={type}
      id={id}
    >
      {children}
    </button>
  );
}

export default Button;
