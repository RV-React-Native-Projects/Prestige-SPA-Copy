import Utils from "@common/Utils";
import ErrorConstant from "@common/ErrorConstant";
import StripeResource from "./StripeResource";

interface StripeManager {
  generatePaymentSheet: (
    params: any,
    successCallback: (res: any) => void,
    errorCallback: (error: any) => void,
  ) => void;
}

const StripeManager = (
  StripeResource: any,
  Utils: any,
  ErrorConstant: any,
): StripeManager => {
  const generatePaymentSheet = (
    params: any,
    successCallback: (res: any) => void,
    errorCallback: (error: any) => void,
  ) => {
    StripeResource.generatePaymentSheet(params).then(
      (res: any) => {
        successCallback(res);
      },
      (error: any) => {
        error = Utils.updateErrorObject(error);
        errorCallback(error);
      },
    );
  };

  return {
    generatePaymentSheet,
  };
};

export default StripeManager(StripeResource, Utils, ErrorConstant);
