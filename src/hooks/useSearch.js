import { useState } from "react";

const useSearch = (data, searchTerm) => {
  const newData =
    data &&
    data.filter((item) => {
      if (searchTerm === "") {
        return item;
      } else if (
        item.accessCategory.toLowerCase().includes(searchTerm.toLowerCase())
      ) {
        return item;
      }
    });

  return { newData };
};

export default useSearch;
