import html2canvas from "html2canvas";
import jsPdf from "jspdf";
export const executeScroll = (ref) => {
  ref.current.scrollIntoView();
};

// function for single page pdf

export const savePDF = (invoiceElement, setLoading) => {
  setLoading(true);
  html2canvas(invoiceElement?.current, { scale: 3 }).then((canvas) => {
    setLoading(false);
    const imageGeneratedFromTemplate = canvas.toDataURL("image/png");
    const fileWidth = 297;
    const generatedImageHeight = (canvas.height * fileWidth) / canvas.width;

    let page = [fileWidth + 20, generatedImageHeight + 20];
    var PDF = new jsPdf({
      orientation: "p",
      unit: "mm",
      format: page,
      compress: true,
    });

    PDF.addImage(
      imageGeneratedFromTemplate,
      "PNG",
      8,
      5,
      fileWidth,
      generatedImageHeight,
      undefined,
      "FAST"
    );
    // PDF.save('factsheet.pdf');  // code for download
    //PDF.autoPrint();             // code for print
    window.open(PDF.output("bloburl"), "_blank"); // code for preview
    PDF.rect(
      5,
      5,
      PDF.internal.pageSize.width - 10,
      PDF.internal.pageSize.height - 10,
      "S"
    );
  });
};

// function for multipage pdf
export const multipagePDF = (invoiceElement, setLoading) => {
  setLoading(true);
  html2canvas(invoiceElement?.current, { scale: 3 }).then((canvas) => {
    setLoading(false);
    var imgData = canvas.toDataURL("image/png");
    var imgWidth = 200;
    var pageHeight = 295;
    var imgHeight = (canvas.height * imgWidth) / canvas.width;
    var heightLeft = imgHeight;
    var PDF = new jsPdf({
      orientation: "p",
      unit: "mm",
      format: "a4",
      compress: true,
    });
    var position = 0;

    PDF.addImage(imgData, "PNG", 5, 5, imgWidth, imgHeight, undefined, "FAST");
    heightLeft -= pageHeight;

    while (heightLeft >= 0) {
      position = heightLeft - imgHeight;
      PDF.addPage();
      PDF.addImage(
        imgData,
        "PNG",
        0,
        position,
        imgWidth,
        imgHeight,
        undefined,
        "FAST"
      );
      heightLeft -= pageHeight;
    }
    // PDF.save('factsheet.pdf'); // code for download pdf
    // PDF.autoPrint();             // code for print
    window.open(PDF.output("bloburl"), "_blank"); // code for preview
    PDF.rect(
      5,
      5,
      PDF.internal.pageSize.width - 10,
      PDF.internal.pageSize.height - 10,
      "S"
    );
  });
};

export const postiveNumber = (num) => {
  if (num < 0) {
    return Math.abs(num * -1);
  }

  if (
    (String(num)[0] == "0" || String(num)[0] == "-") &&
    String(num)[1] != "." &&
    String(num).length !== 1
  ) {
    const nw = String(num).slice(1, String(num).length);
    return nw;
  }

  return num;

  // return parseFloat(num);

  // if (parseFloat(num)) {
  //   return parseFloat(num);
  // } else {
  //   // return parseFloat(num) === 'NaN' ? null : parseFloat(num);
  //   return num;
  // }
};

export const changeToNum = (obj) => {
  const newObj = {};

  Object.entries(obj).map((item) => {
    if (Number(item[1]) && item[0] !== "inceptionDate") {
      newObj[item[0]] = Number(item[1]);
    } else {
      newObj[item[0]] = item[1];
    }
  });
  return newObj;
};

export const getBase64 = (file) => {
  return new Promise((resolve) => {
    let baseURL = "";
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      baseURL = reader.result;
      resolve(baseURL);
    };
  });
};
// add comma seprator

export const format = (num) => {
  if (num) {
    const numArray = num.split("").reverse();
    for (let i = 3; i < numArray.length; i += 4) {
      numArray.splice(i, 0, ",");
    }
    return numArray.reverse().join("");
  } else {
    return;
  }
};

export const numberWithCommas = (x) => {
  if (x) {
    return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
  } else {
    return;
  }
};

export const isWordInArray = ({
  words = ["performancefee", "managementfee", "fee"],
  label,
}) => {
  return new RegExp(words.join("|")).test(label.toLowerCase());
};

export const isDuplicateKeyExists = (fields, key) => {
  let duplicateKey = "";

  const t = fields.filter(
    (item) => item.label.toLowerCase() === key.toLowerCase()
  );

  return t[1] ? t[1].rowId : "";
};

/* pricingInputs fundName fundPhilosophy */
