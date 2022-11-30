import { useEffect, useState } from "react";
import Divider from "../divider/Divider";
import { AccordionCloseIcon, AccordionOpenIcon } from "../svg-components";
import styles from "./accordion.module.scss";
import { accordionData } from "../../data/data";


const Accordion = ({ item, index }) => {
  const [show, setShow] = useState({});

  return (
    <>
      {accordionData.map((item, index) => {
        return (
          <div className={styles.accordionContainer}>

            <div className={styles.accordionCloseContainer}>
              <p className={styles.accordionText}>{item.name}</p>
              {show.flag && show.id === index ? (
                <AccordionCloseIcon
                  handleClick={() => {
                    setShow({ ...accordionData[index], flag: false })
                  }}
                  customClass={styles.closeStyle}
                />
              ) : (
                <AccordionOpenIcon
                  handleClick={() => setShow({ ...accordionData[index], flag: true })}
                  customClass={styles.openStyle}
                />
              )}
            </div>


            {show.flag && show.id === index && (
              <>
                <Divider customClass={styles.dividerClass} />
                <p className={styles.accordionContent}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras nec
                  suscipit ipsum. Suspendisse placerat ac lacus vel egestas. Mauris
                  laoreet, eros eget ornare laoreet, lectus sapien rutrum metus,
                  dapibus volutpat ligula nibh bibendum lectus. Proin ac congue
                  diam. Suspendisse pharetra porttitor nisi, non iaculis nibh
                  commodo sed. Sed feugiat facilisis vestibulum.{" "}
                </p>
              </>
            )}
          </div>
        )
      })}
    </>
  );
};

export default Accordion;
