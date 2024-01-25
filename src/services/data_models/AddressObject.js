import Utils from "@common/Utils";
import $ from "../global/util";

const AddressObject = function (Utils) {
  function AddressObject() {
    this.id = "";
    this.type = "";
    this.location = [];
    this.line1 = "";
    this.line2 = "";
    this.area = "";
    this.landmark = "";
    this.city = "";
    this.state = "";
    this.country = "";
    this.pincode = "";
    this.reference_id = "";
    this.other_data = "";
  }
  AddressObject.prototype = {
    validateObject: function () {},
    buildObject: function (rawObject) {
      this.id = rawObject.id;
      this.type = rawObject.type;
      this.location = rawObject.location;
      this.line1 = rawObject.line1;
      this.line2 = rawObject.line2;
      this.area = rawObject.area;
      this.landmark = rawObject.landmark;
      this.city = rawObject.city;
      this.state = rawObject.state;
      this.country = rawObject.country;
      this.pincode = rawObject.pincode;
      this.reference_id = rawObject.reference_id;
      if (!rawObject.id && rawObject._id) {
        this.id = rawObject._id.$oid;
      }
      this.other_data = rawObject.other_data;
    },
    toString: function () {
      var strAddress = "";
      if (!Utils.isEmpty(this.line1)) {
        strAddress += this.line1 + ",";
      }
      if (!Utils.isEmpty(this.line2)) {
        strAddress += this.line2 + ",";
      }
      if (!Utils.isEmpty(this.area)) {
        strAddress += this.area + ",";
      }
      if (!Utils.isEmpty(this.landmark)) {
        strAddress += this.landmark + ",";
      }
      if (!Utils.isEmpty(this.city)) {
        strAddress += this.city + ",";
      }
      if (!Utils.isEmpty(this.state)) {
        strAddress += this.state + ",";
      }
      if (!Utils.isEmpty(this.country)) {
        strAddress += this.country + ",";
      }
      if (!Utils.isEmpty(this.pincode)) {
        strAddress += this.pincode;
      }
      //Remove unwanted comma from the end of the string
      if ("," == strAddress[strAddress.length - 1]) {
        strAddress = strAddress.slice(0, -1);
      }
      return strAddress;
    },
    resetObject: function () {
      this.id = "";
      this.type = "";
      this.location = [];
      this.line1 = "";
      this.line2 = "";
      this.area = "";
      this.landmark = "";
      this.city = "";
      this.state = "";
      this.country = "";
      this.pincode = "";
      this.reference_id = "";
      this.other_data = "";
    },
  };
  return AddressObject;
};

export default AddressObject(Utils);
