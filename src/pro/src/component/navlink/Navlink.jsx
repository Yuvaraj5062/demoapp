import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import styles from "./navlink.module.scss";
const Navlink = ({ birthdayType }) => {
  const path = useLocation().pathname;
  const [links, setLinks] = useState([]);
  // const handleLink = (name,route)=> {
  //   setLinks([{
  //     name:name,
  //     route:route
  //   }])
  // }
  useEffect(() => {
    switch (path) {
      case "/reports":
        setLinks(["Clients > ", "Reports > ", birthdayType]);
        break;
      // case "/reports/aum-summary":
      //   setLinks(["Reports ", " / AUM Summary"]);
      //   break;
      case "/reports/runfeesppm":
        setLinks(["Reports ", " / Run fees PPM"]);
        break;
      case "/reports/runfees-tradestation":
        setLinks(["Reports ", " / Run Fees Trade Station"]);
        break;
      case "/reports/runfees-ib":
        setLinks(["Reports ", " / Run fees IB"]);
        break;
      case "/reports/monthendfees-template":
        setLinks(["Reports ", " / Month end fees Template"]);
        break;
      case "/reports/portfoliomanagerfee":
        setLinks(["Reports ", " / Portfolio manager fee"]);
        break;
      case "/reports/fundfee":
        setLinks(["Reports ", " / Fund Fees"]);
        break;
      case "/reports/ppm-client-list":
        setLinks(["Reports ", " / PPM Client List"]);
        break;
      case "/reports/ppm-client-list-tfsa":
        setLinks(["Reports ", " / PPM TFSA Client List"]);
        break;
      case "/reports/allan-gray-client-list":
        setLinks(["Reports ", " / Allen Gray Client List"]);
        break;
      case "/reports/trade-station-client-list":
        setLinks(["Reports ", " / Tradestation Client List"]);
        break;
      case "/reports/interactive-brokers-client-list":
        setLinks(["Reports ", " / Interactive Brokers Client List"]);
        break;
      case "/clients":
        setLinks(["Clients"]);
        break;
      // case "/fund-administration":
      //   setLinks(["Walt Capital Global Fund"]);
      //   break;
      case "/fund-administration/clienttransaction":
        setLinks(["Fund Administration  ", " / Client Transaction"]);
        break;
      case "/fund-administration/activatedeactivatefund":
        setLinks(["Fund Administration   ", "/ Activate or Deactivate funds"]);
        break;
      case "/fund-administration/clientlist":
        setLinks(["Fund Administration   ", " / Client List"]);
        break;
      case "/fund-administration/clientstatement":
        setLinks(["Fund Administration  ", " / Client Statement"]);
        break;
      case "/fund-administration/pricing":
        setLinks(["Fund Administration  ", " / Pricing"]);
        break;
      case "/fund-administration/runfees":
        setLinks(["Fund Administration  ", " / Run Fees"]);
        break;
      case "/fund-administration/fundbenchmark":
        setLinks(["Fund Administration ", " / Fund benchmark"]);
        break;
      case "/fund-administration/factsheets":
        setLinks(["Fund Administration  ", " / Fact sheets"]);
        break;
      case "/clients/1":
        setLinks(["Clients/", " Drago Mijatović"]);
        break;
      case "/crm":
        setLinks(["Clients/", "Add New Client "]);
        break;
      case "/crm/brokergefees":
        setLinks([
          "Clients/Add New Client/",
          "Walt Capital Brokerage Fees Equity and TFSA PPM ",
        ]);
        break;
      case "/ifas/ifaclientlist":
        setLinks(["IFAs/", " IFA Client List"]);
        break;
      case "/ifas/monthlyreports":
        setLinks([
          "IFA's /Add new IFAs/Personal Data Continue/",
          "Generate IFA Invoice",
        ]);
        break;
      case "/ifas/addnewifas":
        setLinks(["IFAs/", " Add New IFAs"]);
        break;
      case "/ifas/1":
        setLinks(["IFAs/", " Add new IFAs"]);
        break;
      case "/ifas/ifaaumreport":
        setLinks(["IFAs /", "IFA John Snow AUM Summary"]);
        break;
      case "/maintenanceportal/runfeesppm":
        setLinks(["Maintenance Portal/", " Run Fees PPM"]);
        break;
      case "/offshore":
        setLinks(["Offshore/ ", " Client list "]);
        break;
      case "/walt-capital-global-fund-investor":
        setLinks(["Walt Cap Global Fund"]);
        break;
      case "/fund-administration/runfees/ifafeesbreakdown":
        setLinks([
          "Walt Cap Global Fund / ",
          "Run Fees / ",
          "IFA Fee Breakdown",
        ]);
      case "/ifas/addnewifas/generateifainvoice":
        setLinks(["Add new IFA's / ", " Generate IFA Invoice"]);
        break;
      case "/portfolio/ppm-model-equity-portfolio":
        setLinks(["Dashboard /", " PPM Model Equity Portfolio"]);
        break;
      case "/portfolio/ppm-tfsa-model-portfolio":
        setLinks(["Dashboard /", " PPM TFSA Model Portfolio"]);
        break;
      case "/portfolio/walt-capital-global-fund-investor":
        setLinks(["Dashboard /", " Walt Capital Global Fund Investor"]);
        break;
      case "/daily-trade-log":
        setLinks(["Dashboard /", " Daily Trade Log"]);
        break;
      case "/clients/1/waltcapital":
        setLinks([
          "Clients /",
          " Drago Mijatović /",
          " Walt Capital Global Fund ",
        ]);
        break;
      case "/clients/1/allan-gray-ra":
        setLinks(["Clients /", " Drago Mijatović /", " Allan Gray RA "]);
        break;
      default:
        setLinks([]);
    }
  }, [path, birthdayType]);
  return (
    <div className={styles.navlinkContainer}>
      {links.map((item, index) => {
        return (
          <span
            key={index}
            className={
              index === links.length - 1
                ? styles.navlinkTextBlue
                : styles.navlinkText
            }
          >
            {item}
          </span>
        );
      })}
    </div>
  );
};

export default Navlink;
