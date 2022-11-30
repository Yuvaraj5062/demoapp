import AboutVmsInfo from "./about-vms-info/AboutVmsInfo";
import styles from "./aboutVms.module.scss";
import investingBankers from "../../assests/images/investingBankers.png";
import meetOurExpert from "../../assests/images/meetOurExpert.png";
import meetOurSolutions from "../../assests/images/meetOurSolutions.png";
import OurApproach from "./our-approach/OurApproach";
import BuildingSuccess from "./building-success/BuildingSuccess";
import CorporateOverview from "./corporate-overview/CorporateOverview";
import Experience from "./experience/Experience";
import NavbarV2 from "../../components/navbar-v2/NavbarV2";
import ImageGallery from "./image-gallery/ImageGallery";
import AboutVmsTabs from "./about-vms-tabs/AboutVmsTabs";
import CharacterCommitment from "./character-commitment/CharacterCommitment";
import { aboutVmsNavbarData } from "../../data/data";
// import Footer from "../../components/footer/Footer";

const AboutVms = () => {
  return (
    <>
      <div className={styles.aboutVmsContainer}>
        <NavbarV2 navbarData={aboutVmsNavbarData} />
        <CorporateOverview />
        <Experience />
        <AboutVmsInfo
          title="Driving your success by investing in the best bankers"
          subtitle="We know that our people are our greatest asset. We’ve developed our company culture on a foundation of respect for and commitment to our clients and one another. "
          buttonText="Experience Our Culture"
          image={investingBankers}
          alt={"Investing Bankers logo"}
        />

        <AboutVmsInfo
          title={"Committed to you through every phase of your business"}
          subtitle={
            " Our national scale has given us the determination to grow the bank and deepen our expertise while delivering results for our clients. We embody a spirit of innovation and trust that empowers us to focus on the growth and success of your business. "
          }
          buttonText={"Meet Our Experts"}
          image={meetOurExpert}
          customClass={styles.aboutVmsInfoContainer}
          customClassForImage={styles.ImageContainer}
          customClassForText={styles.investTextContainer}
          alt={"Meet Our Expert"}
        />
        <AboutVmsInfo
          title={"Tailored solutions powered by deep experience"}
          subtitle={
            " We merge our financial expertise and industry-specific experience to think creatively around your needs, and tailor a solution that fits your business perfectly. Our bankers are positioned to help with a suite of business lending, investing and financial management services designed to focus your finances — so you can focus on your business."
          }
          buttonText={"Explore Our Solutions"}
          image={meetOurSolutions}
          alt={"Meet Our Solutions "}
        />
        <AboutVmsTabs />
        <OurApproach />
        <BuildingSuccess />
        <ImageGallery />
        <CharacterCommitment />
        {/* <Footer scrollRef={scrollRef} /> */}
      </div>
    </>
  );
};

export default AboutVms;
