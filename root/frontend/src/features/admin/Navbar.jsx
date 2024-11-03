import Search from "../../ui/inputs/Search.jsx";
import Logo from "../../ui/Logo";
import UserOptions from "../user/UserOptions";

function Navbar() {
  return (
    <nav className="py-3 border-b-2 border-slate-50  flex items-center justify-around col-span-full bg-zinc-50">
      <Logo />
      <Search inputClassname={"border border-zinc-200"} />
      <UserOptions />
    </nav>
  );
}

export default Navbar;
