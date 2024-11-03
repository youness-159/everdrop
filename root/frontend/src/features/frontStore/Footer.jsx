function Footer() {
  return (
    <footer
      className={
        "py-5 border-t border-zinc-300 px-44 mt-44 flex justify-between bg-zinc-200"
      }
    >
      <div className={"flex gap-6"}>
        <div className={"w-[2.9rem] bg-white px-2 box-content"}>
          <img src="./imgs/visa.png" className={"w-full"} alt="" />
        </div>
        <div className={"w-[2.9rem]"}>
          <img src="./imgs/mastercard.png" className={"w-full"} alt="" />
        </div>
      </div>
      <span className={"text-gray-600"}>
        © {new Date(Date.now()).getFullYear()} Everdrop. All Rights Reserved.
      </span>
    </footer>
  );
}

export default Footer;
