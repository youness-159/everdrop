import { twMerge } from "tailwind-merge";

function AdminTable({ children, className }) {
  return (
    <div className={"py-6 px-12  bg-white rounded-2xl"}>
      <table className={twMerge("w-full text-center ", className)}>
        {children}
      </table>
    </div>
  );
}

export default AdminTable;
