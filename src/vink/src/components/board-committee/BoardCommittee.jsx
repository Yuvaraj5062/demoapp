import Title from "../title/Title";
import styles from "./boardCommittee.module.scss";
import ListPoint from "../list-point/ListPoint";
import { auditCommitteeData, innovationCommitteeData } from "../../data/data";

const BoardCommittee = () => {
  return (
    <>
      <div className={styles.boardCommitteeContainer}>
        <Title title="Board Committees" customClass={styles.titleStyle} />
        <div className={styles.boardCommitteeInfo}>
          To enable it to discharge its executive functions, the Board has
          established four principal standing committees, each governed by
          written terms of reference, defining the frequency of meetings, power
          and duties and reporting obligation. These committees continuously
          evaluate progress towards meeting the Company’s overall objectives in
          addition to ensuring e cient and e ective management of the entire
          Company’s core functions.
        </div>
        <div className={styles.infoLine}>
          A non-executive director chairs each of the committees. The said
          committees are as follows:-
        </div>
        <div className={styles.detailInfoContainer}>
          <div className={styles.containerOne}>
            <Title title="Audit Committee" customClass={styles.titleStyle} />
            <div className={styles.paragraphOne}>
              The Audit Committee is chaired by a Non-Executive Director and
              consists of three other Non-Executive Directors. The Committee
              meets at least four times per year to evaluate, among other
              things, accounting practices, the internal control systems and the
              auditing and nancial reporting. Its tasks include evaluating
              critical risk areas identi ed with the help of Management, as well
              as reporting on them to the Board.
            </div>
            <div>
              The Committee operates under a formal charter approved by the
              Board and the Committee Members have unlimited access to all
              information. Certain members of Management are invited to attend
              and give feedback at Committee meetings. The Audit Committee also
              recommends to the Board the remuneration of the external auditors.
              The Committee also holds separate meetings with the Head Internal
              Audit and the external auditors when required, in order to ensure
              that matters are considered without undue in uence.
            </div>
            <div className={styles.paragraphThree}>
              The Committee is governed by a Committee Charter, which is agreed
              by the Board and subject to annual review, and include the
              following responsibilities:
            </div>
            {auditCommitteeData.map((item, index) => {
              return (
                <ListPoint
                  title={item}
                  key={index}
                  customClassForList={styles.customClassForList}
                />
              );
            })}
            <Title
              title="Risk Management and ComplianceCommittee"
              customClass={styles.titleStyle}
            />
            <div className={styles.paragraphFour}>
              The is chaired by a Non-Executive Director and consists of three
              other Non-Executive Directors and one Executive Director, who is
              also the Chief Executive O cer of the Company. On a quarterly
              basis, the Committee reviews the collectability of the Company’s
              lending portfolio by not only ensuring adherence to statutory and
              regulatory requirements, but also ensuring that lending practices
              and procedures are in line with the credit policy of the Company,
              including on matters relating to provisions and allowances for
              impairment.
            </div>
            <div>
              Additionally, the Committee supervises the e ective implementation
              of credit and risk management policies and ensures the enhancement
              of the Company’s credit risk management systems and processes, in
              line with best practices in loan rating/credits, risk
            </div>
          </div>
          <div className={styles.containerTwo}>
            <Title
              title="Credit and Loans Review Committee"
              customClass={styles.titleStyle}
            />
            <div className={styles.paragraphTen}>
              The Credit Committee is chaired by a Non-Executive Director and
              consists of two Non-Executive Directors and one Executive Director
              who is also the Chief Executive O cer of the Company. Certain
              members of the Executive Management Committee attend by
              invitation.
            </div>
            <div className={styles.paragraphFive}>
              This Committee supervises the e ective implementation of credit
              and risk management policies and ensures enhancement of the
              Company’s credit risk management systems and processes in line
              with best practice in loan rating/credit risk modelling, loan
              pricing, and strategic loan management, including identi cation
              and control of concentration of risk. The Credit Committee also
              approves credit with values beyond the mandate of Management.
            </div>
            <Title
              title="Human Resources and Remuneration Committee"
              customClass={styles.titleStyle}
            />
            <div className={styles.paragraphSix}>
              The Committee provides oversight over the remuneration and
              compensation for Senior Management and key personnel in the
              Company, so as to retain and motivate sta to perform at the level
              of the quality required. Currently, the Company participates
              annually in local market surveys and those focusing on the rest of
              Africa in order to ensure market-related salaries are paid and
              that market related trends are also followed when changes are made
              to employee bene ts. The remuneration of all managerial sta in the
              Company is also linked to their individual performance.
            </div>
            <Title
              title="Nominations and Governance Committee"
              customClass={styles.titleStyle}
            />
            <div className={styles.paragraphSeven}>
              The Nominations Committee is chaired by the Board Chairperson and
              consists of a total of four Non-Executive Directors. The Committee
              meets at least once a year and assists the Board in identifying
              and recruiting competent and quali ed candidates for Board
              membership, chairpersons of Board, Board Committees, Committee
              members and members of Senior Management.
            </div>
            <div className={styles.paragraphEight}>
              It operates under a formal charter approved by the Board. The
              Committee assesses the e ectiveness of the Board, Board Directors’
              attendance of Board and Board Committee meetings. The Committee
              further reviews the adequacy of governance principles and
              practices of Board Directors.
            </div>
            <Title
              title="Technology, Service Delivery and Innovation Committee"
              customClass={styles.titleStyle}
            />
            <div className={styles.paragraphNine}>
              The Technology, Service Delivery and Innovations Committee is
              chaired by a Non-Executive Director and consists of four Non-
              Executive Directors.
            </div>
            <div>
              The Committee meets at least four times per year, and its overall
              purpose is:
            </div>
            {innovationCommitteeData.map((item, index) => {
              return (
                <ListPoint
                  title={item}
                  key={index}
                  customClassForList={styles.customClassForList}
                />
              );
            })}
            <div className={styles.paragraphEleven}>
              The Committee may invite certain members of the Executive
              Management to attend its meetings.
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BoardCommittee;
