import styles from "./search.module.scss";
import { LocationIcon, SearchBoldIcon, SearchIcon } from "../svg-components";
import { color } from "../../constants/color";
const Search = ({ title }) => {
  return (
    <div className={styles.searchBarInputDiv}>
      <LocationIcon />
      <input type="text" placeholder={title} />
      <SearchBoldIcon fillColor={color.blue2} />
    </div>
  );
};
export default Search;
