import styles from "./cardFeature.module.scss";

export const CardFeature = ({
  icon,
  feature,
  description,
  mouseEnter,
  mouseLeave,
}) => {
  return (
    <>
      <div className={styles.cardFeatureContainer}>
        <div
          className={styles.benefitImageContainer}
          onMouseEnter={mouseEnter}
          onMouseLeave={mouseLeave}
        >
          {icon}
        </div>
        <p className={styles.featureText}>{feature}</p>
        <p className={styles.descriptionText}>{description}</p>
      </div>
    </>
  );
};
