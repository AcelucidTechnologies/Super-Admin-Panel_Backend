const express = require("express");
const router = express.Router();
const {
  signup,
  updatesignup,
  login,
  logout,
  deleteUser,
} = require("../controllers/Authentication/user");
const { forgot, resetPassword } = require("../controllers/forgot");
const {
  create,
  update,
  findall,
  find,
  userfind,
  findallusers,
} = require("../controllers/update");
const { del, delall } = require("../controllers/status");
const rolehandler = require("../controllers/rolehandler");
const { otpsignup, verifyotp, otplogout } = require("../controllers/otp");
const { adminLogin } = require("../controllers/Authentication/user");
const { downloadcsv } = require("../controllers/downloadcsv");
const { uploadimage } = require("../controllers/image");
const { upload } = require("../controllers/image");
const {
  getParentCategoryById,
  getAllParentCategory,
  updateParentCategory,
  deleteParentCategory,
} = require("../controllers/parentcategory");
const {
  getCategoryById,
  getAllCategory,
  updateCategory,
  deleteCategory,
  createCategory,
  categoryImage,
} = require("../controllers/category");
const {
  createProduct,
  getAllProduct,
  getProduct,
  deleteProduct,
  updateProduct,
  productImage,
} = require("../controllers/product");
const passport = require("passport");
const multer = require("multer");
const path = require("path");
const {
  getAllOrders,
  getOrder,
  updateOrder,
  deleteOrder,
  createOrder,
  getOrderById,
} = require("../controllers/order");
const {
  getAllShipmentDetails,
  createShipment,
  updateShipment,
  getShipment,
} = require("../controllers/shipment");
const {
  getAllSponsors,
  getSponsorDetail,
  createSponsorDetail,
  updateSponsorDetail,
  deleteSponsorDetail,
} = require("../controllers/sponsor");
const {
  getAllCoupon,
  getCouponDetail,
  createCoupon,
  updateCouponDetail,
  deleteCoupon,
  getCouponDataById,
} = require("../controllers/coupon");
const {
  getAllUserPermission,
  getUserPermission,
  createUserPermission,
  updateUserPermission,
  deleteUserPermission,
} = require("../controllers/accessPermission");
const {
  createBannerSpecial,
  getBannerSpecial,
  updateBannerSpecial,
  deleteBannerSpecial,
  getAllBannerData,
  getBannerDataById,
} = require("../controllers/bannerSpecial");
const { S3Client } = require("@aws-sdk/client-s3");
const multerS3 = require("multer-s3");
const { uploadImage, up } = require("../controllers/bannerSpecial");
const {
  featureImage,
  createFeatureProduct,
  getFeatureProduct,
  updateFeatureProduct,
  deleteFeatureProduct,
  getSpeciaProduct,
  getFeatureProductById,
} = require("../controllers/featureProduct");
const {
  createSlider,
  sliderImage,
  getSlider,
  updateSlider,
  deleteSlider,
  getSliderById,
} = require("../controllers/slider");
const {
  createPageSetUp,
  updatePageSetUp,
  getpageSetUp,
  getPageSetUpDataById,
} = require("../controllers/pageSetUP");
const { createSeo, getSeo } = require("../controllers/seo");
const { createLiveChat } = require("../controllers/liveChat");
//const googleAnalyticsTracking = require("../models/googleAnalyticsTracking");
const {
  createGoogleAnalysisKey,
} = require("../controllers/googleAnalyticsTracking");
const {
  createMetaAnalysisKey,
} = require("../controllers/metaAnalyticsTracking");
const {
  createRatingCriteria,
  getRatingCriteria,
  updateRatingCriteria,
  deleteRatingCriteria,
  getRatingCriteriaById,
} = require("../controllers/ratingCriteria");
const {
  getRating,
  createRating,
  deleteRating,
  updateRating,
  getRatingById,
  getTotalRating,
} = require("../controllers/rating");
const {
  getUserTypeList,
  createUserTypeList,
  updateUserTypeList,
  deleteUserTypeList,
  getUserTypeListById,
} = require("../controllers/userTypeList");
const {
  createPageSetUpData,
  getpageSetUpData,
} = require("../controllers/pageSetUpData");
const { createPushNotification } = require("../controllers/pushNotification");
const {
  createReviewList,
  getAllReviewList,
  updateReviewList,
  deleteReviewList,
  getRatingReviewById,
} = require("../controllers/reviewList");
const {
  createReviewerNameList,
  getReviewerNameList,
} = require("../controllers/reviewerNameList");
const {
  createReviewerList,
  getReviewerList,
  updateReviewerList,
  deleteReviewerList,
  getReviewerListById,
} = require("../controllers/reviewerList");
const { createNewReviewerName } = require("../controllers/newReviewerName");
const { createLeaveManagementProfile, getLeaveProfile, deleteLeaveProfile, getLeaveProfileById, updateLeaveProfile, uploadProfile, getTeamData, getEmail } = require("../controllers/leaveManagementProfile");
const { createLeaveTracker, uploadLeave, getLeaveTracker, deleteLeaveTracker, getLeaveTrackerById, approve, disapprove, getAllLeaveTracker,} = require("../controllers/leaveTracker");
const { getTotalLeaves } = require("../controllers/totalLeaves");
const { createLeaveAssets, getLeaveAssets, getLeaveAssetsById, deleteLeaveAssets, updateLeaveAssets } = require("../controllers/leaveManagementAssets");
const { createDesignation, getDesignation } = require("../controllers/designation");
const { createDepartment, getDepartment } = require("../controllers/department");
const { createSourceHiring, getSourceHiring } = require("../controllers/sourceHiring");
const { createReporting, getReporting } = require("../controllers/reporting");
const { getCalender } = require("../controllers/leaveCalender");
const { createExitDetails, getExitDetails, getExitDetailsById, deleteExitDetails, updateExitDetails } = require("../controllers/exitDetails");
const { createLocation, getLocation } = require("../controllers/location");
const { createReimbursement, getReimbursement, getReimbursementById, deleteReimbursement, updateReimbursement } = require("../controllers/travelExpense");
const { createDocument, uploadDocument, getDocument, getDocuemntById, deleteDocument, updateDocument } = require("../controllers/document");
const { sendMail } = require("../controllers/sendGridMail");
const { createCustomerDetails, uploadOrder, getCustomerDetails } = require("../controllers/customerDetails");
const { CreateOrder } = require("../controllers/createOrder");
const { CreateOrderStatus, getOrderStatus, getOrderStatusById, deleteOrderStatus, updateOrderStatus } = require("../controllers/orderStatus");
const { createUserList, getUserList, getUserListById, deleteUserList, updateUserList } = require("../controllers/user");
const { createSubscription, getSubscription, getSubscriptionById, deleteSubscription, updateSubscription } = require("../controllers/subscriptionPlan");
const { createProductOption, getProductOption, getProductOptionById, deleteProductOption, updateProductOption } = require("../controllers/productOption");
const { createAddCoupon, getAddCoupon, getAddCouponById, deleteAddCoupon, updateAddCoupon } = require("../controllers/addCoupon");
// const storage = multer.diskStorage(
//   {
//   // destination: function (req, file, cb) {
//   //     cb(null, "uploads/");
//   // },
//   filename: function (req, file, cb) {
//       let ext = path.extname(file.originalname);
//       cb(null, Date.now() + ext);
//   },
// }
// );
// const upload2 = multer({
//   storage: storage,
// });
const s3 = new S3Client({
  credentials: {
    accessKeyId: process.env.AWS_S3_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY,
  },
  region: "us-east-1",
});

const s3Storage = multerS3({
  s3: s3,
  bucket: process.env.AWS_S3_BUCKET_NAME,
  contentType: multerS3.AUTO_CONTENT_TYPE,
  metadata: function (req, file, cb) {
    cb(null, { fieldName: file.fieldname });
  },
  key: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload2 = multer({
  storage: s3Storage,
});

router.post("/signup", upload2.single("image"), signup);
router.put("/signup", upload2.single("image"), updatesignup);
router.delete("/signup", deleteUser);
router.post("/login", login);
router.post("/adminlogin", adminLogin);
router.post("/logout", logout);
router.post("/forgot", forgot);
router.post("/otpsignup", otpsignup);
router.post("/otpverify", verifyotp);
router.post("/uploadimage", upload, uploadimage);
router.post("/resetPassword/:userId/:token", resetPassword);
router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);
router.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/auth/google",
    session: false,
  }),
  (req, res, next) => {
    res.redirect("mychat://preferrenceScreen");
  }
);
router.get(
  "/auth/facebook",
  passport.authenticate("facebook", { scope: ["profile", "email"] })
);
router.get(
  "/auth/facebook/callback",
  passport.authenticate("facebook", {
    failureRedirect: "/",
    session: false,
  })
);
router.post(
  "/createuser",
  rolehandler.grantAccess("createAny", "profile"),
  create
);
router.put(
  "/update/:id",
  rolehandler.grantAccess("updateOwn", "profile"),
  update
);
router.put("/delete/:id", rolehandler.grantAccess("deleteOwn", "profile"), del);
router.get("/users", rolehandler.grantAccess("readAny", "profile"), findall);
router.get(
  "/registeredusers",
  rolehandler.grantAccess("readAny", "profile"),
  findallusers
);
router.get("/user/:id", find);
router.get("/user", userfind);
router.put(
  "/deleteall",
  rolehandler.grantAccess("deleteAny", "profile"),
  delall
);
router.get("/downloadcsv", downloadcsv);

//parent category table api

router.get(
  "/parentcategories",
  rolehandler.grantAccess("readOwn", "profile"),
  getParentCategoryById
);
router.get(
  "/parentcategories",
  rolehandler.grantAccess("readOwn", "profile"),
  getAllParentCategory
);
router.put(
  "/parentcategories",
  rolehandler.grantAccess("updateOwn", "profile"),
  updateParentCategory
);
router.delete(
  "/parentcategories",
  rolehandler.grantAccess("deleteOwn", "profile"),
  deleteParentCategory
);

//category table api

router.get(
  "/categories",
  rolehandler.grantAccess("readOwn", "profile"),
  getCategoryById
);
router.get(
  "/categories",
  rolehandler.grantAccess("readOwn", "profile"),
  getAllCategory
);
router.put(
  "/updateCategories",
  rolehandler.grantAccess("updateOwn", "profile"),
  categoryImage,
  updateCategory
);
router.delete(
  "/deleteCategories",
  rolehandler.grantAccess("deleteOwn", "profile"),
  deleteCategory
);
router.post(
  "/createCategory",
  rolehandler.grantAccess("readOwn", "profile"),
  categoryImage,
  createCategory
);

//product table api

router.post(
  "/createProducts",
  rolehandler.grantAccess("createOwn", "profile"),
  productImage,
  // upload2.fields([
  //   { name: "image", maxCount: 1 },
  //    { name: "video", maxCount: 1 },
  // ]),
  createProduct
);
router.get(
  "/products",
  rolehandler.grantAccess("readOwn", "profile"),
  getProduct
);
router.get(
  "/products",
  rolehandler.grantAccess("readOwn", "profile"),
  getAllProduct
);
router.put(
  "/products",
  rolehandler.grantAccess("updateOwn", "profile"),
  upload2.fields([
    { name: "image", maxCount: 1 },
    { name: "video", maxCount: 1 },
  ]),
  updateProduct
);
router.delete(
  "/deleteProducts",
  rolehandler.grantAccess("deleteOwn", "profile"),
  deleteProduct
);



//shipment table api

router.get(
  "/shipments",
  rolehandler.grantAccess("readOwn", "profile"),
  getShipment
);
router.get(
  "/shipments",
  rolehandler.grantAccess("readOwn", "profile"),
  getAllShipmentDetails
);
router.post(
  "/shipments",
  rolehandler.grantAccess("updateOwn", "profile"),
  upload2.none(),
  createShipment
);
router.put(
  "/shipments",
  rolehandler.grantAccess("updateOwn", "profile"),
  upload2.none(),
  updateShipment
);
router.delete(
  "/shipments",
  rolehandler.grantAccess("deleteOwn", "profile"),
  deleteOrder
);

//sponsor table api

router.get(
  "/sponsors",
  rolehandler.grantAccess("readOwn", "profile"),
  getSponsorDetail
);
router.get(
  "/sponsors",
  rolehandler.grantAccess("readOwn", "profile"),
  getAllSponsors
);
router.post(
  "/sponsors",
  rolehandler.grantAccess("updateOwn", "profile"),
  upload2.none(),
  createSponsorDetail
);
router.put(
  "/sponsors",
  rolehandler.grantAccess("updateOwn", "profile"),
  upload2.none(),
  updateSponsorDetail
);
router.delete(
  "/sponsors",
  rolehandler.grantAccess("deleteOwn", "profile"),
  deleteSponsorDetail
);

//coupon table api

router.get(
  "/getCouponDataById",
  rolehandler.grantAccess("readOwn", "profile"),
  getCouponDataById
);
router.get(
  "/coupons",
  rolehandler.grantAccess("readOwn", "profile"),
  getAllCoupon
);
router.post(
  "/createcoupons",
  rolehandler.grantAccess("updateOwn", "profile"),
  createCoupon
);
router.put(
  "/updateCoupons",
  rolehandler.grantAccess("updateOwn", "profile"),
  updateCouponDetail
);
router.delete(
  "/deleteCoupons",
  rolehandler.grantAccess("deleteOwn", "profile"),
  deleteCoupon
);

//module permission table api
router.get(
  "/modulepermission",
  rolehandler.grantAccess("readOwn", "profile"),
  getUserPermission
);
router.get("/modulepermission", getAllUserPermission);
router.post(
  "/modulepermission",
  rolehandler.grantAccess("updateOwn", "profile"),
  createUserPermission
);
router.put(
  "/modulepermission",
  rolehandler.grantAccess("updateOwn", "profile"),
  updateUserPermission
);
router.delete(
  "/modulepermission",
  rolehandler.grantAccess("deleteOwn", "profile"),
  deleteUserPermission
);

// bannerSpecial table Api

router.post(
  "/createBannerSpecial",
  rolehandler.grantAccess("readOwn", "profile"),
  uploadImage,
  createBannerSpecial
);
router.get(
  "/getBannerSpecial",
  rolehandler.grantAccess("readOwn", "profile"),
  getBannerSpecial
);
router.get(
  "/getBannerById",
  rolehandler.grantAccess("readOwn", "profile"),
  getBannerDataById
);
router.put(
  "/updateBannerSpecial",
  rolehandler.grantAccess("updateOwn", "profile"),
  uploadImage,
  updateBannerSpecial
);
router.delete(
  "/deleteBannerSpecial",
  rolehandler.grantAccess("deleteOwn", "profile"),
  deleteBannerSpecial
);
//     Feature Product Api

router.post(
  "/createFeatureProduct",
  rolehandler.grantAccess("readOwn", "profile"),
  featureImage,
  createFeatureProduct
);
router.get(
  "/getFeatureProduct",
  rolehandler.grantAccess("readOwn", "profile"),
  getFeatureProduct
);
router.get(
  "/getFeatureProductById",
  rolehandler.grantAccess("readOwn", "profile"),
  getFeatureProductById
);
router.put(
  "/updateFeatureProduct",
  rolehandler.grantAccess("updateOwn", "profile"),
  featureImage,
  updateFeatureProduct
);
router.delete(
  "/deleteFeatureProduct",
  rolehandler.grantAccess("deleteOwn", "profile"),
  deleteFeatureProduct
);

//   for Special product Api

router.get(
  "/getSpecialProduct",
  rolehandler.grantAccess("readOwn", "profile"),
  getSpeciaProduct
);

//  Slider product api

router.post(
  "/createSlider",
  rolehandler.grantAccess("readOwn", "profile"),
  sliderImage,
  createSlider
);
router.get(
  "/getSlider",
  rolehandler.grantAccess("readOwn", "profile"),
  getSlider
);
router.put(
  "/updateSlider",
  rolehandler.grantAccess("updateOwn", "profile"),
  sliderImage,
  updateSlider
);
router.delete(
  "/deleteSlider",
  rolehandler.grantAccess("deleteOwn", "profile"),
  deleteSlider
);
router.get(
  "/getSliderById",
  rolehandler.grantAccess("readOwn", "profile"),
  getSliderById
);

//     Page SetUp Apis

router.get(
  "/getPageSetUp",
  rolehandler.grantAccess("readOwn", "profile"),
  getpageSetUp
);
router.post(
  "/createPageSetUp",
  rolehandler.grantAccess("readOwn", "profile"),
  createPageSetUp
);
router.put(
  "/updatePageSetUp",
  rolehandler.grantAccess("updateOwn", "profile"),
  updatePageSetUp
);
module.exports = router;
router.get(
  "/getPageSetUpById",
  rolehandler.grantAccess("readOwn", "profile"),
  getPageSetUpDataById
);

// page Set up Api
router.post(
  "/createPageSetUpData",
  rolehandler.grantAccess("readOwn", "profile"),
  createPageSetUpData
);
router.get(
  "/getpageSetUpData",
  rolehandler.grantAccess("readOwn", "profile"),
  getpageSetUpData
);

// Apis of banner for SuperAdmin
router.get(
  "/getAllBannerData",
  rolehandler.grantAccess("readOwn", "profile"),
  getAllBannerData
);

// Apis for Seo module
router.post(
  "/createSeo",
  rolehandler.grantAccess("readOwn", "profile"),
  createSeo
);
router.get("/getSeo", rolehandler.grantAccess("readOwn", "profile"), getSeo);

//live chat Apis

router.post(
  "/creteLiveChat",
  rolehandler.grantAccess("readOwn", "profile"),
  createLiveChat
);

// Push Notification

router.post(
  "/createPushNotification",
  rolehandler.grantAccess("readOwn", "profile"),
  createPushNotification
);

//  googleAnalyticsTracking for Apis

router.post(
  "/CreateGoogleAnalyticsTracking",
  rolehandler.grantAccess("readOwn", "profile"),
  createGoogleAnalysisKey
);

// metaAnalyticsTracking

router.post(
  "/CreateMetaAnalyticsTracking",
  rolehandler.grantAccess("readOwn", "profile"),
  createMetaAnalysisKey
);

// Rating Criteria
router.get(
  "/getRatingCriteria",
  rolehandler.grantAccess("readOwn", "profile"),
  getRatingCriteria
);
router.post(
  "/createRatingCriteria",
  rolehandler.grantAccess("readOwn", "profile"),
  createRatingCriteria
);
router.put(
  "/updateRatingCriteria",
  rolehandler.grantAccess("updateOwn", "profile"),
  updateRatingCriteria
);
router.delete(
  "/deleteRatingCriteria",
  rolehandler.grantAccess("deleteOwn", "profile"),
  deleteRatingCriteria
);
router.get(
  "/getRatingCriteriaById",
  rolehandler.grantAccess("readOwn", "profile"),
  getRatingCriteriaById
);

// Rating
router.get(
  "/getRating",
  rolehandler.grantAccess("readOwn", "profile"),
  getRating
);
router.post(
  "/createRating",
  rolehandler.grantAccess("readOwn", "profile"),
  createRating
);
router.put(
  "/updateRating",
  rolehandler.grantAccess("updateOwn", "profile"),
  updateRating
);
router.delete(
  "/deleteRating",
  rolehandler.grantAccess("deleteOwn", "profile"),
  deleteRating
);
router.get(
  "/getRatingById",
  rolehandler.grantAccess("readOwn", "profile"),
  getRatingById
);

router.get(
  "/getAllRating",
  rolehandler.grantAccess("readOwn", "profile"),
  getTotalRating
);
// userType List

router.get(
  "/getUserTypeList",
  rolehandler.grantAccess("readOwn", "profile"),
  getUserTypeList
);
router.post(
  "/createUserTypeList",
  rolehandler.grantAccess("readOwn", "profile"),
  createUserTypeList
);
router.put(
  "/updateUserTypeList",
  rolehandler.grantAccess("updateOwn", "profile"),
  updateUserTypeList
);
router.delete(
  "/deleteUserTypeList",
  rolehandler.grantAccess("deleteOwn", "profile"),
  deleteUserTypeList
);
router.get(
  "/getUserTypeListById",
  rolehandler.grantAccess("readOwn", "profile"),
  getUserTypeListById
);

//review List Api

router.post(
  "/createReviewList",
  rolehandler.grantAccess("readOwn", "profile"),
  createReviewList
);
router.get(
  "/getReviewList",
  rolehandler.grantAccess("readOwn", "profile"),
  getAllReviewList
);
router.put(
  "/updateReviewList",
  rolehandler.grantAccess("updateOwn", "profile"),
  updateReviewList
);
router.delete(
  "/deleteReviewList",
  rolehandler.grantAccess("deleteOwn", "profile"),
  deleteReviewList
);
router.get(
  "/getReviewListById",
  rolehandler.grantAccess("readOwn", "profile"),
  getRatingReviewById
);

// ReviewerNameList

router.post(
  "/createReviewerNameList",
  rolehandler.grantAccess("readOwn", "profile"),
  createReviewerNameList
);
router.get(
  "/getReviewerNameList",
  rolehandler.grantAccess("readOwn", "profile"),
  getReviewerNameList
);

// Reviewer List

router.post(
  "/createReviewerList",
  rolehandler.grantAccess("readOwn", "profile"),
  createReviewerList
);
router.get(
  "/getReviewerList",
  rolehandler.grantAccess("readOwn", "profile"),
  getReviewerList
);
router.put(
  "/updateReviewerList",
  rolehandler.grantAccess("updateOwn", "profile"),
  updateReviewerList
);
router.delete(
  "/deleteReviewerList",
  rolehandler.grantAccess("deleteOwn", "profile"),
  deleteReviewerList
);
router.get(
  "/getReviewerListById",
  rolehandler.grantAccess("readOwn", "profile"),
  getReviewerListById
);

//    NewReviewername

router.post(
  "/createNewReviewerName",
  rolehandler.grantAccess("readOwn", "profile"),
  createNewReviewerName
);

   // Leave management Profile Apis

   router.get(
    "/getLeaveProfile",
    rolehandler.grantAccess("readOwn", "profile"),
    getLeaveProfile
  );
  router.get(
    "/getLeaveProfileById",
    rolehandler.grantAccess("readOwn", "profile"),
    getLeaveProfileById
  );
   router.post(
    "/createLeaveProfile",
    uploadProfile,
    rolehandler.grantAccess("readOwn", "profile"),
    createLeaveManagementProfile
  );
  router.delete(
    "/deleteLeaveProfile",
    rolehandler.grantAccess("deleteOwn", "profile"),
    deleteLeaveProfile
  );
  router.put(
    "/updateLeaveProfile",
    uploadProfile,
    rolehandler.grantAccess("updateOwn", "profile"),
    updateLeaveProfile
  );

  router.get(
    "/getEmail",
    rolehandler.grantAccess("readOwn", "profile"),
    getEmail
  );


  // leave tracker module
  router.get(
    "/getLeaveTracker",
    rolehandler.grantAccess("readOwn", "profile"),
    getLeaveTracker
  );
  router.get(
    "/getLeaveTrackerById",
    rolehandler.grantAccess("readOwn", "profile"),
    getLeaveTrackerById
  );
  router.delete(
    "/deleteLeaveTracker",
    rolehandler.grantAccess("deleteOwn", "profile"),
    deleteLeaveTracker
  );
  router.post(
    "/createLeaveTracker",
    rolehandler.grantAccess("readOwn", "profile"),
    uploadLeave,
    createLeaveTracker
  );
  

  // Assets Apis

  router.post(
    "/createLeaveAssets",
    rolehandler.grantAccess("readOwn", "profile"),
    createLeaveAssets
  );
  router.get(
    "/getLeaveAssets",
    rolehandler.grantAccess("readOwn", "profile"),
    getLeaveAssets
  );
  router.get(
    "/getLeaveAssetsById",
    rolehandler.grantAccess("readOwn", "profile"),
    getLeaveAssetsById
  );
  router.delete(
    "/deleteLeaveAssets",
    rolehandler.grantAccess("deleteOwn", "profile"),
    deleteLeaveAssets
  );
  router.put(
    "/updateLeaveAssets",
    updateLeaveAssets
  );

  router.put(
    "/approve",
    rolehandler.grantAccess("updateOwn", "profile"),
    approve
  );

  router.put(
    "/disApproved",
    rolehandler.grantAccess("updateOwn", "profile"),
    disapprove
  );

  // router.get(
  //   "/getLeaveDetails",
  //   rolehandler.grantAccess("updateOwn", "profile"),
  //   getLeaveDetails
  // );


  // total Leave 
  router.get(
    "/getTotalLeaves",
    rolehandler.grantAccess("readOwn", "profile"),
    getTotalLeaves
  );

// designation

router.post(
  "/createDesignation",
  rolehandler.grantAccess("readOwn", "profile"),
  createDesignation
);

router.get(
  "/getDesignation",
  rolehandler.grantAccess("readOwn", "profile"),
  getDesignation
);

//department

router.post(
  "/createDepartment",
  rolehandler.grantAccess("readOwn", "profile"),
  createDepartment
);

router.get(
  "/getDepartment",
  rolehandler.grantAccess("readOwn", "profile"),
  getDepartment
);

// source Hiring

router.post(
  "/createSourceHiring",
  rolehandler.grantAccess("readOwn", "profile"),
  createSourceHiring
);

router.get(
  "/getSourceHiring",
  rolehandler.grantAccess("readOwn", "profile"),
  getSourceHiring
);

// reporting 

router.post(
  "/createReporting",
  rolehandler.grantAccess("readOwn", "profile"),
  createReporting
);

router.get(
  "/getReporting",
  rolehandler.grantAccess("readOwn", "profile"),
  getReporting
);

// location

router.post(
  "/createLocation",
  rolehandler.grantAccess("readOwn", "profile"),
  createLocation
);

router.get(
  "/getLocation",
  rolehandler.grantAccess("readOwn", "profile"),
  getLocation
);

// calender Apis

router.get(
  "/getCalenderLeaves",
  rolehandler.grantAccess("readOwn", "profile"),
  getCalender
);


// Exit details


router.post(
  "/createExitDetails",
  rolehandler.grantAccess("readOwn", "profile"),
  createExitDetails
);
router.get(
  "/getExitDetails",
  rolehandler.grantAccess("readOwn", "profile"),
  getExitDetails
);
router.get(
  "/getExitDetailsById",
  rolehandler.grantAccess("readOwn", "profile"),
  getExitDetailsById
);
router.delete(
  "/deleteExitDetails",
  rolehandler.grantAccess("deleteOwn", "profile"),
  deleteExitDetails
);
router.put(
  "/updateExitDetails",
  rolehandler.grantAccess("updateOwn", "profile"),
  updateExitDetails
);


// Reimbursement

router.post(
  "/createReimbursement",
  rolehandler.grantAccess("readOwn", "profile"),
  createReimbursement
);
router.get(
  "/getReimbursement",
  rolehandler.grantAccess("readOwn", "profile"),
  getReimbursement
);
router.get(
  "/getReimbursementById",
  rolehandler.grantAccess("readOwn", "profile"),
  getReimbursementById
);
router.delete(
  "/deleteReimbursement",
  rolehandler.grantAccess("deleteOwn", "profile"),
  deleteReimbursement
);
router.put(
  "/updateReimbursement",
  rolehandler.grantAccess("updateOwn", "profile"),
  updateReimbursement
);

// Document

router.post(
  "/createDocument",
  uploadDocument,
  rolehandler.grantAccess("readOwn", "profile"),
  createDocument
);

router.get(
  "/getDocument",
  rolehandler.grantAccess("readOwn", "profile"),
  getDocument
);
router.get(
  "/getDocuemntById",
  rolehandler.grantAccess("readOwn", "profile"),
  getDocuemntById
);
router.delete(
  "/deleteDocument",
  rolehandler.grantAccess("deleteOwn", "profile"),
  deleteDocument
);
router.put(
  "/updateDocument",
  uploadDocument,
  rolehandler.grantAccess("updateOwn", "profile"),
  updateDocument
);


// team Api

router.get(
  "/getTeamData",
  rolehandler.grantAccess("readOwn", "profile"),
  getTeamData
);


//order table api

router.get("/orders", rolehandler.grantAccess("readOwn", "profile"), getOrder);
router.get(
  "/getOrders",
  rolehandler.grantAccess("readOwn", "profile"),
  getAllOrders
);
router.post(
  "/createOrders",
  rolehandler.grantAccess("updateOwn", "profile"),
  createOrder
);
router.put(
  "/updateOrders",
  rolehandler.grantAccess("updateOwn", "profile"),
  updateOrder
);
router.delete(
  "/deleteOrders",
  rolehandler.grantAccess("deleteOwn", "profile"),
  deleteOrder
);

router.get(
  "/getOrderById",
  rolehandler.grantAccess("readOwn", "profile"),
  getOrderById
);

// Customer details Api

router.post(
  "/createCustomerDetails",
  uploadOrder,
  rolehandler.grantAccess("updateOwn", "profile"),
  createCustomerDetails
);

router.get(
  "/getCustomerDetails",
  rolehandler.grantAccess("readOwn", "profile"),
  getCustomerDetails
);

       // create order Mobile Number

router.post(
  "/createOrder",
  rolehandler.grantAccess("updateOwn", "profile"),
  CreateOrder
);

// order Status Apis


router.post(
  "/CreateOrderStatus",
  rolehandler.grantAccess("createOwn", "profile"),
  CreateOrderStatus
);
router.get(
  "/getOrderStatus",
  rolehandler.grantAccess("readOwn", "profile"),
  getOrderStatus
);
router.get(
  "/getOrderStatusById",
  rolehandler.grantAccess("readOwn", "profile"),
  getOrderStatusById
);
// router.put(
//   "/products",
//   rolehandler.grantAccess("updateOwn", "profile"),
//   updateProduct
// );
router.delete(
  "/deleteOrderStatus",
  rolehandler.grantAccess("deleteOwn", "profile"),
  deleteOrderStatus
);

router.put(
  "/updateOrderStatus",
  rolehandler.grantAccess("updateOwn", "profile"),
  updateOrderStatus
);

//  userList module

router.post(
  "/createUserList",
  rolehandler.grantAccess("createOwn", "profile"),
  createUserList
);
router.get(
  "/getUserList",
  rolehandler.grantAccess("readOwn", "profile"),
  getUserList
);
router.get(
  "/getUserListById",
  rolehandler.grantAccess("readOwn", "profile"),
  getUserListById
);

router.delete(
  "/deleteUserList",
  rolehandler.grantAccess("deleteOwn", "profile"),
  deleteUserList
);

router.put(
  "/updateUserList",
  rolehandler.grantAccess("updateOwn", "profile"),
  updateUserList
);

//      getAllTotal Leave

router.get(
  "/getAllLeaveTracker",
  rolehandler.grantAccess("readOwn", "profile"),
  getAllLeaveTracker
);


// Subscription Module

router.post(
  "/createSubscription",
  rolehandler.grantAccess("createOwn", "profile"),
  createSubscription
);
router.get(
  "/getSubscription",
  rolehandler.grantAccess("readOwn", "profile"),
  getSubscription
);
router.get(
  "/getSubscriptionById",
  rolehandler.grantAccess("readOwn", "profile"),
  getSubscriptionById
);

router.delete(
  "/deleteSubscription",
  rolehandler.grantAccess("deleteOwn", "profile"),
  deleteSubscription
);

router.put(
  "/updateSubscription",
  rolehandler.grantAccess("updateOwn", "profile"),
  updateSubscription
);


// 

router.post(
  "/createProductOption",
  rolehandler.grantAccess("createOwn", "profile"),
  createProductOption
);

router.get(
  "/getProductOption",
  rolehandler.grantAccess("readOwn", "profile"),
  getProductOption
);

router.get(
  "/ getProductOptionById",
  rolehandler.grantAccess("readOwn", "profile"),
  getProductOptionById
);

router.delete(
  "/deleteProductOption",
  rolehandler.grantAccess("deleteOwn", "profile"),
  deleteProductOption
);

router.put(
  "/updateProductOption",
  rolehandler.grantAccess("updateOwn", "profile"),
  updateProductOption
);

// ADD Coupons

router.post(
  "/createAddCoupon",
  rolehandler.grantAccess("createOwn", "profile"),
  createAddCoupon
);

router.get(
  "/getAddCoupon",
  rolehandler.grantAccess("readOwn", "profile"),
  getAddCoupon
);

router.get(
  "/getAddCouponById",
  rolehandler.grantAccess("readOwn", "profile"),
  getAddCouponById
);

router.delete(
  "/deleteAddCoupon",
  rolehandler.grantAccess("deleteOwn", "profile"),
  deleteAddCoupon
);

router.put(
  "/updateAddCoupon",
  rolehandler.grantAccess("updateOwn", "profile"),
  updateAddCoupon
);
