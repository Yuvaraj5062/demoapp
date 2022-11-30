import React, { useState } from "react";
import { color } from "../../constants/color";
import { DropDownIcon } from "../svg-components";
import styles from "./dropDown.module.scss";
import { useDispatch } from "react-redux";
import {
  getAccountType,
  getSubCategory,
  resetSubCatAndAccType,
} from "../../redux/auth/register/registerSlice";

const DropDown = ({
  dropDownData,
  customClass,
  customClassForDropDownValue,
  setdropdown,
  dropdown,
  name,
  placeholder,
  dispatchAction,
  errorMsg,
  readOnly,
  handleChange,
}) => {
  const [state, setState] = useState(false);
  // const [value, setValue] = useState(dropDownData[0]);

  const dispatch = useDispatch();
  const handlevalue = (item, e) => {
    setdropdown(item);
    setState(false);
    if (dispatchAction === "category") {
      dispatch(resetSubCatAndAccType());
      dispatch(getSubCategory(item.id));
    }
    if (dispatchAction === "subCategory") {
      dispatch(getAccountType(item.id));
    }
  };

  // const [searchField, setSearchField] = useState("");
  // const [search, setSearch] = useState("");

  // const handleChange = (e) => {
  //   console.log("xatfdwt");
  //   dropDownData.filter((item) => {
  //     return (
  //       item.toLowerCase().includes(searchField.toLowerCase()) ||
  //       item.toLowerCase().includes(searchField.toLowerCase())
  //     );
  //   });
  //   setSearchField(e.target.value);
  // };

  return (
    <div className={[styles.dropdown, customClass].join(" ")}>
      <div
        className={styles.dropDownContainer}
        onClick={() => (readOnly ? {} : setState(!state))}
      >
        {/* <span
          className={[styles.dropDownItem, customClassForDropDownValue].join(
            " "
          )}
        >
          {dropdown}
        </span> */}
        <input
          className={[styles.dropDownItem, customClassForDropDownValue].join(
            " "
          )}
          value={dropdown}
          // value={value}
          // type="search"
          // value={search || dropdown}
          // onChange={(e) => setSearch(e.target.value)}
          onChange={handleChange}
          placeholder={placeholder}
        />
        <span className={styles.dropDownIcon}>
          <DropDownIcon fillColor={color.grey} />
        </span>
      </div>
      {/* {errorMsg && <div className={styles.errorMsg}>{errorMsg}</div>} */}
      {state && dropDownData && dropDownData.length > 0 && (
        <div className={styles.dropDownContent}>
          {/* .filter((item1) => {
              if (search === "") {
                return item1;
              } else if (
                item1.title.toLowerCase().includes(search.toLowerCase())
              ) {
                return item1;
              }
            }) */}
          {dropDownData.map((item, index) => {
            return (
              <p
                className={styles.dropDownValue}
                key={index}
                onClick={() => handlevalue(item)}
              >
                {item[name]}
              </p>
            );
          })}
        </div>
      )}
      {errorMsg && <p className={styles.errorMsg}>{errorMsg}</p>}
    </div>
  );
};

export default DropDown;
