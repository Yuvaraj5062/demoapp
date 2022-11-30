import FilledButton from '../../filled-button/FilledButton';
import styles from './tablev3.module.scss'
export const TableV3Header = ({ customClass, data, customClassHeader }) => {
    return (
        <tr className={customClass}>
            {data.map((item, index) => {
                return <td key={index} className={customClassHeader}>{item}</td>;
            })}
        </tr>
    )
}

export const TableV3Row = ({ data, handleEdit, customClass, customClassRow, customEditBtn }) => {
    return (
        <tr className={customClass}
        onClick={()=>handleEdit()}>
            <td className={customClassRow}>{data.date}</td>
            <td className={customClassRow}>{data.StockAcc}</td>
            <td className={customClassRow}>{data.BankAcc}</td>
            <td className={customClassRow}>{data.FeeAcc}</td>
            <td className={customClassRow}>{data.Total}</td>
            <td className={customClassRow}>{data.Units}</td>
            <td className={customClassRow}>{data.HWM}</td>
            <td className={customClassRow}>{data.Manfees}</td>
            <td className={customClassRow}>{data.Perffees}</td>
            <td className={customClassRow}>{data.Compliancefees}</td>
            <td className={customClassRow}>{data.Auditfees}</td>
            <td className={customClassRow}>{data.IFAfee}</td>
            <td className={customClassRow}>{data.Nav}</td>
            {/* <td className={[customClassRow,customEditBtn].join(" ")}>
                <FilledButton title="Edit" customClass={styles.editBtn} handleClick={()=>handleEdit()}/>
                </td> */}
        </tr>
    )
}