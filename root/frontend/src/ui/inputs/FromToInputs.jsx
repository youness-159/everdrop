import PropTypes from "prop-types";

function FromToInputs({ children, onFrom, onTo }) {
  return (
    <div className={"flex items-center justify-center gap-4"}>
      <span className={"text-4xl text-slate-500 font-bold "}>{children}</span>
      <span className={" rounded-xl overflow-hidden inline-block w-[100%]"}>
        <input
          type="text"
          className={"w-[50%] border-r  py-3 px-6 "}
          placeholder={"From"}
          onChange={onFrom}
        />
        <input
          type="text"
          className={"w-[50%]  py-3 px-6 }"}
          placeholder={"To"}
          onChange={onTo}
        />
      </span>
    </div>
  );
}

export default FromToInputs;

FromToInputs.propTypes = {
  onFrom: PropTypes.func,
  onTo: PropTypes.func,
};
