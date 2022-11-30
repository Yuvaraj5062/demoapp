import React from 'react'
import styles from "./inputboxfield.module.scss";

const InputBoxField = ({ icon, customClassInputIcon, value,
    type, setIncrease, setDecrease, setMain, mainValue }) => {
    const handleChange = (e) => {
        if (type === 'increase') {
            setIncrease(e.target.value)
        } else if (type === 'decrease') {
            setDecrease(e.target.value)
        } else {
            setMain(e.target.value)
        }
    }
    const handleClick = () => {
        if (type === 'increase') {
            setMain(parseInt(mainValue) + parseInt(value))
        } else if (type === 'decrease') {
            setMain(parseInt(mainValue) - parseInt(value))
        }
    }
    return (
        
            <div className={styles.textFieldWithIcon}>
                <input
                    type="text"
                    className={[styles.inputType, customClassInputIcon].join(" ")}
                    value={value}
                    onChange={(e) => handleChange(e)}
                />
                <div className={styles.iconContainer}>
                    <div className={styles.icon}
                        onClick={() => { handleClick() }}
                    >
                        {icon}</div>
                </div>
            </div>
    
    )
}

export default InputBoxField