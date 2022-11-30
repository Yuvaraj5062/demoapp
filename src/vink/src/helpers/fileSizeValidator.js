export const fileSizeValidator = (size, extname) => {
  const validFormate = ["JPG", "JPEG", "PDF", "PNG"];

  if (size / 1024 ** 2 > 2) {
    return { status: false, msg: "Please provide file with valid size" };
  }

  if (!validFormate.includes(extname)) {
    return { status: false, msg: "Please provide file with valid formate " };
  }

  return { status: true, msg: "" };
};
