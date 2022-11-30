import Breadcrumb from "../../component/breadcrumb/Breadcumb";
// import Navlink from "../../component/navlink/Navlink";

const MainIfas = ({ children }) => {
  return (
    <>
      {/* <Navlink /> */}
      <Breadcrumb/>
      {children}
    </>
  );
};

export default MainIfas;
