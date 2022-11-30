import OfferCard from "../../../components/offer-card/OfferCard";
import styles from "./featuredOffers.module.scss";
import capitalCard from "../../../assests/images/capitalCard.png";
import { featuredOfferData } from "../../../data/data";

const FeaturedOffers = () => {
  return (
    <>
      <div className={styles.mainContainer}>
        <div className={styles.featuredOffersContainer}>
          <p className={styles.featuredOfferText}>
            Featured Offers from Our Partners
          </p>
          <div className={styles.offerCardContainer}>
            {featuredOfferData.map((item, index) => {
              return (
                <OfferCard
                  key={index}
                  creditCardTitle={item.creditCardTitle}
                  rewardTitle={item.rewardTitle}
                  cardImage={item.cardImage}
                  cardInfo={item.cardInfo}
                />
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default FeaturedOffers;
