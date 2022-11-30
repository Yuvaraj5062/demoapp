import styles from "./modal.module.scss";
import FilledButton from "../../component/filled-button/FilledButton";
import { Cross } from "../svg-components";
import Divider from "../divider/Divider";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchAllReports } from "../../redux/features/common/commonSlice";
import moment from "moment";
import Loader from "../loader/Loader";
import NoRecordFound from "../notfound/NotFound";
const Modal = ({ handleClose }) => {
  const { loading, reports } = useSelector((state) => state.common);

  console.log("reports", reports);
  const dispatch = useDispatch();
  useEffect(() => dispatch(fetchAllReports()), []);
  // const userBirthdayName = [
  //   "John Snow Turns 45 Today",
  //   "John Snow Turns 45 Today",
  //   "John Snow Turns 45 Today",
  // ];
  // const zoomMeetingName = [
  //   "Zoom Meeting - with Trade Station",
  //   "Zoom Meeting - with Trade Station",
  //   "Zoom Meeting - with Trade Station",
  //   "Zoom Meeting - with Trade Station",
  // ];
  // const birthDataData = [
  //   {
  //     born: "Born",
  //     date: "21 September 1971",
  //   },
  //   {
  //     born: "Born",
  //     date: "21 September 1971",
  //   },
  //   {
  //     born: "Born",
  //     date: "21 September 1971",
  //   },
  // ];
  // const meetingData = [
  //   "14h00 - 24 September 2022",
  //   "14h00 - 24 September 2022",
  //   "14h00 - 24 September 2022",
  //   "14h00 - 24 September 2022",
  // ];
  // const dueData = [
  //   "Siphokazi Stewart",
  //   "Gary Ismail",
  //   "Nozipho Murray",
  //   "Nozipho Murray",
  //   "Nozipho Murray",
  //   "Nozipho Murray",
  //   "Nozipho Murray",
  //   "Nozipho Murray",
  // ];
  // const OverDueData = [
  //   "Nozipho Murray",
  //   "Thandi Peters",
  //   "Nozipho Murray",
  //   "Nozipho Murray",
  //   "Nozipho Murray",
  //   "Nozipho Murray",
  //   "Nozipho",
  //   "Nozipho",
  // ];
  // const amlCheckAlertData = [
  //   "Siphokazi Stewart",
  //   "Gary Ismail",
  //   "Nozipho Murray",
  // ];
  let navigate = useNavigate();
  const navigateToReports = () => {
    handleClose();
    navigate("/reports");
    // navigate("/dashboard");
  };
  const handleClose1 = () => {
    navigate("/dashboard");
  };

  return (
    <div
      className={styles.landingPage}
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      <div className={styles.modalContainer}>
        <div className={styles.modalTitle}>
          Birthday Report and daily events / Task
          <span className={styles.crossIcon}>
            <Cross fillColor="#FFFFFF" handleClose={() => handleClose1()} />
          </span>
        </div>
        {loading ? (
          <>
            <div className={styles.loaderContainer}>
              <Loader customClass={styles.loader} />
            </div>
          </>
        ) : reports && reports ? (
          <>
            <div className={styles.birthdayReport}>
              <div className={styles.birthdayToday}>
                <div className={styles.birthdayTodayTitle}>
                  Birthdays Today :
                </div>
                <div className={styles.userBirthdayToday}>
                  {reports && reports?.todaysBirthdayList?.length === 0 ? (
                    <NoRecordFound customContainer={styles.text} />
                  ) : (
                    reports?.todaysBirthdayList?.map((item, index) => {
                      return (
                        <p key={index} className={styles.userBirthdayTodayText}>
                          {item.name}
                        </p>
                      );
                    })
                  )}
                </div>
                <div className={styles.userBirthDate}>
                  {reports?.todaysBirthdayList?.map((item, index) => {
                    return (
                      <p className={styles.birthDate} key={index}>
                        <span className={styles.userBornText}>Born : </span>
                        <span className={styles.userBirthDateText}>
                          {moment(item.birthday).format("DD MMMM YYYY")}
                        </span>
                      </p>
                    );
                  })}
                </div>
              </div>
              <Divider customClass={styles.divider} />
              <div className={styles.birthdayToday}>
                <div className={styles.birthdayTodayTitle}>
                  Upcoming Birthdays This week :
                </div>

                <>
                  <div className={styles.userBirthdayToday}>
                    {reports && reports?.upcommingBirthdayList?.length === 0 ? (
                      <NoRecordFound customContainer={styles.text} />
                    ) : (
                      reports?.upcommingBirthdayList?.map((item, index) => {
                        return (
                          <p
                            key={index}
                            className={styles.userBirthdayTodayText}
                          >
                            {item.name}
                          </p>
                        );
                      })
                    )}
                  </div>
                  <div className={styles.userBirthDate}>
                    {reports?.upcommingBirthdayList?.map((item, index) => {
                      return (
                        <p className={styles.birthDate} key={index}>
                          <span className={styles.userBornText}> Born : </span>
                          <span className={styles.userBirthDateText}>
                            {moment(item.birthday).format("DD MMMM YYYY")}
                          </span>
                        </p>
                      );
                    })}
                  </div>
                </>
              </div>
              <Divider customClass={styles.divider} />
              <div className={styles.taskMeeting}>
                <div className={styles.birthdayTodayTitle}>Task/Meetings :</div>
                <div className={styles.userBirthdayToday}>
                  {reports && reports?.taskMeetingList?.length === 0 ? (
                    <NoRecordFound customContainer={styles.text} />
                  ) : (
                    reports?.taskMeetingList?.map((item, index) => {
                      return (
                        <p
                          key={index}
                          className={styles.userBirthdayTodayText1}
                        >
                          {item.meetingType} - with {item.meetingWith}
                        </p>
                      );
                    })
                  )}
                </div>
                <div className={styles.userBirthDate}>
                  {reports?.taskMeetingList?.map((item, index) => {
                    return (
                      <p className={styles.birthDate} key={index}>
                        <span className={styles.userBirthDateText}>
                          {item.meetingTime} -
                          {moment(item.meetingDate).format("DD MMMM YYYY")}
                        </span>
                      </p>
                    );
                  })}
                </div>
              </div>
              <Divider customClass={styles.divider} />
              <div className={styles.dueMeeting}>
                <div className={styles.birthdayTodayTitle}>
                  Due Diligence Alert :
                </div>
                {/* <div className={styles.dueContainer}> */}
                <div className={styles.userBirthdayToday}>
                  <p className={styles.user}>Due</p>
                  <div className={styles.dueContainer}>
                    {reports && reports?.dueDiligencesLists?.length === 0 ? (
                      <NoRecordFound customContainer={styles.text} />
                    ) : (
                      reports?.dueDiligencesLists?.map((item, index) => {
                        return (
                          <p
                            key={index}
                            className={styles.userBirthdayTodayText1}
                          >
                            {item.name}
                          </p>
                        );
                      })
                    )}
                  </div>
                </div>
                <div className={styles.userBirthDate}>
                  <span className={styles.user}> Overdue </span>
                  <div className={styles.dueContainer}>
                    {reports &&
                    reports?.overDueDiligencesLists?.length === 0 ? (
                      <NoRecordFound customContainer={styles.text} />
                    ) : (
                      reports?.overDueDiligencesLists?.map((item, index) => {
                        return (
                          <p className={styles.birthDate} key={index}>
                            <span className={styles.userBirthdayTodayText1}>
                              {item.name}
                            </span>
                          </p>
                        );
                      })
                    )}
                  </div>
                </div>
                {/* </div> */}
              </div>
              <Divider customClass={styles.divider} />
              <div className={styles.taskMeeting}>
                <div className={styles.birthdayTodayTitle}>
                  AML Check Alert :
                </div>

                <div className={styles.userBirthdayToday}>
                  {reports && reports?.aMLLists?.length === 0 ? (
                    <NoRecordFound customContainer={styles.text} />
                  ) : (
                    reports?.aMLLists?.map((item, index) => {
                      return (
                        <p
                          key={index}
                          className={styles.userBirthdayTodayText1}
                        >
                          {item.name}
                        </p>
                      );
                    })
                  )}
                </div>
              </div>
            </div>
          </>
        ) : (
          <NoRecordFound customContainer={styles.text} />
        )}

        <div className={styles.modalFooter}>
          <FilledButton
            title="Go to this Report"
            handleClick={navigateToReports}
            customClass={styles.goToReportButton}
          />
        </div>
      </div>
    </div>
  );
};

export default Modal;
