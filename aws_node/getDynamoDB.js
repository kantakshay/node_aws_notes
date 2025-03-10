const { DynamoDBClient, GetItemCommand } = require('@aws-sdk/client-dynamodb');
require("dotenv").config();

// Create a DynamoDB client
const ddbClient = new DynamoDBClient({
  region: 'ap-south-1', // Your AWS region
  credentials: {
    accessKeyId: process.env.ACCESS_KEY_ID,
     secretAccessKey:process.env.SECRET_ACCESS_KEY
  },
});

async function getItem() {
  const params = {
    TableName: 'todoTable',
    Key: {
      'id': { S: '1' }, // Replace with your key and value
    },
  };

  const command = new GetItemCommand(params);

  try {
    const data = await ddbClient.send(command);
    if (data.Item) {
      console.log('Item found:', data.Item);
    } else {
      console.log('Item not found');
    }
  } catch (error) {
    console.error('Error reading item:', error);
  }
}

getItem();
