import styles from "./investorrelation.module.scss";
import NavbarV2 from "../../components/navbar-v2/NavbarV2";
import ButtonV2 from "../../components/buttonV2/ButtonV2";
import {
  performanceTypeCardData,
  investorRelationData,
  investorRelationNavbarData,
  investingInVinkData,
  documentAndReportData,
  corporateGovernanceData,
  responsibilityHead,
  responsibilityBody,
} from "../../data/data";
import Tab from "../../components/tab/Tab";
import ParagraphCard from "../../components/paragraph-card/ParagraphCard";

import MultiServices from "./multi-services/MultiServices";
import InvestorNews from "./investor-news/InvestorNews";
// import i from '../../assests/images/i.png'

import PerformanceTypeCard from "./peroformance-type-card/PerformanceTypeCard";
import SharePrice from "./share-price/SharePrice";
import Title from "../../components/title/Title";
import ImageCard from "../../components/image-card/ImageCard";
import Responsibility from "./responsibility/Responsibility";
const InvestorRealation = ({ children }) => {
  return (
    <div className={styles.investorRelatoinMainContainer}>
      <NavbarV2 navbarData={investorRelationNavbarData} />
      <div className={styles.investorRelationImageContainer}>
        {" "}
        {/* Investor Relation Image with Card */}
        <div className={styles.investorRelationContent}>
          <span className={styles.title}>Investor Relations</span>
          <div className={styles.performanceCard}>
            <div className={styles.performanceCardLeft}>
              <div className={styles.title}>PERFORMANCE HIGHLIGHTS</div>
              <div className={styles.finicialYear}>FY - 2022</div>
              <ButtonV2 title="Download" />
              <div className={styles.performanctHighlights}>
                We remained focused on achieving our 2025 vision by growing
                customer numbers to over 10.7 million while at the same time
                repositioning our client solutions approach to serve our
                customers better.
              </div>
            </div>
            <div className={styles.performanceCardRight}>
              {performanceTypeCardData.map((item, index) => {
                return <PerformanceTypeCard item={item} key={index} />;
              })}
            </div>
          </div>
          <span className={styles.companyMilestomeText}>
            In 2021, the Company attained a historical milestone, being the
            first South Africa company to record million ins of profit after
            tax.
          </span>
        </div>
      </div>
      <MultiServices />

      {/* {/ 3 Reasons to Consider Investing inVINK MUILTI SERVICES PTY LTD /} */}
      <div className={styles.threeReasontitle}>
        <Title title="3 Reasons to Consider Investing in VINK MUILTI SERVICES PTY LTD" />
      </div>

      <ImageCard
        data={investingInVinkData}
        customClass={styles.imageCart}
        customClassContainer={styles.customClassContainer}
        imageContainerClass={styles.imageContainer}
        cardTitleClass={styles.cardTitle}
        cardSubTitleClass={styles.cardSubTitleText}
      />
      <SharePrice />
      <InvestorNews />

      {/* Documents and Reports */}

      <ParagraphCard data={documentAndReportData} />
      <Responsibility />
      {/* {/ Corporate Governance /} */}
      <ParagraphCard data={corporateGovernanceData} />
      <Tab tabData={investorRelationData} />
      {children}
    </div >
  );
};

export default InvestorRealation;
