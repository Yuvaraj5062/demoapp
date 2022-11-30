import Title from "../../../components/title/Title"
import { sharePriceData } from "../../../data/data";
import SharePriceCard from "./share-price-card/SharePriceCard";
import ShareQuoteCard from "./share-quote-card/ShareQuoteCard";
import styles from './shareprice.module.scss'

const SharePrice = () => {
    return (
        <div className={styles.sharePriceMainContainer}>
            <div className={styles.sharePriceContent}>
                <Title title="Our Share Price in Action" />
                <div className={styles.cardsContainer}>
                    <ShareQuoteCard />
                    {sharePriceData?.map((data) => <SharePriceCard data={data} />)}
                </div>
            </div>
        </div>
    )
}
export default SharePrice;