import React from "react";
import FilledButton from "../filled-button/FilledButton";
import { Next, Previous } from "../svg-components";
import styles from "./pagination.module.scss";

const Pagination = ({
  handlePaginate,
  totalPages,
  currentPage,
  handlePrevious,
  handleNext,
}) => {
  const lastPage = currentPage !== totalPages ? currentPage + 1 : null;

  const dArray = [currentPage - 1, currentPage, currentPage && lastPage].filter(
    (e) => e > 0
  );

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
      {dArray.map((item, index) => {
        return (
          <span
            key={index}
            className={
              item === currentPage ? styles.activePage : styles.pageNumber
            }
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

export default React.memo(Pagination);
