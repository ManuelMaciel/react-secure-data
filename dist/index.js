"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _encryption = _interopRequireDefault(require("./encryption"));

var _helper = _interopRequireDefault(require("./helper"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

var KEY_PREFIX = "@encrypted.";
/**
 * Function to return datatype of the value we stored
 * @param value
 * @returns
 */

var getDataType = function getDataType(value) {
  return _typeof(value) === "object" ? "j" : typeof value === "boolean" ? "b" : typeof value === "number" ? "n" : "s";
};
/**
 * Function to create local storage key
 * @param key
 * @param value
 */


var getLocalKey = function getLocalKey(key, value) {
  var keyType = getDataType(value);
  return KEY_PREFIX + "".concat(keyType, ".") + key;
};
/**
 * This version of local storage supports the following data types as it is and other data types will be treated as string
 * object, string, number and Boolean
 */


var SecureData = /*#__PURE__*/function () {
  function SecureData() {
    _classCallCheck(this, SecureData);

    _defineProperty(this, "_dataItems", {});

    this._dataItems = (0, _helper.default)();
  }
  /**
   * Function to set value to secure local storage
   * @param key to be added
   * @param value value to be added
   */


  _createClass(SecureData, [{
    key: "setItem",
    value: function setItem(key, value) {
      var parsedValue = _typeof(value) === "object" ? JSON.stringify(value) : value + "";
      var parsedKeyLocal = getLocalKey(key, value);
      var parsedKey = KEY_PREFIX + key;
      if (key != null) this._dataItems[parsedKey] = value;
      var encrypt = new _encryption.default();
      localStorage.setItem(parsedKeyLocal, encrypt.encrypt(parsedValue));
    }
    /**
     * Function to get value from secure local storage
     * @param key to get
     * @returns
     */

  }, {
    key: "getItem",
    value: function getItem(key) {
      var parsedKey = KEY_PREFIX + key;
      return this._dataItems[parsedKey] || null;
    }
    /**
     * Function to remove item from secure local storage
     * @param key to be removed
     */

  }, {
    key: "removeItem",
    value: function removeItem(key) {
      var parsedKey = KEY_PREFIX + key;
      var value = this._dataItems[parsedKey];
      var parsedKeyLocal = getLocalKey(key, value);
      if (this._dataItems[parsedKey] !== undefined) delete this._dataItems[parsedKey];
      localStorage.removeItem(parsedKeyLocal);
    }
    /**
     * Function to clear secure local storage
     */

  }, {
    key: "clear",
    value: function clear() {
      this._dataItems = {};
      localStorage.clear();
    }
  }]);

  return SecureData;
}();

var secureData = new SecureData();
var _default = secureData;
exports.default = _default;