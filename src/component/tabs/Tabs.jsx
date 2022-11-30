import styles from "./tabs.module.scss";
import { LeftArrow } from "../svg-components";
import { useNavigate } from "react-router-dom";
const Tab = ({
  data,
  value,
  setValue,
  arrow,
  customClass,
  customType,
  customTable,
  customText,
}) => {
  const navigate = useNavigate();
  const handleClick = (item, index) => {
    setValue(index);
    item && navigate(item);
  };

  return (
    <div className={[styles.birthdayReportTable, customTable].join(" ")}>
      <div className={[styles.birthdayType, customType].join(" ")}>
        {arrow && <LeftArrow fillColor="#ffffff" />}
        {data.map((item, index) => {
          return (
            <span
              key={index}
              className={
                index === value
                  ? [styles.activeBirthdayText, customText].join(" ")
                  : [styles.birthdayText, customClass].join(" ")
              }
              onClick={() => handleClick(item.navigate, index)}
            >
              {item.title ? item.title : item}
            </span>
          );
        })}
        <span></span>
      </div>
    </div>
  );
};

export default Tab;
