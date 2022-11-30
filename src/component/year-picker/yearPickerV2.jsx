import moment from "moment";
import React from "react";
const YearPickerV2 = ({
  reference,
  startDate,
  setStartDate,
  customClass,
  name,
  handleChange,
  readOnly,
  disabled,
}) => {
  const date = new Date();
  const minDate = new Date();
  date.setFullYear(date.getFullYear() - 18); // For subtract use minus (-)
  minDate.setFullYear(date.getFullYear() - 100);

  return (
    <input
      className={customClass}
      type="date"
      disabled={disabled}
      // min={moment(minDate).format("yyyy-MM-DD")}
      max={moment(253402214400000).format("yyyy-MM-DD")}
      onChange={(e) => handleChange(e)}
      value={startDate ? moment(startDate).format("yyyy-MM-DD") : ""}
      name={name}
      // onKeyDown={(e) => e.preventDefault()}
      readOnly={readOnly ? readOnly : false}
    ></input>
  );
};

export default YearPickerV2;
