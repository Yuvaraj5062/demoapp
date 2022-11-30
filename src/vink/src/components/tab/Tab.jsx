import { useEffect } from "react";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import DividerV2 from "../divider/dividerV2/DividerV2";
import styles from "./tab.module.scss";

const Tab = ({ tabData,FormType,setFormType,scrollRef }) => {
  const [active, setActive] = useState(0);
  // console.log('tab..?',tabData);
  const navigate = useNavigate();
  const path = useLocation().pathname;
  useEffect(()=>{
    tabData.map((item)=>{
      if(item.navigate === path.split('/')[2]){
        setActive(item.id)
      }
    })
  },[path])
  const handleNavigate = (item) => {
    setFormType && setFormType(item.name)
    // console.log('id..?',id)
    item.navigate && navigate(item.navigate);
    item.id && setActive(item.id)
    // console.log('active..??',active,"id..?",id)
   }
   useEffect(()=>{
    tabData.map((item)=>{
      if(item.name === FormType ){
        setActive(item.id)
      }
    })
  },[FormType])
  return (
    <>
      <div className={styles.tabContainer} ref={scrollRef}>
        {tabData.map((item, index) => {
          return (
            <div className={styles.tabItemsContainer}>
              <span
                className={
                  index != active ? styles.contactText : styles.activeText
                }
                key={index}
                // onClick={() => {navigate(item.navigate);setActive(item.id)}}
                onClick={() => handleNavigate(item)}
              >
                {item.name}
                {/* <div className={styles.borderStyle}></div> */}
                
              </span>
              {/* { && (
                <BorderBottomIcon customClass={styles.border} />
              )} */}
              {index === active && <DividerV2/>}  
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Tab;
