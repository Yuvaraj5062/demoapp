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
  defaultValue,
  keyName,
  key2
}) => {
  return (
    <div className={[styles.dropdownContent, customClassForContent].join(" ")}>
      {dropdownItems?.map((item, index) => {
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
            {item.title ? item.title : key2 ? `${item[key2]}. ${item[keyName]}` : keyName ? item[keyName] : item}
          </p>
        );
      })}
    </div>
  );
};
export default DropDown;
