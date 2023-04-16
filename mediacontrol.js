const AWS = require('aws-sdk')
const fs = require('fs')
// exports.imageUpload= async (filedata)=>{
//     const s3 = new AWS.S3({
//         accessKeyId: process.env.AWS_S3_ACCESS_KEY_ID,
//         secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY,
//       })
//     const imagePath = filedata.path
//     const blob = fs.readFileSync(imagePath)
//     const uploadedImage = await s3.upload({
//         Bucket: process.env.AWS_S3_BUCKET_NAME,
//         Key:filedata.originalname,
//         ContentType: 'image/jpeg',
//         ACL:'public-read',
//         Body: blob,
//       }).promise().catch(err=>{
//         console.log(err)
//       })
//       console.log(uploadedImage.Location)
//       return uploadedImage.Location
// }

exports.imageDelete= async (filedata)=>{
    const s3 = new AWS.S3({
        accessKeyId: process.env.AWS_S3_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY,
      })
    const deletedImage = await s3.deleteObject({
        Bucket: process.env.AWS_S3_BUCKET_NAME,
        Key:filedata
      }).promise().catch(err=>{
        console.log(err)
      })
      console.log(deletedImage)
      return (deletedImage.DeleteMarker)
}

exports.listfiles= async ()=>{
    const s3 = new AWS.S3({
        accessKeyId: process.env.AWS_S3_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY,
      })
    const listedfiles = await s3.listObjects({
        Bucket: process.env.AWS_S3_BUCKET_NAME,
      }).promise().catch(err=>{
        console.log(err)
      })
      console.log(listedfiles)
}

exports.videoUpload= async (filedata)=>{
  // console.log(filedata)
  const s3 = new AWS.S3({
      accessKeyId: process.env.AWS_S3_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY,
    })
    console.log()
  const imagePath = filedata.path
  const blob = fs.readFileSync(imagePath)
  const uploadedVideo = await s3.upload({
      Bucket: process.env.AWS_S3_BUCKET_NAME,
      Key:filedata.originalname,
      Body: blob,
      ContentType: 'video/mp4',
      ACL:'public-read'
    }).promise().catch(err=>{
      console.log(err)
    })
    // console.log(uploadedVideo.Location)
    return uploadedVideo.Location
}

exports.videoDelete= async (filedata)=>{
  const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_S3_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY,
  })
const deletedVideo = await s3.deleteObject({
    Bucket: process.env.AWS_S3_BUCKET_NAME,
    Key:filedata
  }).promise().catch(err=>{
    console.log(err)
  })
  return deletedVideo.DeleteMarker
}
