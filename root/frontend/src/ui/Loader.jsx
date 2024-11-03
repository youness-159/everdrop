import styles from "./Loader.module.css";

function Loader() {
  return (
    <div
      className="loading scale-150 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
      style={styles}
    >
      <div className="newtons-cradle">
        <div className="newtons-cradle__dot"></div>
        <div className="newtons-cradle__dot"></div>
        <div className="newtons-cradle__dot"></div>
        <div className="newtons-cradle__dot"></div>
      </div>
    </div>
  );
}

export default Loader;
