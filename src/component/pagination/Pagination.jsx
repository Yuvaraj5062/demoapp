import FilledButton from "../filled-button/FilledButton";
import styles from "./pagination.module.scss";
import { Previous } from "../svg-components";
import { Next } from "../svg-components";

const Pagination = ({
  data,
  itemsPerPage,
  handlePaginate,
  active,
  handlePrevious,
  handleNext,
}) => {
  const pages = [];
  for (let i = 1; i <= Math.ceil(data && data.length / itemsPerPage); i++) {
    pages.push(i);
  }
  return (
    <div className={styles.paginationContainer}>
      <FilledButton
        icon={<Previous fillColor="#0868AA" />}
        handleClick={() => handlePrevious()}
        title="Previous"
        customClass={styles.previousBtn}
        titleCustomClass={styles.title}
        iconCustomClass={styles.icon}
      />
      {pages.map((item, index) => {
        return (
          <span
            key={index}
            className={item === active ? styles.activePage : styles.pageNumber}
            onClick={() => handlePaginate(item)}
          >
            {item}
          </span>
        );
      })}
      <FilledButton
        icon={<Next fillColor="#0868AA" />}
        handleClick={() => handleNext()}
        title="Next"
        customClass={styles.nextBtn}
        titleCustomClass={styles.title}
        iconCustomClass={styles.icon}
      />
    </div>
  );
};

export default Pagination;
