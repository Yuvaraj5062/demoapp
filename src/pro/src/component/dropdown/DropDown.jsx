import styles from "./dropdown.module.scss";

const DropDown = ({
  dropdownItems,
  handleClick,
  customClassForContent,
  customClassForItems,
  customClassForActiveItems,
  value,
  Index,
  setSelected,
}) => {
  return (
    <div className={[styles.dropdownContent, customClassForContent].join(" ")}>
      {dropdownItems.map((item, index) => {
        return (
          <p
            key={index}
            className={[
              styles.dropdownItem,
              index === value ? customClassForActiveItems : customClassForItems,
            ].join(" ")}
            onClick={() =>
              handleClick
                ? handleClick(item.navigate, Index, index, index)
                : setSelected(item)
            }
          >
            {item.title ? item.title : item}
          </p>
        );
      })}
    </div>
  );
};
export default DropDown;
