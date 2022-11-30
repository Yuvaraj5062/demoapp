import { useState } from 'react';
import FilledButton from '../../filled-button/FilledButton';
import styles from './tablev5.module.scss'




const TableV5 = ({ tableHeader, tableData, handleEditPricing, handleAction }) => {

    return (
        <table className={styles.table}>
            <thead>

                <TableHeader
                    // data={pricingTabelHeader}
                    tableHeader={tableHeader}
                    customClass={styles.pricingTableHeader}
                    customClassHeader={styles.headerData}
                />
            </thead>
            <tbody>
                {tableData.map((item, index) => {
                    return (
                        <TableRow
                            key={index}
                            tableHeader={tableHeader}
                            item={item}
                            handleEdit={() => handleEditPricing()}
                            customClass={styles.pricingTableRow}
                            customClassRow={styles.rowData}
                            customEditBtn={styles.editBtn}
                            handleAction={handleAction}
                        />
                    );
                })}
            </tbody>
        </table>
    )
}
const TableHeader = ({ customClass, tableHeader, customClassHeader }) => {
    return (
        <tr className={customClass}>
            {tableHeader.map((item, index) => {
                return <td key={index} className={customClassHeader}>{item?.label}</td>;
            })}
            {/* <td className={customClassHeader}>Edit</td> */}
        </tr>
    )
}

const TableRow = ({ item, handleEdit, customClass, customClassRow, customEditBtn, tableHeader, handleAction }) => {
    const [editableValue, setEditableValue] = useState();
    const [flag, setFlag] = useState(false);


    const handleOnChange = (e, item, label) => {
        if (label === "Compliance fees") {
            setEditableValue({ ...editableValue, complianceFees: e.target.value })
        }
        else if (label === "IFA fee") {
            console.log("complianceFees", editableValue)
            setEditableValue({ ...editableValue, ifaFee: e.target.value })
        }
        else if (label === "Audit fees") {
            setEditableValue({ ...editableValue, auditFees: e.target.value })
        }
    }
    const handleEditClick = () => {
        if (!flag) {
            setFlag(true)
            setEditableValue(
                {
                    ...editableValue,
                    auditFees: item.auditFees,
                    ifaFee: item.ifaFee,
                    complianceFees: item.complianceFees
                })

        } else {
            console.log("data sunil", editableValue)
            setFlag(false)
        }

    }
    return (
        <tr className={customClass}
        //  onClick={()=>handleEdit()}
        // onClick={()=>{handleAction(item)}}
        >
            {tableHeader.map((tableheadingitem, index) => {
                return (
                    <td key={index} className={customClassRow}
                    //  onClick={()=>handleClick(tableheadingitem.label,item)}
                    // onMouseEnter={() => handleClick(true)}
                    >
                        {tableheadingitem.label === "Compliance fees" && flag ?
                            <input value={editableValue?.complianceFees}
                                type="number"
                                className={styles.inputType}
                                min={0}
                                name="complianceFees"
                                onChange={(e) => handleOnChange(e, item, tableheadingitem.label)}
                            />

                            :
                            tableheadingitem.label === "IFA fee" && flag ?
                                <input value={editableValue?.ifaFee}
                                    type="number"
                                    className={styles.inputType}
                                    min={0} name="ifaFee" onChange={(e) => handleOnChange(e, item, tableheadingitem.label)} />
                                :
                                tableheadingitem.label === "Audit fees" && flag ?
                                    <input value={editableValue?.auditFees}
                                        type="number"
                                        className={styles.inputType}
                                        min={0} name="auditFees" onChange={(e) => handleOnChange(e, item, tableheadingitem.label)} />
                                    :
                                    item[`${tableheadingitem.value}`]}</td>
                )
            })}
            {/* <td className={customClassRow} onClick={()=>handleEditClick()}>{flag?"Save":"Edit"}</td> */}
        </tr>
    )
}

export default TableV5;