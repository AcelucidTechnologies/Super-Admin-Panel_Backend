const Image = require("../models/image");
const path = require("path");
const multer = require("multer");
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads/");
    },
    filename: function (req, file, cb) {
        let ext = path.extname(file.originalname);
        cb(null, Date.now() + ext);
    },
});

const upload = multer({
    storage: storage,
});
exports.upload = upload.single("imagefile")
exports.uploadimage = (req, res, next) => {
    Image.insertMany(
        {
            image: req.file.path,
        },
        { new: true },
        (err, doc) => {
            console.log(doc);
            if (err) throw err;
            else {
                res.json(doc);
            }
        }
    );
};