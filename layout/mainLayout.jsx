import Header from "../components/header/header";
import Footer from "../components/footer/footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";
import dynamic from "next/dynamic";

const MainLayout = ({ children }) => {
  return (
    <>
      <Header />
      <ToastContainer position="bottom-right" />
      {children}
      <Footer />
    </>
  );
};

export default MainLayout;
//export default dynamic(() => Promise.resolve(MainLayout), { ssr: false });
