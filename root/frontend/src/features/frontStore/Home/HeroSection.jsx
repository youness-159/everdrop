import styles from "./HeroSection.module.css";

function HeroSection() {
  return (
    <section
      className={"hero-section relative h-[55vh] bg-gray-100"}
      style={styles}
    >
      <div
        className={
          "absolute right-1/4 translate-x-1/2 top-1/2 -translate-y-1/2 w-[40%] "
        }
      >
        <h1 className={"text-8xl"}>Discount 20% For All Orders Over $2000</h1>
        <h2 className={"text-3xl mt-3"}>Use coupon codeDISCOUNT20</h2>
      </div>
    </section>
  );
}

export default HeroSection;
