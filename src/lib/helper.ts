import { DataItems } from "./data";
import EncryptionService from "./encryption";

/**
 * Function to preload all the local storage data
 * @returns
 */
const getAllDataItems = () => {
  const dataItems: DataItems = {};
  if (typeof window !== "undefined") {
    const encrypt = new EncryptionService();
    for (const [key, value] of Object.entries(localStorage)) {
      if (key.startsWith("@encrypted.")) {
        let keyType = key.replace("@encrypted.", "")[0];
        let parsedKey = key.replace(/[.][bjns][.]/, ".");
        let decryptedValue = encrypt.decrypt(value);
        let parsedValue = null;
        if (decryptedValue != null)
          switch (keyType) {
            case "b":
              parsedValue = decryptedValue === "true";
              break;
            case "j":
              parsedValue = JSON.parse(decryptedValue);
              break;
            case "n":
              parsedValue = Number(decryptedValue);
              break;
            default:
              parsedValue = decryptedValue;
          }
          dataItems[parsedKey] = parsedValue;
      }
    }
  }
  return dataItems;
};

export default getAllDataItems;
