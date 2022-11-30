import { useState } from "react";
import TabsV2 from "../../../components/tab/tabsV2/TabsV2";
import Title from "../../../components/title/Title";
import Tooltip from "../../../components/tooltip/Tooltip";
import { aboutvmsTabs } from "../../../data/data";
import styles from "./aboutvmstabs.module.scss";
const AboutVmsTabs = () => {
  const [value, setValue] = useState(0);
  const [tootipContent, setTooltipContent] = useState(aboutvmsTabs[0].content);
  const handleActive = (item) => {
    // console.log('active called...',item);
    item && setValue(item.id);
    item && setTooltipContent(item.content);
  };
  return (
    <div className={styles.mainContainer}>
      <div className={styles.tabsTitleContainer}>
        <div className={styles.title}>Commit to your success How we</div>
        <TabsV2
          data={aboutvmsTabs}
          handleClick={handleActive}
          value={value}
          tootipContent={tootipContent}
        />
        <Tooltip
          content={tootipContent}
          customClass={styles[tootipContent?.customClass]}
        />
      </div>
    </div>
  );
};
export default AboutVmsTabs;
