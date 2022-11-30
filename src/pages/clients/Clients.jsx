import Breadcrumb from "../../component/breadcrumb/Breadcumb";

const Clients = ({ children }) => {
  return (
    <>
      <Breadcrumb />
      {children}
    </>
  );
};

export default Clients;
