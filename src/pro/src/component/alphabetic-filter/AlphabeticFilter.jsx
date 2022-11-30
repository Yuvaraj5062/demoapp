import styles from "./alphabeticfilter.module.scss";
import Divider from "../divider/Divider";
import { useState } from "react";

const AlphabeticFilter = ({ title, customClass }) => {
  const [value,setValue] = useState(9);
  const initial = [
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z",
  ];
  const handleClick = (index)=> {
    setValue(index);
  }
  return (
    <>
      <div className={[styles.allClients, customClass].join(" ")}>
        <span className={styles.allClientsText}>All {title}</span>
        <Divider customClass={styles.divider} />
        {initial.map((item, index) => {
          return (
            <span className={index === value ? styles.initialLetterActive  : styles.initialLetter} key={index} onClick={()=>{handleClick(index)}}>
              {item}
            </span>
          );
        })}
      </div>
    </>
  );
};

export default AlphabeticFilter;
