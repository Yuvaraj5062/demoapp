import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import FilledButton from "../../../../component/filled-button/FilledButton";
import RadioButton from "../../../../component/radio-button/RadioButton";
import { Cross } from "../../../../component/svg-components";
import TextField2 from "../../../../component/text-field2/TextField2";
import TextArea from "../../../../component/textarea/TextArea";
import Toast from "../../../../component/toast/Toast";
import { danger, success } from "../../../../data/data";
import { manageroleFormValidators } from "../../../../formValidators/manageroleFormValidator";
import useForm from "../../../../hooks/useForm";
import {
  addRoleData,
  clearroleState,
  getAllIRole,
  updateRole,
} from "../../../../redux/features/managerole/manageroleSlice";
import styles from "./addrolepopup.module.scss";

const AddRolePopup = ({ handleClose, popupData }) => {
  const { userInfo } = useSelector((state) => state.login);
  const { error, msg } = useSelector((state) => state.managerole);
  const [isSubmit, setIsSubmit] = useState(false);
  const dispatch = useDispatch();
  const { handleChange, handleSubmit, data, errors, setData } = useForm({
    validations: manageroleFormValidators,
    onSubmit: () => handleRole(data),
    isSubmit: isSubmit,
    setIsSubmit: setIsSubmit,
    initialValues: {
      roleName: "",
      roleDescription: "",
      roleStatus: "Active",
    },
  });
  const handleRole = () => {
    setIsSubmit(true);

    if (popupData.type === "edit") {
      const payload = {
        id: popupData?.info?.id,
        roleName: data?.roleName,
        roleDescription: data?.roleDescription,
        roleStatus: data?.roleStatus === "Active" ? true : false,
        updatedBy: userInfo?.userDetail?.id,
      };
      console.log("update", payload);
      dispatch(updateRole(payload)).then(() => {
        if ("managerole/updateRole/fulfilled") {
          setData({});
          setTimeout(() => {
            handleClose();
            dispatch(clearroleState());
          }, 1000);

          dispatch(getAllIRole({ data }));
        }
      });
    } else {
      const payload = {
        roleName: data?.roleName,
        roleDescription: data?.roleDescription,
        roleStatus: data?.roleStatus === "Active" ? true : false,
        createdBy: userInfo?.userDetail?.id,
      };
      console.log("done", payload);
      dispatch(addRoleData(payload)).then(() => {
        if ("managerole/addRoleData/fulfilled") {
          setData({});
          setTimeout(() => {
            handleClose();
            dispatch(clearroleState());
          }, 1000);
          dispatch(getAllIRole({ data }));
        }
      });
    }
  };
  console.log("handleSubmit", data);
  console.log("popupdata", popupData);
  useEffect(() => {
    if (popupData?.info?.id) {
      setData(popupData?.info);
    }
  }, [popupData?.info]);

  return (
    <>
      {msg || error ? (
        <Toast item={msg ? success : danger} message={msg ? msg : error} />
      ) : null}
      <form
        className={styles.container}
        onClick={(e) => {
          e.stopPropagation();
        }}
        onSubmit={handleSubmit}
      >
        <div className={styles.addFundCross}>
          {/* Add New Role */}
          <div className={styles.text}>
            {popupData?.type === "edit" ? "Edit Role" : "Add New Role"}{" "}
          </div>
          <span className={styles.crossIcon}>
            <Cross fillColor="#FFFFFF" handleClose={() => handleClose()} />
          </span>
        </div>

        <div className={styles.textfieldData}>
          <TextField2
            type="text"
            label="Role Name"
            name="roleName"
            customclassContainer={styles.mainContainer}
            customTextfieldContainer={styles.textfieldContainer}
            inputType={styles.input}
            title={styles.title}
            maxLength={50}
            value={data.roleName ? data.roleName : ""}
            handleChange={handleChange("roleName")}
            error={errors?.roleName}
            disabled={data?.isRoleAssigned === true}
          />

          <TextArea
            label="Role Description"
            name="roleDescription"
            customTextAreaContainer={styles.textAreaContainer}
            errorContainer={styles.errorContainer}
            inputType={styles.input}
            labelTitle={styles.label}
            value={data.roleDescription ? data.roleDescription : ""}
            handleChange={handleChange("roleDescription")}
            error={errors?.roleDescription}
          />
          <div className={styles.radioContainer}>
            <span className={styles.title}> Status </span>
            <div className={styles.radioButton}>
              <RadioButton
                label="Active"
                name="roleStatus"
                id="Active"
                radioLabelClass={styles.label}
                customClass={styles.customClass}
                value={data.roleStatus === "Active" ? true : false}
                error={errors.roleStatus}
                handleChange={handleChange("roleStatus")}
                checked={data.roleStatus === "Active" ? true : false}
                disabled={data?.isRoleAssigned === true}
              />
              <RadioButton
                label="InActive"
                name="roleStatus"
                id="InActive"
                radioLabelClass={styles.label}
                customClass={styles.customClass1}
                value={data.roleStatus === "InActive" ? true : false}
                error={errors.roleStatus}
                handleChange={handleChange("roleStatus")}
                checked={data.roleStatus === "InActive" ? true : false}
                disabled={data?.isRoleAssigned === true}
              />
            </div>
          </div>
        </div>

        <div className={styles.modalFooter}>
          <div className={styles.modalFooterButton}>
            <FilledButton
              type="submit"
              title="Save"
              customClass={styles.saveButton}
              handleClick={() => {}}
            />
          </div>
        </div>
      </form>
    </>
  );
};
export default AddRolePopup;
