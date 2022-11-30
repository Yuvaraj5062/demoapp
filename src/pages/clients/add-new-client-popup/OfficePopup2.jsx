import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DeletePopup from "../../../component/delete-popup/DeletePopup";
import Divider from "../../../component/divider/Divider";
import FilledButton from "../../../component/filled-button/FilledButton";
import Popup from "../../../component/popup/Popup";
import RadioButton from "../../../component/radio-button/RadioButton";
import {
    AddGroupIcon,
    Cross,
    DeleteIcon,
    EditIcon,
} from "../../../component/svg-components";
import TextField from "../../../component/text-field/TextField";
import useForm from "../../../hooks/useForm";
import { addNewOffice, deleteOffice, officeById, officeDropdown, updateOffice } from "../../../redux/features/crm/crmSlice";
import styles from "./officepopup2.module.scss";
const OfficePopup2 = ({ handleClose, popupData, setPopupData }) => {
    const dispatch = useDispatch();
    const { userInfo } = useSelector((state) => state.login);
    const [officeId, setOfficeId] = useState(popupData)
    const [editId, setEditId] = useState()
    const [deletepopup, setDeletePopup] = useState(false);
     const {
        officeDropdownData,
        cityDetail,
        status,
        error,
        loading,
    } = useSelector((state) => state.crm);
    const { handleChange, handleSubmit, data, errors, setData } = useForm({
        // validations: {
        //     office: {
        //         required: {
        //             value: true,
        //             message: "Please Enter Office",
        //         }
        //     }
        // },
        // isSubmit: isSubmit,
        // setIsSubmit: setIsSubmit,
        onSubmit: () => handleSubmitForm(data),
    });


    const handleClosePopup = () => {
        setDeletePopup(false);
      };
    
      const handleOpen = (item) => {
        setEditId(item.officeId)
        setDeletePopup(true);
        
      };


    const handleSubmitForm = (data) => {
        const payload = {
            id: editId ? Number(editId) : 0,
            office: data.officeName,
            cityId:cityDetail?.cityId,
            userId: userInfo.userDetail.id
        }
        handleClose()
        if (data.officeName !== undefined) {
            if (editId) {
                dispatch(updateOffice(payload))
                setEditId('')
            }
            else {
                dispatch(addNewOffice(payload))
                setPopupData((Number(officeDropdownData[officeDropdownData.length - 1].officeId) + 1))
            }
        }
        
    }
    useEffect(() => {
        dispatch(officeById({ id: Number(popupData) })).then((res) => {
            if (res.payload?.id) {
                setData({
                    officeName: res.payload?.officeName
                })
                setOfficeId(popupData)
            }
        })
    }, [])

    const handleDelete = () => {
        const payload = {
            id: Number(editId),
            userId: userInfo.userDetail.id
        }
            dispatch(deleteOffice(payload)).then((res)=>{
                dispatch(officeDropdown({cityId:cityDetail.cityId}));
            })
            handleClosePopup()
            handleClose()    
    }
    const handleAction = (item) => {
        data.officeName = item.officeName
        data.selectedOffice = item.officeId
        setEditId(item.officeId)
    }
    useEffect(() => {
        if (data.selectedOffice !== undefined) {
            setOfficeId(null)
            setPopupData(data.selectedOffice)
        }

    }, [data.selectedOffice])

    return (
        <>
            <div
                className={styles.mainContainer}
                onClick={(e) => {
                    e.stopPropagation();
                }}>

            {deletepopup && (
                    <Popup
                        Children={DeletePopup}
                        handleClose={() => handleClosePopup()}
                        handleDelete={handleDelete}
                        msg="Are you sure you want to delete office?"
                    />
                    )}

                <div className={styles.modalTitle}>
                    Manage Offices
                    <span className={styles.crossIcon}>
                        <Cross fillColor="#FFFFFF" handleClose={() => handleClose()} />
                    </span>
                </div>
                <div className={styles.tableContent}>
                    <span className={styles.cityName}>{cityDetail?.cityName}</span>
                    <TextField
                        customClassContainer={styles.textfieldContainer}
                        label="Add New Office"
                        customClass={styles.labelName}
                        customClassInput={styles.datainputfield}
                        value={data.officeName ? data.officeName : ''}
                        handleChange={handleChange("officeName")}
                        error={errors.officeName}
                    />
                    <Divider customClass={styles.divider} />
                    {officeDropdownData.length > 0 && officeDropdownData.map((item, index) => {
                        return (<>
                            <div className={styles.tabelRow}>
                                <RadioButton
                                    name="selectedOffice"
                                    value={data.selectedOffice ? data.selectedOffice : ''}
                                    id={item.officeId}
                                    checked={Number(data.selectedOffice) === item.officeId ? true : item.officeId === Number(officeId) ? true : false}
                                    label={item.officeName}
                                    radioLabelClass={styles.radioButtonText}
                                    handleChange={handleChange("selectedOffice")}
                                    customClassError={styles.errorText}
                                />
                                <div className={styles.iconContainer}>
                                    <EditIcon
                                        fillColor="#0B6AAB"
                                        width="18"
                                        height="18"
                                        handleClick={() => handleAction(item)}
                                    />
                                    <DeleteIcon customClass={styles.deleteIcon}
                                     handleClick={() => 
                                    //  handleDelete(item.officeId)
                                     handleOpen(item)
                                     } />
                                </div>
                            </div>
                            <Divider customClass={styles.divider2} />
                        </>
                        )
                    })}
                </div>
                <div className={styles.modalFooter}>
                    <FilledButton
                        title="Save & Update"
                        customClass={styles.saveButton}
                        handleClick={() => {
                            handleSubmit();
                        }}
                    />
                </div>
            </div>
        </>
    );
};
export default OfficePopup2;
