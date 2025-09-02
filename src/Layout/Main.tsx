import { Outlet } from "react-router-dom";
import Header from "../components/shared/Header";
import Footer from "../components/shared/Footer";

const Main = () => {
  return (
    <div className="bg-black/98 ">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Main;
