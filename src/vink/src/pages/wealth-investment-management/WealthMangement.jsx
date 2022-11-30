import NavbarV2 from "../../components/navbar-v2/NavbarV2";
import { wealthManagementNavbarData } from "../../data/data";
import AboutVmsInfo from "../about-vms/about-vms-info/AboutVmsInfo";
import ServicesSolutions from "./services-solutions/ServicesSolutions";
import styles from "./wealthmanagement.module.scss";
import experienceService from "../../assests/images/experienceService.png";
import Advisor from "../wealth-investment-management/advisor/Advisor";
import PrivateBankingInfo from "./private-banking-info/PrivateBankingInfo";
import StrategyAndSolutions from "./strategy-and-solutions/StrategyAndSolutions";
import DiscoverBussiness from "./discover-business/DiscoverBusiness";

const WealthManagement = () => {
  return (
    <div className={styles.wealthManagementMainContainer}>
      <NavbarV2 navbarData={wealthManagementNavbarData} />
      <ServicesSolutions />
      <StrategyAndSolutions />
      <AboutVmsInfo
        title="Experience high-touch service with a tailored approach."
        subtitle="While we have the services and solutions to fulfill our clients’ every need, what is even more uncommon is the way in which we serve our clients. Learn more about our approach to planning for your future."
        buttonText="Meet Our Experts"
        image={experienceService}
        customClass={styles.customClassForExperience}
        customClassForImage={styles.ImageContainer}
        customClassForText={styles.experienceTextContainer}
        alt="Experience Service"
      />
      <Advisor />
      <DiscoverBussiness />
      <PrivateBankingInfo />
    </div>
  );
};
export default WealthManagement;
