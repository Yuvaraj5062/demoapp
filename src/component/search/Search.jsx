import { DropdownIcon2, SearchIcon } from "../../component/svg-components";
import styles from "./search.module.scss";
const Search = ({
  dropdown,
  customClass,
  inputCustomClass,
  placeholder,
  onChange,
  value,
  setValue,
  searchString,
  setSearchString,
  setCurrentPage,
}) => {
  return (
    <div className={[styles.inputData, customClass].join(" ")}>
      {/* <span className={styles.searchButton}> */}
      <SearchIcon fillColor="#969BA0" />
      {/* </span> */}
      <input
        type="text"
        className={[styles.inputFilled, inputCustomClass].join(" ")}
        // placeholder="Search Client"
        placeholder={placeholder}
        onChange={(e) => setSearchString(e.target.value.trimLeft())}
        value={searchString}
        setValue={setValue}
      />
      <span className={styles.searchDropdownButton}>
        {dropdown ? <DropdownIcon2 fillColor="#0868AA" /> : null}
      </span>
    </div>
  );
};

export default Search;
