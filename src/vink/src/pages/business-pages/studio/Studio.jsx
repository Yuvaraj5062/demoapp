import BusinessStudioCard from "../../../components/buisness-studio-card/BusinessStudioCard";
import { studioCardData } from "../../../data/data";
import styles from "./studio.module.scss";

const Studio = () => {
  return (
    <>
      <div className={styles.studioMainContainer}>
        {studioCardData.map((item, index) => {
          return (
            <BusinessStudioCard
              icon={item.icon}
              title={item.title}
              desciption={item.description}
              key={index}
            />
          );
        })}
      </div>
    </>
  );
};

export default Studio;
