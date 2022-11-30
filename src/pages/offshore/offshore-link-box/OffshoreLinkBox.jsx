import styles from './offshorelinkbox.module.scss'
const OffshoreLinkBox = ({ customClass, title, customClassForItem , handleClick }) => {
    return (
        <div className={[styles.offshoreLinkBox, customClass].join(' ')} onClick={()=>handleClick()}>
            <span className={[styles.offshoreLinkBoxItem,customClassForItem].join(' ')}>{title}</span>
        </div>
    )
}

export default OffshoreLinkBox;