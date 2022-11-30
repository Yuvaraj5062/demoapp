import React from 'react'
import styles from "./iconcontainer.module.scss";
const IconContainer = ({customClass,handleClick,icon}) => {
  return (
    <span  className={[ styles.icon,customClass,].join(" ")}
      onClick={()=>handleClick?handleClick():{}}>
    {icon}
    </span>
  )
}

export default IconContainer