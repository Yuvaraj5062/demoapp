import CryptoJS from "crypto-js";
let key = CryptoJS.enc.Utf8.parse("0823202210301035");
let iv = CryptoJS.enc.Utf8.parse("0823202210301035");

// Methods for encrypt using AES256
export function encrypt(text) {
  var encrypted = CryptoJS.AES.encrypt(JSON.stringify(text), key, {
    keySize: 128 / 8,
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  });

  return encrypted.toString();
}

// Methods for decrypt using AES256
export function decrypt(text) {
  var decrypted = CryptoJS.AES.decrypt(text, key, {
    keySize: 128 / 8,
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  });

  return decrypted.toString(CryptoJS.enc.Utf8);
}

// Currently used for encrypt password string only
export function encryptString(text) {
  var encrypted = CryptoJS.AES.encrypt(text, key, {
    keySize: 128 / 8,
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  });

  return encrypted.toString();
}