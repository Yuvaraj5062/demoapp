import React from "react";
import CardFeatureAndBenefits from "./card-feature-and-benefits/CardFeatureAndBenefits";
import SecurityAndGlobal from "./security-and-global/SecurityAndGlobal";
import SelectCard from "./select-card/SelectCard";
import BonusPointCash from "../bonus-point-cash/BonusPointCash";
import CreditCardScoreReport from "./credit-card-score-report/CreditCardScoreReport";
import FeaturedOffers from "./featured-offers/FeaturedOffers";
import NeedHelp from "./need-help/NeedHelp";
import StartNow from "../../components/start-now/StartNow";
import HomeSliderMain from "./home-slider-main/HomeSliderMain";

const Home = () => {

  return (
    <>
      <StartNow />
      <HomeSliderMain />
      <CardFeatureAndBenefits />
      <SecurityAndGlobal />
      <SelectCard />
      <BonusPointCash />
      <CreditCardScoreReport />
      <FeaturedOffers />
      <NeedHelp />
    </>
  );
};

export default Home;
