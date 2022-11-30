import Breadcrumb from "../../component/breadcrumb/Breadcumb";
import Navlink from "../../component/navlink/Navlink";

const Clients = ({ children }) => {
  return (
    <>
      <Breadcrumb />
      {children}
    </>
  );
};

export default Clients;
