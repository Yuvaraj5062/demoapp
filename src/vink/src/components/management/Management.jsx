import { executiveManagementData } from "../../data/data";
import Title from "../title/Title";
import styles from "./management.module.scss";
import PersonImage from "../../components/personImage/PersonImage";

const Management = () => {
  return (
    <>
      <div className={styles.managementContainer}>
        <Title title="Executive Management" customClass={styles.titleStyle} />
        <div className={styles.imageContainer}>
          {executiveManagementData.map((item, index) => {
            return <PersonImage img={item.img} name={item.name} key={index} />;
          })}
        </div>
      </div>
    </>
  );
};

export default Management;
