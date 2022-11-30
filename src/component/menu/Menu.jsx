import styles from './menu.module.scss';
const Menu = ({menuItems,customClass,customClassItems}) => {
    return (
        <div className={[styles.menuContainer,customClass].join(' ')}  onClick={(e)=>e.stopPropagation()}>
            {
                menuItems.map((item,index)=>{
                    return(
                        <p className={[styles.menuItems,customClassItems].join(' ')} key={index}>
                            <span className={styles.menuItem}>
                                {item.icon}{item.title}
                            </span>
                        </p>
                    )
                })
            }
        </div>
    )
}
export default Menu;