import Breadcrumb from "../../component/breadcrumb/Breadcumb"
const MainPortfolio = ({ children }) => {
  return (
    <>
      {/* <Navlink /> */}
      <Breadcrumb />
      {children}
    </>
  );
};

export default MainPortfolio;
