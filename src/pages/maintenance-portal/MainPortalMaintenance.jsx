// import Navlink from "../../component/navlink/Navlink";

import Breadcrumb from "../../component/breadcrumb/Breadcumb";

const MainPortalMaintenance = ({ children }) => {
  return (
    <>
      {/* <Navlink /> */}
      <Breadcrumb/>
      {children}
    </>
  );
};

export default MainPortalMaintenance;
