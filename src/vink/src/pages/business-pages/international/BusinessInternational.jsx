import BusinessStudioCard from "../../../components/buisness-studio-card/BusinessStudioCard";
import { businessInternationalCardData } from "../../../data/data";
import styles from "./businessinternational.module.scss";

const BusinessInternational = () => {
  return (
    <div className={styles.businessMainContainer}>
      {businessInternationalCardData.map((item, index) => {
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
  );
};
export default BusinessInternational;
