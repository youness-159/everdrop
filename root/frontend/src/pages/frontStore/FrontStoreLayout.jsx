import { Outlet } from "react-router-dom";
import Header from "../../features/frontStore/Header.jsx";
import Footer from "../../features/frontStore/Footer.jsx";

function FrontStoreLayout() {
  return (
    <>
      <Header />
      <div className={"min-h-screen"}>
        <Outlet />
      </div>
      <Footer />
    </>
  );
}

export default FrontStoreLayout;
