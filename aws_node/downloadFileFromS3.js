// Import the required classes from AWS SDK v3
const { S3Client, GetObjectCommand } = require('@aws-sdk/client-s3');
const fs = require('fs');
const path = require('path');
require("dotenv").config();

// Create an S3 client
const s3 = new S3Client({
  region: 'ap-south-1',  // Specify your region
  credentials:{
    accessKeyId: process.env.ACCESS_KEY_ID,
    secretAccessKey:process.env.SECRET_ACCESS_KEY
}
});

 
// Define the parameters for the S3 object
const params = {
  Bucket: 'iamtestaccess-qwerty',  // Your S3 bucket name
  Key: 'file.txt'  // The file key (path in the bucket)
};

// Function to download the file
const downloadFile = async () => {
  try {
    const { Body } = await s3.send(new GetObjectCommand(params));

    // Define the path to save the file locally
    const filePath = path.join(__dirname, 'downloaded-file.txt');

    // Create a writable stream to save the file locally
    const fileStream = fs.createWriteStream(filePath);

    // Pipe the S3 object to the local file
    Body.pipe(fileStream);

    // When the file has been successfully downloaded, log it
    fileStream.on('finish', () => {
      console.log(`File downloaded successfully to: ${filePath}`);
    });
  } catch (err) {
    console.error('Error downloading file:', err);
  }
};

// Call the function to download the file
downloadFile();
