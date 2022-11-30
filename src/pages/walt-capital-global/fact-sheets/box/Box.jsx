import React from 'react'
import styles from './box.module.scss'
const Box = ({customCss,customCssRight}) => {
  return (
    <div className={styles.factSheetAbcFundTableRow}>
                                
                                <div className={[styles.factSheetAbcFundTableRowBox,customCss].join(" ")}>    
                                </div>
                                <div className={[styles.factSheetAbcFundTableRowBox,customCssRight].join(" ")}>    
                                </div>
                                
                            </div>
  )
}

export default Box
