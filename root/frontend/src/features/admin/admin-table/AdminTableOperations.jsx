import { Link } from "react-router-dom";
import { HiOutlinePencilSquare, HiOutlineTrash } from "react-icons/hi2";
import Button from "../../../ui/buttons/Button.jsx";

function AdminTableOperations({ mutate, id }) {
  function onDelete() {
    mutate(id);
  }

  return (
    <div className={"space-x-6"}>
      <Link to={`update?id=${id}`}>
        <button>
          <HiOutlinePencilSquare
            style={{ color: "green" }}
            className={"w-9 h-9 color-red"}
          />
        </button>
      </Link>
      <Link to={""}>
        <Button onClick={onDelete}>
          <HiOutlineTrash
            style={{ color: "red" }}
            className={"w-9 h-9 color-red"}
          />
        </Button>
      </Link>
    </div>
  );
}

export default AdminTableOperations;
