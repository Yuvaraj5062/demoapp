import React, { useState } from 'react'
import styles from "./ifaclientlist.module.scss";
import { ifaClientListHeader, ifaClientListData } from '../../../data/data'
import Pagination from '../../../component/pagination/Pagination'
import { TableHeader, TableRow } from '../../../component/table/Table';
const IfaClientList = () => {
    const [items, setItems] = useState(ifaClientListData);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8;
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = items.slice(indexOfFirstItem, indexOfLastItem)
    let varible = Math.ceil(ifaClientListData.length/itemsPerPage);
    const handlePaginate = (item) => {
        setCurrentPage(item);
    };
    const handlePrevious = () => {
        currentPage !== 1 ? setCurrentPage(currentPage - 1) : setCurrentPage(1);
    };
    const handleNext = () => {
        currentPage !== varible ? setCurrentPage(currentPage + 1) : setCurrentPage(currentPage);
 
    };
    return (
        <div className={styles.ifaMainContainer}>         
            <div className={styles.tableContainer}>
                <table className={styles.table} cellSpacing={0}>
                    <thead>
                        <TableHeader
                            data={ifaClientListHeader}
                            customClass={styles.tableHead}
                        />
                    </thead>
                    <tbody>
                        {ifaClientListData.map((item, index) => {
                            return (
                                <TableRow
                                    customClass={styles.tableBodyRow}
                                    ifaClientListData={item}
                                    key={index}
                                    id={item.id}
                                />
                            );
                        })}
                    </tbody>
                </table>
            </div>
         
            <div className={styles.paginationContainer}>
                <div className={styles.paginationText}>
                    Showing {currentItems.length} from {items.length} data
                </div>

                <Pagination
                    data={items}
                    itemsPerPage={itemsPerPage}
                    handlePaginate={(item) => handlePaginate(item)}
                    active={currentPage}
                    handlePrevious={() => handlePrevious()}
                    handleNext={() => handleNext()}
                />
            </div>
        </div>
    )
}

export default IfaClientList