import React from "react";
import { color } from "../../constants/color";
import Button from "../button/Button";
import Divider from "../divider/Divider";
import InvestorSearch from "../investorSearch/InvestorSearch";
import { DropDownIcon } from "../svg-components";
import styles from "./investorOption.module.scss";

const InvestorOption = () => {
  return (
    <>
      <div className={styles.investorOptionContainor}>
        <Divider customClass={styles.investorDivider} />
        <div className={styles.investorInfo}>
          <div className={styles.investorBtns}>
            <Button
              title="Reset"
              customClass={styles.investorResetBtn}
              customClassForText={styles.investorResetBtnText}
            />
            <Button
              title="New Option"
              icon={<DropDownIcon fillColor={color.white1} />}
              customClass={styles.investorOptionBtn}
              customClassForText={styles.investorOptionBtnText}
            />
          </div>
          <InvestorSearch />
        </div>
        <Divider customClass={styles.investorDivider} />
      </div>
    </>
  );
};

export default InvestorOption;
