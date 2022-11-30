import styles from "./title.module.scss";
const Title = ({ title, customClass }) => {
  return <span className={[styles.title, customClass].join(" ")}>{title}</span>;
};
export default Title;
