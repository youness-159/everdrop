import { Link } from "react-router-dom";
import Button from "../../ui/buttons/Button.jsx";

function AdminOutletSectionHeader({ title, buttonName, buttonLink }) {
  return (
    <div className={"flex justify-between items-baseline "}>
      <header className="text-3xl mb-9">{title}</header>
      {buttonName && (
        <Link to={buttonLink}>
          <Button className={"outlined"}>{buttonName}</Button>
        </Link>
      )}
    </div>
  );
}

export default AdminOutletSectionHeader;
