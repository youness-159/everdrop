import styles from "./FallbackLoader.module.css";

function FallbackLoader() {
  return (
    <div
      className="spinner absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
      style={styles}
    >
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
}

export default FallbackLoader;
