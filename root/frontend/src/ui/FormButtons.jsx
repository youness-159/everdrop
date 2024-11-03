import Button from "./buttons/Button.jsx";

function FormButtons() {
  return (
    <div className={"space-x-12"}>
      <Button type={"submit"} className={"w-80 filled"}>
        Save
      </Button>
      <Button type={"reset"} className={"w-80 filled warning"}>
        Cancel
      </Button>
    </div>
  );
}

export default FormButtons;
