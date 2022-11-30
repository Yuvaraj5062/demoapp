import Table from "../../../components/table/Table";
import { responsibilityBody, responsibilityHead } from "../../../data/data";
import styles from "./responsibility.module.scss";
const Responsibility = () => {
    return (
        <>
            <div className={styles.responsibilityContainer}>
                <div className={styles.factText}>
                    The facts that affect VMS ’s underlying value.
                </div>
                <p className={styles.responsibilityText}>Responsibilities</p>
                <Table tableheading={responsibilityHead} tabledata={responsibilityBody} />
            </div>
        </>
    );
};
export default Responsibility;
