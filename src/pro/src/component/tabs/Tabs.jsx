import styles from './tabs.module.scss'
import { LeftArrow } from  '../svg-components'
import { useNavigate } from 'react-router-dom'
const Tab = ({data,value,setValue,arrow,customClass}) => {
    const navigate = useNavigate();
    const handleClick = (item, index) => {
        setValue(index);
        item && navigate(item);
    }
    
  return (
    <div className={styles.birthdayReportTable}>
                <div className={styles.birthdayType}>
               {arrow && <LeftArrow fillColor='#ffffff' />}
                    {
                        data.map((item, index) => {
                            return (
                                <span key={index} className={index === value ? styles.activeBirthdayText : [styles.birthdayText,customClass].join('')} onClick={() => handleClick(item.navigate, index)} >{item.title ? item.title : item}</span>
                            )
                        })
                    }
                    <span></span>
                </div>
                </div>
  )
}

export default Tab