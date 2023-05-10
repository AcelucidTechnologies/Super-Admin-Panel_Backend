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
} = require("../controllers/category");
const {
  createProduct,
  getAllProduct,
  getProduct,
  deleteProduct,
  updateProduct,
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
const { uploadImage,up } = require("../controllers/bannerSpecial");
const {featureImage,createFeatureProduct,getFeatureProduct,updateFeatureProduct,deleteFeatureProduct, getSpeciaProduct, getFeatureProductById}= require("../controllers/featureProduct")
const {createSlider,sliderImage,getSlider, updateSlider, deleteSlider, getSliderById}= require("../controllers/slider");
const { createPageSetUp, updatePageSetUp, getpageSetUp } = require("../controllers/pageSetUP");
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
  "/categories",
  rolehandler.grantAccess("updateOwn", "profile"),
  upload2.single("image"),
  updateCategory
);
router.delete(
  "/categories",
  rolehandler.grantAccess("deleteOwn", "profile"),
  deleteCategory
);

//product table api

router.post(
  "/products",
  rolehandler.grantAccess("createOwn", "profile"),
  upload2.fields([
    { name: "image", maxCount: 1 },
    { name: "video", maxCount: 1 },
  ]),
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
  "/products",
  rolehandler.grantAccess("deleteOwn", "profile"),
  deleteProduct
);

//order table api

router.get("/orders", rolehandler.grantAccess("readOwn", "profile"), getOrder);
router.get(
  "/orders",
  rolehandler.grantAccess("readOwn", "profile"),
  getAllOrders
);
router.post(
  "/orders",
  rolehandler.grantAccess("updateOwn", "profile"),
  upload2.none(),
  createOrder
);
router.put(
  "/orders",
  rolehandler.grantAccess("updateOwn", "profile"),
  upload2.none(),
  updateOrder
);
router.delete(
  "/orders",
  rolehandler.grantAccess("deleteOwn", "profile"),
  deleteOrder
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
router.get("/getBannerById",rolehandler.grantAccess("readOwn", "profile"),getBannerDataById);
router.put(
  "/updateBannerSpecial",
  rolehandler.grantAccess("updateOwn", "profile"),
  uploadImage,
  updateBannerSpecial
);
router.delete("/deleteBannerSpecial",rolehandler.grantAccess("deleteOwn", "profile"),deleteBannerSpecial);
//     Feature Product Api

router.post("/createFeatureProduct",rolehandler.grantAccess("readOwn", "profile"),featureImage,createFeatureProduct);
router.get("/getFeatureProduct",rolehandler.grantAccess("readOwn", "profile"),getFeatureProduct);
router.get("/getFeatureProductById",rolehandler.grantAccess("readOwn", "profile"),getFeatureProductById);
router.put("/updateFeatureProduct",rolehandler.grantAccess("updateOwn", "profile"),featureImage,updateFeatureProduct);
router.delete("/deleteFeatureProduct",rolehandler.grantAccess("deleteOwn", "profile"),deleteFeatureProduct);

//   for Special product Api

router.get("/getSpecialProduct",rolehandler.grantAccess("readOwn", "profile"),getSpeciaProduct)

//  Slider product api

router.post("/createSlider",rolehandler.grantAccess("readOwn", "profile"),sliderImage,createSlider);
router.get("/getSlider",rolehandler.grantAccess("readOwn", "profile"),getSlider);
router.put("/updateSlider",rolehandler.grantAccess("updateOwn", "profile"),sliderImage,updateSlider);
router.delete("/deleteSlider",rolehandler.grantAccess("deleteOwn", "profile"),deleteSlider);
router.get("/getSliderById",rolehandler.grantAccess("readOwn", "profile"),getSliderById);
//     Page SetUp Apis

router.get("/getPageSetUp",rolehandler.grantAccess("readOwn", "profile"),getpageSetUp);
router.post("/createPageSetUp",rolehandler.grantAccess("readOwn", "profile"),createPageSetUp);
router.put("/updatePageSetUp",rolehandler.grantAccess("updateOwn", "profile"),updatePageSetUp);
module.exports = router;

// Apis of banner for SuperAdmin
router.get("/getAllBannerData",rolehandler.grantAccess("readOwn", "profile"),getAllBannerData);

