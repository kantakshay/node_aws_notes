# DynamoDb

> Amazon DynamoDB is a fully managed, serverless, NoSQL database service provided by AWS.
>  It is designed to handle large-scale, low-latency applications such as web, mobile, gaming, IoT,
>  and other real-time applications.

**Post data using nodejs to Dynamo db**

```
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
 
async function postItem() {
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

postItem();


```



**Get data from dynamoDb using Nodejs**


```
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

```
