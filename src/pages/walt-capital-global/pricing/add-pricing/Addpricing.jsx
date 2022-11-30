import FilledButton from "../../../../component/filled-button/FilledButton";
import { Cross } from "../../../../component/svg-components";
import styles from "./addPricing.module.scss";
import TextField from "../../../../component/text-field/TextField";
import { tableData } from "../../../../data/data";
import YearPickerV2 from "../../../../component/year-picker/yearPickerV2";
import { useState } from "react";
import useForm from "../../../../hooks/useForm";
import TextField2 from "../../../../component/text-field2/TextField2";
import { addPricingValidations } from "../../../../formValidators/addPricingValidations";
import { useDispatch, useSelector } from "react-redux";
import { addPricing } from "../../../../redux/features/pricing/pricingSlice";
import moment from "moment/moment";
import Toast from "../../../../component/toast/Toast";
import { danger, success } from "../../../../data/data";
const AddPricing = ({ handleClose }) => {
  const [transactionDate, setTransactionDate] = useState(new Date());
  const [isSubmit, setIsSubmit] = useState(false);
  const { pricingInputValidataions,pricingInputField ,status,error} = useSelector((state) => state.pricing)
  const { currSelectedFund } = useSelector(state => state.addFund)
  const dispatch = useDispatch()
  const { handleChange, handleSubmit, data, errors, setErrors, setData, change, setChange } =
  useForm({
     validations: pricingInputValidataions,
     onSubmit: () => handleSubmitPricing(),
    isSubmit: isSubmit,
    setIsSubmit: setIsSubmit,
  });
const handleSubmitPricing=()=>{
 dispatch(addPricing({
    fundId: currSelectedFund?.fundId,
    transactionDate: moment(transactionDate).format("DD/MMM/YYYY"),
    dynamicPricingInputs: [data]
  } ))
  setTimeout(()=>{
    handleClose()
  },1000)
  
}
  return (
    <>
    {status || error ? (
        <Toast item={status ? success : danger} message={error} />
      ) : null}
        <div className={styles.addPricingContainer} onClick={(e)=>{e.stopPropagation()}}>
          <div className={styles.addPricingCross}>
            Add Pricing
            <span className={styles.crossIcon}>
              <Cross fillColor="#FFFFFF" handleClose={() => handleClose()} />
            </span>
          </div>

          <form
        // className={styles.table}
        onClick={(e) => {
          e.stopPropagation();
        }}
        onSubmit={handleSubmit}
      >
        <div className={styles.table}>
      
          <div className={styles.datePickerContainerMain}>
            <label className={styles.title}> Transaction date:</label>
            <div className={styles.datePick}>
              <YearPickerV2
                customClass={
                  !transactionDate && isSubmit
                    ? styles.datePickerContainerError
                    : styles.datePickerContainer
                }
                name="transactionDate"
                startDate={transactionDate}
                 handleChange={(e) => { setTransactionDate(e.target.value) }}
              // readOnly={true}
              />

               {!transactionDate && isSubmit && (
                <span className={styles.error}>
                  Please Select Transaction Date
                </span>
              )} 
            </div>
          </div>

        {pricingInputField.map((item,index)=>{
          return(
            <TextField2
            key={index}
            type="text"
            label={`${item}  :`}
            customclassContainer={styles.mainContainer}
            customTextfieldContainer={styles.textfieldContainer}
            inputType={styles.input}
            name={item}
             handleChange={handleChange(item,true)}
            value={data?.[item]}
           error={errors?.[item]}
          />
          )

        })}




          {/* <TextField2
            type="text"
            label="Bank:"
            customclassContainer={styles.mainContainer}
            customTextfieldContainer={styles.textfieldContainer}
            inputType={styles.input}
            name="bank"
             handleChange={handleChange("bank")}
            value={data?.bank}
           error={errors?.bank}
          />
        <TextField2
            type="text"
            label="Futures:"
            customclassContainer={styles.mainContainer}
            customTextfieldContainer={styles.textfieldContainer}
            inputType={styles.input}
            name="futures"
             handleChange={handleChange("futures")}
            value={data?.futures}
           error={errors?.futures}
          />
           <TextField2
            type="text"
            label="Stock:"
            customclassContainer={styles.mainContainer}
            customTextfieldContainer={styles.textfieldContainer}
            inputType={styles.input}
            name="stock"
             handleChange={handleChange("stock")}
            value={data?.stock}
           error={errors?.stock}
          /> */}
          </div>

      

          <div className={styles.buttonContainer}>
            <div className={styles.button}>
              <FilledButton
                title="Add"
                customClass={styles.priceButton}
                type="submit"
                // handleClick={() => { }}
              />
            </div>
          </div>
          </form>
        </div>
    </>
  );
};

export default AddPricing;
