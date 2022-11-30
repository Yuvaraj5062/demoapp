import FilledButton from '../../filled-button/FilledButton';
import styles from './tablev4.module.scss'

export const TableV4Header = ({ customClass, data, customClassHeader }) => {
    return (
        <tr className={customClass}>
            {data.map((item, index) => {
                return <td key={index} className={customClassHeader}>{item}</td>;
            })}
        </tr>
    )
}

export const TableV4Row = ({ data, handleEdit, customClass, customClassRow, customEditBtn }) => {
    return (
        <tr className={[styles.divider, customClass].join(" ")}
        onClick={()=>{handleEdit()}}>

            <td className={customClassRow}>
                <span className={styles.inputDate}>{data.date}</span>
            </td>
            <td className={customClassRow}>
            <span className={styles.inputLabel}>
                R{' '}<span className={styles.inputBorder1}>{data.bank}</span>
                </span>
            </td>
            <td className={customClassRow}>
                <span className={styles.inputLabel}>
                    R{' '}
                    <span className={styles.inputBorder1}> {data.futures}</span>
                </span>
            </td>
            <td className={customClassRow}>
            <span className={styles.inputLabel}>
                R{' '}
                <span className={styles.inputBorder}>{data.stock}</span>
                </span>

            </td>
            <td className={customClassRow}>{data.total}</td>
            <td className={customClassRow}>{data.units}</td>
            <td className={customClassRow}>{data.hwm}</td>
            <td className={customClassRow}>{data.gav}</td>
            <td className={customClassRow}>{data.audit}</td>
            <td className={customClassRow}>{data.management}</td>
            <td className={customClassRow}>{data.performance}</td>
            <td className={customClassRow}>{data.feeRun}</td>
            <td className={customClassRow}>{data.ifaRun}</td>
            <td className={customClassRow}>{data.nav}</td>
            {/* <td className={[customClassRow, customEditBtn].join(" ")}>
                <FilledButton title="Edit" customClass={styles.editBtn} 
                handleClick={() => handleEdit()} /></td> */}
        </tr>


    )
}