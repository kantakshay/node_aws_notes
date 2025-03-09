const { S3Client,  PutBucketPolicyCommand } = require("@aws-sdk/client-s3");
require("dotenv").config();

const s3 = new S3Client({
    region: "ap-south-1",
    credentials:{
        accessKeyId: process.env.ACCESS_KEY_ID,
        secretAccessKey:process.env.SECRET_ACCESS_KEY
    }
})


async function setBucketPolicy(bucketName) {
    try {
        const bucketPolicy = {
            Version: "2012-10-17",
            Statement: [
                {
                    Sid: "PublicReadGetObject",
                    Effect: "Allow",
                    "Principal": "*",
                    "Action": "s3:*",
                    Resource: `arn:aws:s3:::${bucketName}/*`,
                },
            ],
        };

        const params = {
            Bucket: bucketName,
            Policy: JSON.stringify(bucketPolicy),
        };

        const command = new PutBucketPolicyCommand(params);
        await s3.send(command);
        console.log("Bucket policy applied successfully.");
    } catch (error) {
        console.error("Error setting bucket policy:", error);
    }
}

setBucketPolicy("my-new-bucket-from-nodejs"); // Apply the policy to your bucket
