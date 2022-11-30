const getDateYYYYMMDD = (date) => {
  let day = date.getDate();
  let monthIndex = date.getMonth() + 1;
  let year = date.getFullYear();
  return `${year}-${
    (monthIndex + "").length == 1 ? "0" + monthIndex : monthIndex
  }-${(day + "").length == 1 ? "0" + day : day}`;
};

const evaluateDate = (e) => {
  let options = { year: "numeric", month: "short", day: "numeric" };
  return new Date(e).toLocaleDateString("en-us", options);
};

export { getDateYYYYMMDD, evaluateDate };
