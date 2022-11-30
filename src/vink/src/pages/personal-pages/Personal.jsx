// import Footer from "../../components/footer/Footer";
import Navbar from "../../components/navbar/Navbar";
import { personalNavbarData } from "../../data/data";
import useCheckMobileScreen from "../../hooks/useCheckMobileScreen ";

const Personal = ({ children }) => {
  const isMobile = useCheckMobileScreen();
  return (
    <div>
      {!isMobile ? <Navbar navbarData={personalNavbarData} /> : ""}
      {children}
      {/* <Footer /> */}
    </div>
  );
};
export default Personal;
