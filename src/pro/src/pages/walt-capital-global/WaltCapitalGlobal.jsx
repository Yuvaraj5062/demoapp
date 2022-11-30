import React from "react";
import WaltHeader from "../../component/walt-capital-global/WaltHeader";
import styles from "./waltcapitalglobal.module.scss";
import { useEffect, useState } from "react";
import Tab from "../../component/tabs/Tabs";
import { useParams } from "react-router-dom";
// import Navlink from "../../component/navlink/Navlink";
import Breadcrumb from "../../component/breadcrumb/Breadcumb";
const WaltCapitalGlobal = ({ children }) => {
  const [value, setValue] = useState(0);
  const GlobalFundType = [
    { title: "Client Transaction", navigate: "clienttransaction" },
    { title: "Client List", navigate: "clientlist" },
    { title: "Client Statement", navigate: "clientstatement" },
    { title: "Pricing", navigate: "pricing" },
    { title: "Run Fees", navigate: "runfees" },
    { title: "Fund Benchmark", navigate: "fundbenchmark" },
    { title: "Fact Sheets", navigate: "factsheets" },
  ];
  const activePage = Object.values(useParams())[0];
  // const paramsArray = activePage.split('/');
  // const id = paramsArray[paramsArray.length-1];s
  useEffect(() => {
    switch (activePage) {
      case "clienttransaction":
        setValue(0);
        break;
      case "clientlist":
        setValue(1);
        break;
      case "clientstatement":
        setValue(2);
        break;
      case "pricing":
        setValue(3);
        break;
      case "runfees":
        setValue(4);
        break;
      case "runfees/ifafeesbreakdown":
        setValue(4);
        break;
      case "fundbenchmark":
        setValue(5);
        break;
      case "factsheets":
        setValue(6);
        break;
      
      default:
        setValue(-1);
        break;
    }
  }, [activePage]);
  return (
    <>
      {/* <Navlink /> */}
      <Breadcrumb/>
      <div className={styles.waltCapitalContainer}>
        <div className={styles.waltCapitalHeaderContainer}>
          <WaltHeader />
        </div>
        {activePage !== "activatedeactivatefund" && (
          <Tab data={GlobalFundType} value={value} setValue={setValue} />
        )}
        {children}
      </div>
    </>
  );
};

export default WaltCapitalGlobal;
