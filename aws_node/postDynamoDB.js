const { DynamoDBClient, PutItemCommand } = require('@aws-sdk/client-dynamodb');
require("dotenv").config();

// Create a DynamoDB client
const ddbClient = new DynamoDBClient({
  region: 'ap-south-1', // Your AWS region
  credentials: {
    accessKeyId: process.env.ACCESS_KEY_ID,
     secretAccessKey:process.env.SECRET_ACCESS_KEY
  },
});
 console.log(process.env.ACCESS_KEY_ID,"  ", process.env.SECRET_ACCESS_KEY);
 
async function putItem() {
  const params = {
    TableName: 'todoTable',
    Item: {
      'id': { S: '2' }, // The partition key - 'id' with a string value
      'task': { S: 'lets create dynmodb' },   // Another attribute in the table (replace with your actual attribute names/values)
      'disc': { S: 'excited to learn dynmo db' },      // Another attribute (replace with your actual attribute names/values)
    },
  };

  const command = new PutItemCommand(params);

  try {
    const data = await ddbClient.send(command);
    console.log('Item successfully written:', data);
  } catch (error) {
    console.error('Error writing item:', error);
  }
}

putItem();
