import NavbarV2 from "../../components/navbar-v2/NavbarV2";
import BenefitsOfBanking from "./benefit-of-banking/BenefitsOfBanking";
import ParagraphCard from "../../components/paragraph-card/ParagraphCard";
import {
  aboutVmsNavbarData,
  bankingTabsData,
  goalData,
  locationData,
  onlineBankingListData,
  solutionData,
} from "../../data/data";
import PersonalBankingInfo from "./personal-banking-info/PersonalBankingInfo";
import StepOfWay from "./step-of-way/StepOfWay";
import styles from "./personalbanking.module.scss";
import OnlineBanking from "./online-banking/OnlineBanking";
import NewsWeekCard from "../../components/news-week/NewsWeekCard";
import Title from "../../components/title/Title";
import TabsV2 from "../../components/tab/tabsV2/TabsV2";
import OnlineBankingCard from "../../components/online-banking-card/OnlineBankingCard";
import Divider from "../../components/divider/Divider";
import Button from "../../components/button/Button";
import { Dot } from "../../components/svg-components";
import { color } from "../../constants/color";
const PersonalBanking = () => {
  return (
    <>
      <NavbarV2 navbarData={aboutVmsNavbarData} />
      <PersonalBankingInfo />
      <StepOfWay />
      <BenefitsOfBanking />
      <NewsWeekCard />
      <OnlineBanking />
      <ParagraphCard
        data={goalData}
        customClass={styles.paragraphContainer}
        customClassForTitle={styles.title}
        customClassForInfo={styles.info}
      />
      <div className={styles.paraContainer}>
        <ParagraphCard
          data={solutionData}
          customClass={styles.solutionParagraph}
          customClassFormain={styles.customClassFormain}
        />
      </div>
      <div className={styles.bankingWithUs}>
        <Title title="Already banking with us?" />
        <TabsV2 value={-1} data={bankingTabsData} />
      </div>
      <div className={styles.atmAndLocations}>
        <Title title="ATMs and locations across the country" />
        <div className={styles.atmLocationContainer}>
          {/* <OnlineBankingCard
            listData={locationData}
            buttonTitle="View All Locations"
            title="Locations"
          /> */}
          <div className={styles.location}>
            <span className={styles.locationText}>Locations</span>
            <div className={styles.listContainer}>
              {locationData.map((item, index) => {
                return (
                  <div className={styles.list} key={index}>
                    <Dot fillColor={color.purple1} />
                    <span className={styles.listItem}>{item.listtxt}</span>
                  </div>
                );
              })}
            </div>
            <Button
              title="View All Locations"
              customClass={styles.button}
              customClassForText={styles.buttonText}
            />
          </div>
          <Divider customClass={styles.divider} />
          <div className={styles.atms}>
            <span className={styles.atmText}>ATMs</span>
            <p className={styles.atmContent}>
              More than 55,000 fee-free ATM locations throughout the African
              Continent. So you can bank wherever you are.
            </p>
            <Button
              title="Finad An Allpoint ATM"
              customClass={styles.button}
              customClassForText={styles.buttonText}
            />
          </div>
        </div>
      </div>
    </>
  );
};
export default PersonalBanking;
