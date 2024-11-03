import { twMerge } from "tailwind-merge";

function AdminTableHeaderColumn({ children, className }) {
  return <th className={twMerge("py-6 ", className)}>{children}</th>;
}

export default AdminTableHeaderColumn;
