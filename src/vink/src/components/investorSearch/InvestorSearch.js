import React from "react";
import styles from "./investorSearch.module.scss";
import Button from "../button/Button";

const InvestorSearch = () => {
  return (
    <>
      <form className={styles.investorSearch}>
        <input
          type="text"
          placeholder="Search"
          name="search"
          className={styles.investorInput}
        />
        <Button
          title="Submit"
          customClass={styles.investorSearchBtn}
          customClassForText={styles.investorSearchBtnText}
        />
      </form>
    </>
  );
};

export default InvestorSearch;
