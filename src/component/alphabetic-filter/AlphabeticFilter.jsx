import { useState } from "react";
import Divider from "../divider/Divider";
import styles from "./alphabeticfilter.module.scss";

const AlphabeticFilter = ({
  title,
  customClass,
  alphabet,
  setAlphabet,
  setSearchString,
  handleAll,
}) => {
  // const [value, setValue] = useState(9);
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
  /* const handleClick = (index) => {
    setValue(index);
  }; */
  return (
    <>
      <div className={[styles.allClients, customClass].join(" ")}>
        <span
          className={styles.allClientsText}
          onClick={() => {
            setSearchString("");
            setAlphabet("");
            handleAll();
          }}
        >
          All {title}
        </span>
        <Divider customClass={styles.divider} />
        {initial.map((item, index) => {
          return (
            <span
              className={
                item === alphabet
                  ? styles.initialLetterActive
                  : styles.initialLetter
              }
              key={index}
              onClick={() => {
                setAlphabet(item);
              }}
            >
              {item}
            </span>
          );
        })}
      </div>
    </>
  );
};

export default AlphabeticFilter;
