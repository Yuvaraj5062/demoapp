import React from 'react'
import moment from "moment";
const YearPickerV1 = ({ reference, startDate, setStartDate, customClass}) => {

  const date = new Date();
  const minDate=new Date();
  date.setFullYear(date.getFullYear() - 18); // For subtract use minus (-)
  minDate.setFullYear(date.getFullYear() - 100)

  return (
    
      <input className={customClass}
        type="date"
           min={moment(minDate).format("yyyy-MM-DD")}
        max={moment(date).format("yyyy-MM-DD")}
        onChange={(e) => setStartDate(e.target.value)}
        value={startDate}
        // onKeyDown={(e) => e.preventDefault()} 
        >

      </input>
    
  )
}

export default YearPickerV1