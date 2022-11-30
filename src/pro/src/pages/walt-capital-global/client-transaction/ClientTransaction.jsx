import React from 'react'
import styles from './clienttransaction.module.scss'
import { TableV4Header, TableV4Row } from '../../../component/table/tableV4/TableV4';
import { useState } from 'react';
import {  clientTransactionTabelHeader, clientTransactionTableData } from '../../../data/data';
import Popup from '../../../component/popup/Popup';
import EditClientTransaction from './edit-client-transaction/EditClientTransaction';
const ClientTransaction = () => {
  const [editModal, setEditModal] = useState(true);
  const handleEditClose = () => {
    setEditModal(!editModal);
}
  const handleEditClient = () => {
    setEditModal(!editModal);
}
  return (
    <div className={styles.clientTransactionContainer}>
      
  {editModal ? <Popup Children={EditClientTransaction} handleClose={() => handleEditClose()} />:
      <table className={styles.table} cellSpacing={0} >
        <thead>
          <TableV4Header data={clientTransactionTabelHeader} customClass={styles.clientTableHeader} customClassHeader={styles.headerData} />
        </thead>
        <tbody>
          {
            clientTransactionTableData.map((item, index) => {
              return (

                <TableV4Row 
                 key={index} 
                 data={item} handleEdit={()=>handleEditClient()} 
                customClass={styles.clientTableRow} 
                customClassRow={styles.rowData} 
                customEditBtn={styles.editBtn} />

              )

            })
          }
        </tbody>
      </table>
}
    </div>
  )
}

export default ClientTransaction