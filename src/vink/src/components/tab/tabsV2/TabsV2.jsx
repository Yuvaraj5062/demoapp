import Tooltip from '../../tooltip/Tooltip'
import styles from './tabsV2.module.scss'
const TabsV2 = ({data,handleClick,value,tootipContent}) => {
    // const [value,setValue] = useState(0);
    return (
        <div className={styles.tabsContainer}>
            {
                data && data.length > 0 && data.map((item,index)=>{
                    return (
                        <div key={index} className={styles.tabItem}>
                            <span className={value === item.id ? styles.tabActive: styles.tab}  onClick={()=>{ handleClick && handleClick(item) }}>{item.name}</span>
                          {/* {  value === item.id  &&  <Tooltip content={tootipContent} />} */}
                        </div>
                    )
                }) 
            }
        </div>
    )
}
export default TabsV2;