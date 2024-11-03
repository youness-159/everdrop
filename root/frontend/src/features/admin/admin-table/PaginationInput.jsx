function PaginationInput({ name, defaultValue, register }) {
  return (
    <input
      type={"text"}
      className={"w-[4.4rem] p-3 text-center h-full rounded-xl border "}
      defaultValue={defaultValue}
      {...(register ? register(name) : {})}
    />
  );
}

export default PaginationInput;
