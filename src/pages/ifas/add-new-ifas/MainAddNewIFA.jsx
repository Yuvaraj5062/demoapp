import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Breadcrumb from "../../../component/breadcrumb/Breadcumb";
import FilledButton from "../../../component/filled-button/FilledButton";
import { Paper } from "../../../component/svg-components";
import { colors } from "../../../constants/Colors";
import {
  getAllIfaclients,
  getAllIfalists,
} from "../../../redux/features/ifa/ifaSlice";
import styles from "./mainaddnewifa.module.scss";

const MainAddNewIFA = ({ children }) => {
  const { ifaclientlist, ifalist } = useSelector((state) => state.ifa);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const id = location?.state?.id;
  const locationId = location?.state?.id ?? location?.state?.ifaId;


  useEffect(() => {
    id && dispatch(getAllIfaclients({ ifaId: id }));
  }, [id]);
  //   const handleGoTo = (data) => {
  //     console.log("data", data);
  //     data.id &&
  //       navigate(`/ifas/ifaclientlist/${data.id}`, {
  //         state: {
  //           id: data.id,
  //         },
  //       });
  //   };
  return (
    <div>
      {/* <Breadcrumb /> */}
      <div className={styles.buttonContainer}>
        <div className={styles.btns}>
          <FilledButton
            disabled={!locationId}
            customClass={styles.btnStyle}
            title="IFA AUM Report"
            handleClick={() => {
              navigate("/ifas/ifaaumreport");
            }}
          />
          <FilledButton
            customClass={styles.btnStyle}
            disabled={!locationId}
            title="IFA Client List"
            handleClick={() => {
              navigate(`/ifas/ifaclientlist`, {
                state: {
                  id: id,
                },
              });
            }}
          // handleClick={() => handleGoTo()}
          />
          <FilledButton
            customClass={styles.btnStyle}
            disabled={!locationId}
            title="IFA Generate Monthly Commission Report"
            handleClick={() => {
              navigate("/ifas/monthlyreports");
            }}
          />
        </div>
        <div className={styles.generateIfaContainer}>
          <Paper fillColor={colors.white} />
          <FilledButton
            customClass={styles.printBtn}
            title="Generate IFA Invoice"
            handleClick={() => navigate("/ifas/addnewifas/generateifainvoice")}
            type="button"
          />
        </div>
      </div>
      {children}
    </div>
  );
};

export default MainAddNewIFA;
