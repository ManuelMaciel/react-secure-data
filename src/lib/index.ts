import { DataItems } from "./data.d";
import EncryptionService from "./encryption";
import getAllDataItems from "./helper";

const KEY_PREFIX = "@encrypted.";

/**
 * Function to return datatype of the value we stored
 * @param value
 * @returns
 */
const getDataType = (value: string | object | number | boolean | null) => {
  return typeof value === "object" ? "j" : typeof value === "boolean" ? "b" : typeof value === "number" ? "n" : "s";
};

/**
 * Function to create local storage key
 * @param key
 * @param value
 */
const getLocalKey = (key: string, value: string | object | number | boolean | null) => {
  let keyType = getDataType(value);
  return KEY_PREFIX + `${keyType}.` + key;
};

/**
 * This version of local storage supports the following data types as it is and other data types will be treated as string
 * object, string, number and Boolean
 */
class SecureData {
  private _dataItems: DataItems = {};

  constructor() {
    this._dataItems = getAllDataItems();
  }

  /**
   * Function to set value to secure local storage
   * @param key to be added
   * @param value value to be added
   */
  setItem(key: string, value: string | object | number | boolean) {
    let parsedValue = typeof value === "object" ? JSON.stringify(value) : value + "";
    let parsedKeyLocal = getLocalKey(key, value);
    let parsedKey = KEY_PREFIX + key;
    if (key != null) this._dataItems[parsedKey] = value;
    const encrypt = new EncryptionService();
    localStorage.setItem(parsedKeyLocal, encrypt.encrypt(parsedValue));
  }

  /**
   * Function to get value from secure local storage
   * @param key to get
   * @returns
   */
  getItem(key: string): string | object | number | boolean | null {
    let parsedKey = KEY_PREFIX + key;
    return this._dataItems[parsedKey] || null;
  }

  /**
   * Function to remove item from secure local storage
   * @param key to be removed
   */
  removeItem(key: string) {
    let parsedKey = KEY_PREFIX + key;
    let value = this._dataItems[parsedKey];
    let parsedKeyLocal = getLocalKey(key, value);
    if (this._dataItems[parsedKey] !== undefined) delete this._dataItems[parsedKey];
    localStorage.removeItem(parsedKeyLocal);
  }

  /**
   * Function to clear secure local storage
   */
  clear() {
    this._dataItems = {};
    localStorage.clear();
  }
}

const secureData = new SecureData();

export default secureData;
