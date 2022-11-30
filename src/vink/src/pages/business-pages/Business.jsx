import BusinessFooter from "../../components/business-footer/BusinessFooter";
import Navbar from "../../components/navbar/Navbar";
import { businessNavbarData } from "../../data/data";
import useCheckMobileScreen from "../../hooks/useCheckMobileScreen ";
const Business = ({ children }) => {
  const isMobile = useCheckMobileScreen();
  return (
    <div>
      {!isMobile ? <Navbar navbarData={businessNavbarData} /> : ""}
      {children}
      <BusinessFooter />
    </div>
  );
};
export default Business;
