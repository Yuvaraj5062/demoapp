import { useState } from 'react'
import styles from './range.module.scss'
const Range = () => {
    const [value,setValue] = useState(80)
    const handleChage = (e)=> {
        setValue(e.target.value)
    }
    return (
        <div className={styles.slidecontainer}>
            <input type="range" min="1" max="100" value={value} className={styles.slider} onChange={(e)=>handleChage(e)}/>
        </div>
    )   
}

export default Range