import Utils from "@common/Utils";
import ErrorConstants from "@common/ErrorConstants";
import AddressObject from "./AddressObject";

const UserObject = function (Utils, ErrorConstants, AddressObject) {
  /**
   * @ngdoc
   * @name DataModel.User#User
   * @methodOf DataModel.User
   * @description Constructor method to get User object.
   * Method always returns a empty object
   */
  function UserObject() {
    //Mandatory field
    this.name = "";
    //Mandatory field
    this.email = "";
    //Mandatory field
    this.phone_number = "";
    //Optional field
    this.profile_pic = "";
    //Optional field for signup
    this.addresses = [];
    //Mandatory field
    this.password = "";
    //Optional
    this.id = "";
    //To store merchant id
    this.merchant_id = "";
    //To store otp verification status
    this.otp_verified = true;
    this.email_verified = false;
    //To store unread notification count
    this.unread_notification_count = 0;
    //To store whether valid otp been sent or not
    this.valid_otp_sent = false;
    //wallet if
    this.wallet_id = "";
    //user referral code
    this.ref_code = "";
    this.referral_code = "";
    this.other_data = {};
    this.preferences = {};
    this.is_owner = false;
    this.added_accounts;
    this.linked_accounts;
    this.source = "";
    this.membership_type = "";
    this.first_name = "";
    this.title = "";
    this.pic_url = "";
    this.dob = "";
    this.gender = "";
    this.chosen_language = "";
    this.consented = false;
    this.birthday;
    this.anniversary;
    this.profession;
    this.marital_status;
    this.country_code;
    this.national_id;
    this.company_name;
    this.brand_name;
  }

  UserObject.prototype = {
    /**
     * @ngdoc
     * @name DataModel.User#validateObject
     * @methodOf DataModel.User
     * @constructor
     * @description Method to validate User object.
     * @returns {boolean} - true if User object is valid otherwise false
     */
    validateObject: function () {
      console.log("this.userObject=");
      console.log(this);
      var error = Utils.ErrorObject(ErrorConstants.ErrorCodes.SUCCESS, true);
      //User name can't be empty
      if (Utils.isEmpty(this.name)) {
        error = Utils.ErrorObject(
          ErrorConstants.ErrorCodes.USER_NAME_EMPTY,
          false
        );
        return error;
      }

      //Email can't be empty
      if (Utils.isEmpty(this.email)) {
        error = Utils.ErrorObject(ErrorConstants.ErrorCodes.EMAIL_EMPTY, false);
        return error;
      } else if (!Utils.isValidEmail(this.email)) {
        error = Utils.ErrorObject(
          ErrorConstants.ErrorCodes.INVALID_EMAIL,
          false
        );
        return error;
      }

      //Phone number can't be empty
      if (Utils.isEmpty(this.phone_number)) {
        error = Utils.ErrorObject(
          ErrorConstants.ErrorCodes.PHONE_NUMBER_EMPTY,
          false
        );
        return error;
      } else if (!Utils.isValidPhoneNumber(this.phone_number)) {
        error = Utils.ErrorObject(
          ErrorConstants.ErrorCodes.INVALID_PHONE_NUMBER,
          false
        );
        return error;
      }

      return error;
    },
    /**
     * @ngdoc
     * @name DataModel.User#addAddress
     * @methodOf DataModel.User
     * @constructor
     * @description Method to add a new address to user object.
     */
    addAddress: function (address) {
      //TODO:validation for address object to be added
      this.addresses.push(address);
    },
    /**
     * @ngdoc
     * @name DataModel.User#removeAddress
     * @methodOf DataModel.User
     * @constructor
     * @description Method to remove address to user object.
     */
    removeAddress: function (address) {
      var index = addresses.indexOf(address);
      if (index > -1) {
        this.addresses.splice(index, 1);
      }
    },
    validatePassword: function () {
      var validationResponse = Utils.ErrorObject(
        ErrorConstants.ErrorCodes.SUCCESS,
        true
      );
      if (Utils.isEmpty(this.password)) {
        validationResponse = Utils.ErrorObject(
          ErrorConstants.ErrorCodes.PASSWORD_EMPTY,
          false
        );
      } else if (!Utils.isValidPassword(this.password)) {
        validationResponse = Utils.ErrorObject(
          ErrorConstants.ErrorCodes.INVALID_PASSWORD,
          false
        );
      }
      return validationResponse;
    },
    buildObject: function (rawUserObject) {
      this.name = rawUserObject.name;
      this.email = rawUserObject.email;
      this.phone_number = rawUserObject.phone_number;
      this.profile_pic = rawUserObject.profile_pic;
      this.catalog_type = rawUserObject.catalog_type;
      this.catalog_id = rawUserObject.catalog_id;
      this.addresses = [];
      var rawAddresses = rawUserObject.addresses;
      if (rawAddresses) {
        var parsedAddresses = [];
        rawAddresses.forEach(function (rawAddress, index, rawAddresses) {
          var addressObject = new AddressObject();
          addressObject.buildObject(rawAddress);
          parsedAddresses.push(addressObject);
        });
        this.addresses = parsedAddresses;
      }
      //this.password = rawUserObject.password;
      if (Utils.isOfTypeString(rawUserObject.id)) {
        this.id = rawUserObject.id;
      } else if (rawUserObject._id) {
        this.id = rawUserObject._id.$oid;
      }
      if (Utils.isOfTypeString(rawUserObject.merchant_id)) {
        this.merchant_id = rawUserObject.merchant_id;
      } else if (rawUserObject.merchant_id) {
        this.merchant_id = rawUserObject.merchant_id.$oid;
      }
      if (Utils.isOfTypeString(rawUserObject.wallet_id)) {
        this.wallet_id = rawUserObject.wallet_id;
      } else if (rawUserObject.wallet_id) {
        this.wallet_id = rawUserObject.wallet_id.$oid;
      }
      this.otp_verified = rawUserObject.otp_verified;
      this.unread_notification_count = rawUserObject.unread_notification_count;
      this.valid_otp_sent = rawUserObject.valid_otp_sent;
      this.ref_code = rawUserObject.ref_code;
      this.referral_code = rawUserObject.referral_code;
      this.other_data = rawUserObject.other_data;
      this.is_owner = rawUserObject.is_owner;
      this.added_accounts = rawUserObject.added_accounts;
      this.linked_accounts = rawUserObject.linked_accounts;
      this.source = rawUserObject.source;
      this.membership_type = rawUserObject.membership_type;
      this.first_name = rawUserObject.first_name;
      this.title = rawUserObject.title;
      this.pic_url = rawUserObject.pic_url;
      this.gender = rawUserObject.gender;
      this.dob = rawUserObject.dob;
      this.chosen_language = rawUserObject.chosen_language;
      this.consented = rawUserObject.consented;
      this.protocol_numbers = rawUserObject.protocol_numbers;
      this.birthday = rawUserObject.birthday;
      this.anniversary = rawUserObject.anniversary;
      this.profession = rawUserObject.profession;
      this.marital_status = rawUserObject.marital_status;
      this.email_verified = rawUserObject.email_verified;
      this.country_code = rawUserObject.country_code;
      this.national_id = rawUserObject.national_id;
      this.company_name = rawUserObject.company_name;
      this.brand_name = rawUserObject.brand_name;
      if (this.email_verified == false || this.email_verified == true) {
        this.otp_verified =
          rawUserObject.otp_verified && rawUserObject.email_verified;
      }
      this.preferences = rawUserObject.preferences;
    },
  };

  return UserObject;
};

export default UserObject(Utils, ErrorConstants, AddressObject);
