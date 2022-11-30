import styles from "./investorNews.module.scss";
import Title from "../../../components/title/Title";
import InvestorOption from "../../../components/investorOption/InvestorOption";
import InvestorData from "../../../components/investorNewsData/investorNewsData";
import { investorNewsData } from "../../../data/data";

const InvestorNews = () => {
  return (
    <>
      <div className={styles.investorNewsContainer}>
        <Title title="Investor News" customClass={styles.titleStyle} />
        <InvestorOption />
        {investorNewsData?.map((item, index) => {
          return (
            <>
              <InvestorData
                key={index}
                investorDate={item.investorDate}
                investorMonth={item.investorMonth}
                investorYear={item.investorYear}
                investorHeading={item.investorHeading}
                investorInfo={item.investorInfo}
              />
            </>
          );
        })}
      </div>
    </>
  );
};

export default InvestorNews;
