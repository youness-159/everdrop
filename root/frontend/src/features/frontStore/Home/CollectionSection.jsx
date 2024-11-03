import Button from "../../../ui/buttons/Button.jsx";

function CollectionSection() {
  return (
    <section className={"flex justify-center pt-14 gap-16"}>
      <Collection />
      <Collection />
      <Collection />
    </section>
  );
}

export default CollectionSection;

function Collection() {
  return (
    <div className={"w-[30rem]"}>
      <h2 className={"mb-6 text-4xl"}>MEN SHOES COLLECTION</h2>
      <p className={"mb-4"}>
        Constructed from luxury nylons, leathers, and custom hardware, featuring
        sport details such as hidden breathing vents, waterproof + antimicrobial
        linings, and more.
      </p>
      <Button
        className={
          "py-3 px-6 text-xl tracking-wide font-semibold bg-zinc-800 text-zinc-100"
        }
      >
        SHOP MEN
      </Button>
    </div>
  );
}
