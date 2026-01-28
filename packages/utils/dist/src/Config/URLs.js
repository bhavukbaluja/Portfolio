"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateProfile_URL = exports.saveCartDataInDb = exports.changePassword_Url = exports.YOUTUBE_URL = exports.XTWITTER_URL = exports.WebTrendingBar_URL = exports.Validate_OTP_Url = exports.URL_Upload_Profile_img = exports.URL_Upload_Image = exports.URL_Update_About_Us = exports.URL_Get_Profile_Img = exports.URL_Crop_ProfileImage = exports.URL_Crop_Image = exports.URL_CONFIG = exports.URL_About_Us = exports.SizeChart_URL = exports.Register_Url = exports.Refresh_UserInfo_URL = exports.RefreshAccessToken_URL = exports.Product_URL = exports.Page_URL = exports.PINTEREST_URL = exports.Login_URL = exports.LINKEDIN_URL = exports.Inventory_URL = exports.INSTAGRAM_URL = exports.FB_URL = exports.Category_URL = void 0;
var URL_CONFIG = exports.URL_CONFIG = {
  SITE_URL: "http://localhost:3001/",
  API_URL: "http://localhost:8080",
  IMAGE_URL: "assets/images/automation/",
  PUBLIC_URL: "/api/public",
  ADMIN_URL: "/api/admin",
  SITE_ENABLED: "/site-status"
};
var Register_Url = exports.Register_Url = "/api/auth/register";
var Login_URL = exports.Login_URL = "/api/auth/login";
var Validate_OTP_Url = exports.Validate_OTP_Url = "/api/auth/validateOtp";
var RefreshAccessToken_URL = exports.RefreshAccessToken_URL = "/api/auth/refresh";
var Refresh_UserInfo_URL = exports.Refresh_UserInfo_URL = "/api/user/userInfo";
var changePassword_Url = exports.changePassword_Url = "/api/user/updatePassword";
var updateProfile_URL = exports.updateProfile_URL = "/api/user/updateProfile";
var saveCartDataInDb = exports.saveCartDataInDb = "/api/user/cart";
var FB_URL = exports.FB_URL = "https://www.facebook.com/";
var INSTAGRAM_URL = exports.INSTAGRAM_URL = "https://www.instagram.com/";
var YOUTUBE_URL = exports.YOUTUBE_URL = "https://www.youtube.com/";
var PINTEREST_URL = exports.PINTEREST_URL = "https://www.pinterest.com/";
var XTWITTER_URL = exports.XTWITTER_URL = "https://x.com/";
var LINKEDIN_URL = exports.LINKEDIN_URL = "https://www.linkedin.com/";
var URL_About_Us = exports.URL_About_Us = "/api/company/aboutus";
var URL_Update_About_Us = exports.URL_Update_About_Us = "/api/management/company/aboutus";
var URL_Upload_Image = exports.URL_Upload_Image = "/api/management/uploadImage";
// export const URL_Upload_Image = "/api/user/uploadProfileImage";
var URL_Get_Profile_Img = exports.URL_Get_Profile_Img = "/api/user/profileImage";
var URL_Upload_Profile_img = exports.URL_Upload_Profile_img = "/api/user/uploadProfileImage";
var URL_Crop_ProfileImage = exports.URL_Crop_ProfileImage = "/api/user/cropimage/";
var URL_Crop_Image = exports.URL_Crop_Image = "/api/management/cropimage";
// export const URL_About_Us = "/api/user/13";

var Inventory_URL = exports.Inventory_URL = "/api/management/inventory";
var Product_URL = exports.Product_URL = "/api/management/product";
var Category_URL = exports.Category_URL = "/api/management/category";
var Page_URL = exports.Page_URL = "/api/management/companyPage";
var SizeChart_URL = exports.SizeChart_URL = "/api/size-chart";
var WebTrendingBar_URL = exports.WebTrendingBar_URL = "/api/management/web-trending-bar";