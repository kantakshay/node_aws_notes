# AWS S3 bucket with node js

**Creating and configuring S3 buckets**

- Login in *AWS* console
- create a s3 bucket
- create a **IAM** user
- go to policies and provide access to s3 bucket
- then generate access keys

**Uploading and Downloading files from AWS S3 bucket using NODE JS**

 install AWS SDK on nodeJs app

---
     npm install @aws-sdk/client-s3


---
     npm install dotenv


 >   install dotenv to keep **AccessKeyId** and **secretAccessKey**








  **Nodejs code to upload a file**

  ```
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


    

```


 **Nodejs code to download a file**

  ```

const { S3Client, GetObjectCommand } = require('@aws-sdk/client-s3');
const fs = require('fs');
const path = require('path');
require("dotenv").config();

// Create an S3 client
const s3 = new S3Client({
  region: 'ap-south-1', 
  credentials:{
    accessKeyId: process.env.ACCESS_KEY_ID,
    secretAccessKey:process.env.SECRET_ACCESS_KEY
}
});

 

const params = {
  Bucket: 'iamtestaccess-qwerty',  // Your S3 bucket name
  Key: 'file.txt'  // The file key (path in the bucket)
};


const downloadFile = async () => {
  try {
    const { Body } = await s3.send(new GetObjectCommand(params));

    // Define the path to save the file locally
    const filePath = path.join(__dirname, 'downloaded-file.txt');

 
    const fileStream = fs.createWriteStream(filePath);


    Body.pipe(fileStream);

   
    fileStream.on('finish', () => {
      console.log(`File downloaded successfully to: ${filePath}`);
    });
  } catch (err) {
    console.error('Error downloading file:', err);
  }
};


downloadFile();


```

  


