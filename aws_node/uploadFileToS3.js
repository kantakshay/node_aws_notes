const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');
const fs = require('fs');
require("dotenv").config()


const s3 = new S3Client({
    region: "ap-south-1",
    credentials:{
        accessKeyId: process.env.ACCESS_KEY_ID,
        secretAccessKey:process.env.SECRET_ACCESS_KEY
    }
})



const uploadFile = async () => {

    const filePath = './myFIle.txt';
    const bucketName = "iamtestaccess-qwerty"


    const uploadParams = {
        Bucket: bucketName,
        Key: 'file.txt',
        Body: fs.createReadStream(filePath)
      };
    
      try {
        const data = await s3.send(new PutObjectCommand(uploadParams));
        console.log('File uploaded successfully:', data);
      } catch (err) {
        console.error('Error uploading file:', err);
      }
    };
    
    uploadFile();


    