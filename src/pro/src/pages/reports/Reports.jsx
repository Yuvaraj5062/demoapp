import Breadcrumb from "../../component/breadcrumb/Breadcumb";

const Reports = ({ children }) => {
  return (
    <>
      {/* <Navlink/> */}
      <Breadcrumb/>
      {children}
    </>
  );
};

export default Reports;
