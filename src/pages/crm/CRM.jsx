import Breadcrumb from "../../component/breadcrumb/Breadcumb";
// import Navlink from "../../component/navlink/Navlink";

const CRM = ({ children }) => {
  return (
    <>
      {/* <Navlink /> */}
      <Breadcrumb/>
      {children}
    </>
  );
};

export default CRM;