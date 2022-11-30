import styles from "./monthlyperformancetable.module.scss";
import { monthlyPerformanceTableData } from "../../data/data";

const MonthlyPerformanceTable = () => {
  return (
    <>
      <div className={styles.tableMainContainer}>
        <span className={styles.performanceTableTitle}>
          Monthly Performance
        </span>
        {monthlyPerformanceTableData.map((year, index) => {
          return (
            <div className={styles.tableContainer}>
              <div className={styles.year}>
                {index === 0 && "YEAR"}
                <span className={styles.yearName}>
                  {Object.entries(year)[0][0]}
                </span>
              </div>

              {Object.entries(year)[0][1].map((month, innerIndex) => {
                const hadings = [];
                return (
                  <div className={styles.data}>
                    {index === 0 && <span>{Object.entries(month)[0][0]}</span>}
                    <div style={{ margin: "5px" }}>
                      {Object.entries(month)[0][1].map((value) => {
                        const negValue = Object.entries(value)[0][1] < 0;
                        const to = negValue ? { color: "red" } : {};

                        return (
                          <div
                          // style={{
                          //   display: "flex",
                          //   justifyContent: "space-between",
                          // }}
                          >
                            <div
                              style={{
                                marginRight: "10px",
                              }}
                            >
                              {innerIndex === 0 && Object.entries(value)[0][0]}
                            </div>
                            <div style={to}>{Object.entries(value)[0][1]}</div>
                          </div>
                        );
                      })}
                    </div>
                    <hr></hr>
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </>
  );
};
export default MonthlyPerformanceTable;
