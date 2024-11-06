import { twMerge } from "tailwind-merge";

function DashboardSection({ children, className }) {
  return (
    <div
      className={twMerge("area-chart w-full bg-gray-50 py-6 px-12", className)}
    >
      {children}
    </div>
  );
}

export default DashboardSection;
