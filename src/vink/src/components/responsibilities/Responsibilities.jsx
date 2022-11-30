import Title from "../title/Title";
import styles from "./responsibilities.module.scss";

const Responsibilities = () => {
  return (
    <>
      <div className={styles.responsibilitiesContainer}>
        <Title title="Responsibilities" customClass={styles.titleStyle} />
        <div className={styles.detailInfoContainer}>
          <div className={styles.containerOne}>
            <div className={styles.paragraphOne}>
              The Board performs its oversight role, while also providing
              strategic direction to Executive Management. All Board
              appointments are subject to a fit-and-proper test by the Central
              Bank, while Shareholder approval is sought for the nomination of
              new Directors at Annual General Meetings.
            </div>
            <div className={styles.paragraphTwo}>
              The role of the Chairperson is to ensure that there is the right
              balance on the Board, with the requisite industry knowledge and to
              lead and manage the work of the Board to ensure the Board’s
              efficient and effective discharge of its legal and regulatory
              responsibilities.
            </div>
            <div className={styles.paragraphThree}>
              In keeping with best practice, the activities of the Board are
              planned and documented. These may include engagement with third
              parties, such as Pension Fund Managers and Organisational
              Development Consultants to get deeper insights into the relevant
              changes to legislation and market trends.
            </div>
            <div className={styles.paragraphFour}>
              The Board agrees on its Annual Plan which includes a Strategy
              Session, review of the Succession Planning, Budgeting and
              Performance Review for Senior Executives. The Chairperson, with
              assistance of the Chief Executive Officer and Company Secretary,
              ensures that the Directors are provided with timely information to
              facilitate an interactive dialogue during Board sessions.
            </div>
            <div>
              To ensure transparency, the activities of the Board are documented
              and planned. Although the Board has the ultimate responsibility
              for the success of the company, this is managed on a delegated
              basis.
            </div>
          </div>
          <div className={styles.containerTwo}>
            <div>
              The Board ratfies the appointment of the Chief Executive Officer
              and monitors his or her performance in leading the Company and
              providing operational and performance management in delivering the
              Strategy. The Chief Executive Officer provides a regular report to
              the Board that includes information on financial performance of
              the company and the achievement of financial objectives,
              operational matters, the operating environment, strategic
              development, corporate social responsibility, human resource and
              stakeholder relations.
            </div>
            <div className={styles.paragraphFive}>
              The Board promotes good behavior and demonstrates clear values and
              high ethical standards, being mindful of the overriding duty of
              each Director to act in good faith and promote the success of the
              company. The Board has a planned programme for each financial year
              to ensure that all necessary matters are covered and to also allow
              for sufficient debate and challenge.
            </div>
            <div>
              The Board continues to guard against the risk of complacency by
              encouraging openness and appropriate levels of challenge. While
              engaging with Management both formally and informally, the Board
              strives to ensure that it remains sufficiently detached to
              maintain its independence. The company has put in place a formal
              induction process for new Board members that takes into account
              the different backgrounds and experience of each Director. New
              Board members are properly inducted into the company’s policies
              and procedures to ensure that they are well versed with the
              governance structures which have been developed over the years.
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Responsibilities;
