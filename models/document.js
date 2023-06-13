const mongoose= require("mongoose");
const Schema= mongoose.Schema;

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
    cb(null, `document/${file.originalname}`)
  },
  });

 const uploadData =
    multer({
      storage: s3Storage,
    });
exports.uploadDocument = uploadData.single("image")

const DocumentSchema= new Schema({
    fileBrowser: {type: String},
    fileName: {type: String},
    fileViewed: {type: String},
    employee: {type: String},
    folderName: {type: String},
    fileDescription: {type: String},
    toview: {type: String},
    toDownload: {type: String},
},
{
    timestamps: true,
    collection: "Document",
  }
)
module.exports= mongoose.model("Document",DocumentSchema)