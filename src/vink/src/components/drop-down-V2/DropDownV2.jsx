import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Divider from "../divider/Divider";
import styles from "./dropdownv2.module.scss";

const DropDownV2 = ({ data,value }) => {
  const navigate = useNavigate();
  const handleNavigate = (item) => {
   item.link && navigate(item.link);
  }
  return (
    <>
      {data &&
        data.map((item, index) => {
          return (
            <>
              <div
                key={index}
                className={index === value ?styles.dropDownContentActive :styles.dropDownContent}
                onClick={() => handleNavigate(item)}
              >
                {item.name}
              </div>
              {index !== data.length - 1 && (
                <Divider customClass={styles.divideLine} />
              )}
            </>
          );
        })}
    </>
  );
};

export default DropDownV2;
