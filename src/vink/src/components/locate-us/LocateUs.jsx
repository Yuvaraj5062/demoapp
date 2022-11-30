import { quickLinks } from "../../data/data";
import Search from "../search/Search";
import { RightIcon } from "../svg-components";
import styles from "./locateUs.module.scss";
const LocateUs = () => {
  return (
    <div className={styles.locateUsMainContainer}>
      <Search title="Search an area or location" />
      <div className={styles.quickHeadsUp}>
        A quick heads-up for when you visit us:
      </div>
      <div className={styles.LocateUsQuickLinksMain}>
        {quickLinks?.map((data) => {
          return (
            <>
              <ul className={styles.listData}>
                <li className={styles.LocateUsQuickLinksMenuTitle}>
                  {data.title}
                </li>
                {data?.menu.map((data) => (
                  <li className={styles.LocateUsQuickLinksMenuLinks}>
                    <RightIcon customClass={styles.rightIcon} />
                    {data}
                  </li>
                ))}
              </ul>
            </>
          );
        })}
      </div>
    </div>
  );
};
export default LocateUs;
