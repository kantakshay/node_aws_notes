const { S3Client, CreateBucketCommand } = require("@aws-sdk/client-s3");
require("dotenv").config()




const s3 = new S3Client({
    region: "ap-south-1",
    credentials:{
        accessKeyId: process.env.ACCESS_KEY_ID,
        secretAccessKey:process.env.SECRET_ACCESS_KEY
    }
})

async function createBucket(bucketName) {
    try {
        const createBucketParams = {
            Bucket: bucketName, // Name of your S3 bucket
        };

        const command = new CreateBucketCommand(createBucketParams);
        const response = await s3.send(command);
        console.log("Bucket Created:", response.Location);
    } catch (error) {
        console.error("Error creating bucket:", error);
    }
}

createBucket("my-new-bucket-from-nodejs"); // Call with your bucket name
