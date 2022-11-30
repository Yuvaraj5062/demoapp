import styles from './popup.module.scss'

const Popup = ({Children,handleClose,handleToast,setModal}) => {
    return (
        <div className={styles.popup} onClick={()=>handleClose()}>
            <Children handleClose={()=>handleClose()} handleToast = {()=> handleToast()} setModal={setModal}/>
        </div>
    )
}

export default Popup