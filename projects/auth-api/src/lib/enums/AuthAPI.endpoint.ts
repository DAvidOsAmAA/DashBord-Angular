import { environment } from "../../../../../src/environment/environment";

export class AuthENDPOINT {
  static LOGIN = `${environment.apiUrl}/api/v1/auth/login`;
  static REGISER = `${environment.apiUrl}/api/v1/auth/register`;
  static Change_Password = `${environment.apiUrl}/api/v1/auth/changePassword`;
  static DELETE_ACOUNT = `${environment.apiUrl}/api/v1/auth/deleteMe`;
  static EDITE_PROFILE = `${environment.apiUrl}/api/v1/auth/editProfile`;
  static LOGIN_OUT = `${environment.apiUrl}/api/v1/auth/logout`;
  static USER_INFO = `${environment.apiUrl}/api/v1/auth/profileData`;
  static FORGET_PASSWORD = `${environment.apiUrl}/api/v1/auth/forget-password`;
  static VERIFY_RESET_CODE = `${environment.apiUrl}/api/v1/auth/verify-code`;
  static RESET_PASSWORD = `${environment.apiUrl}/api/v1/auth/reset-password`;
}
