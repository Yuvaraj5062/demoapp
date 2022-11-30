import styles from "./watchlistmain.module.scss";
import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import Tab from "../../../component/tabs/Tabs";

const WatchlistMain = ({ children }) => {
  const [value, setValue] = useState(0);
  const activePage = Object.values(useParams())[0];
  const WatchListType = [
    { title: "Manage Software Access", navigate: "managesoftwareaccess" },
    { title: "Upload CSV Data", navigate: "uploadcsvdata" },
    { title: "Manage Lookup Data", navigate: null },
  ];
  useEffect(() => {
    switch (activePage) {
      case "managesoftwareaccess":
        setValue(0);
        break;
      case "uploadcsvdata":
        setValue(1);
        break;
      case "managelookupdata":
        setValue(2);
        break;

      default:
        setValue(-1);
        break;
    }
  }, [activePage]);
  return (
    <>
      <div className={styles.mainContainer}>
        {activePage !== "watchlistdata" && (
          <Tab
            data={WatchListType}
            value={value}
            setValue={setValue}
            customTable={styles.table}
            customType={styles.type}
            customClass={styles.text}
            customText={styles.text}
          />
        )}
        {children}
      </div>
    </>
  );
};
export default WatchlistMain;
