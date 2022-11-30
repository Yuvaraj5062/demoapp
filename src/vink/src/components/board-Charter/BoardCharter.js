import React from "react";
import { boardCharterData } from "../../data/data";
import styles from "./boardCharter.module.scss";

const BoardCharter = () => {
  return (
    <>
      <div className={styles.boardMainContainer}>
        <p className={styles.boardMainTitle}>THE BOARD CHARTER</p>
        <p className={styles.boardSubTitle}>sets out the following</p>
        <ol className={styles.boardInfo}>
          {boardCharterData?.map((item) => {
            return <li className={styles.boardList}>{item}</li>;
          })}
        </ol>
      </div>
    </>
  );
};

export default BoardCharter;
