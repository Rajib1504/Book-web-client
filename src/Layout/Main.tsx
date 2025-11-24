import { Outlet } from "react-router-dom";
import Header from "../components/shared/Header";
import Footer from "../components/shared/Footer";
import { Toaster } from "react-hot-toast";
const Main = () => {
  return (
    <div className="bg-black/98  ">
      <Toaster position="top-center" reverseOrder={false} />
      <Header />
      <main className="min-h-screen text-white">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Main;
