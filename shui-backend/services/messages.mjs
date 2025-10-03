import { DateTime } from "luxon";
import { generateId } from "../utils/generateId.mjs";
import { docClient } from "./client.mjs";
import { throwError } from "../responses/throwError.mjs";
import { DeleteCommand, GetCommand, PutCommand, QueryCommand, UpdateCommand } from "@aws-sdk/lib-dynamodb";

export const getMessages = async () => {
  const command = new QueryCommand({
    TableName: "shui-table",
    KeyConditionExpression: "PK = :pk",
    ExpressionAttributeValues: {
      ":pk": "MESSAGE",
    },
    ScanIndexForward: true,
  });
  try {
    const result = await docClient.send(command);
    return result.Items || [];
  } catch (error) {
    console.error(`${error.message} from getMessages`);
    throwError("Could not fetch messages", 500);
  }
};

export const getMessagesByUser = async (username) => {
  console.log("Querying messages for username:", username);
  const command = new QueryCommand({
    TableName: "shui-table",
    IndexName: "GSI1",
    KeyConditionExpression: "GSI1PK = :username",
    ExpressionAttributeValues: {
      ":username": `USER#${username}`,
    },
    ScanIndexForward: true,
  });

  try {
    const result = await docClient.send(command);
    console.log("DynamoDB result:", result.Items);
    return result.Items || [];
  } catch (error) {
    console.error(`Error fetching messages for user ${username}:`, error.message);
    throwError("Could not fetch messages for user", 500);
  }
};

// export const getMessagesByUser = async (username) => {
//   try {
//     const command = new QueryCommand({
//       TableName: "shui-table",
//       IndexName: "GSI1",
//       KeyConditionExpression: "GSI1PK= :username",
//       ExpressionAttributeValues: {
//         ":username": `USER#${username}`,
//       },
//       ScanIndexForward: true, // true innebär äldsta först
//     });

//     const result = await docClient.send(command);
//     return result.Items || [];
//   } catch (error) {
//     console.error(`Error fetching messages for user ${username}:`, error.message);
//     throwError("Could not fetch messages for user", 500);
//   }
// };

export const getMessageById = async (messageId) => {
  if (!messageId) throwError("Missing messageId", 400);
  console.log(`det här är messageId ${messageId}`);
  const command = new QueryCommand({
    TableName: "shui-table",
    IndexName: "GSI2",
    KeyConditionExpression: "GSI2PK = :pk AND GSI2SK = :sk",
    ExpressionAttributeValues: {
      ":pk": `MESSAGE#${messageId}`,
      ":sk": "MESSAGE", // baserat på din GSI2SK
    },
    Limit: 1,
  });

  try {
    const result = await docClient.send(command);
    const message = result.Items?.[0];

    if (!message) throwError("Message not found", 404);

    return message;
  } catch (error) {
    console.error("Error fetching message by ID:", error);
    throwError("Could not fetch message", 500);
  }
};

export const addMessage = async ({ username, text }) => {
  const messageId = generateId();
  const nowStockholm = DateTime.now().setZone("Europe/Stockholm");
  const createdAt = nowStockholm.toISO(); // ISO-sträng med svensk tid

  const item = {
    PK: "MESSAGE",
    SK: `CREATED_AT#${createdAt}`,
    messageId,
    username,
    text,
    createdAt,
    // För GSI1: hämta alla meddelanden från användare
    GSI1PK: `USER#${username}`,
    GSI1SK: `CREATED_AT#${createdAt}`,

    // För GSI2: hämta ett specifikt meddelande via ID
    GSI2PK: `MESSAGE#${messageId}`,
    GSI2SK: "MESSAGE",
  };

  const command = new PutCommand({
    TableName: "shui-table",
    Item: item,
  });

  try {
    await docClient.send(command);
    return { success: true, ...item };
  } catch (error) {
    console.error(`Error från db:`, error);
    throwError("Could not save message", 500);
  }
};

export const updateMessage = async (messageId, updateData) => {
  console.log(messageId, "is messageId", updateData);

  try {
    const command = new QueryCommand({
      TableName: "shui-table",
      IndexName: "GSI2",
      KeyConditionExpression: "GSI2PK = :pk",
      ExpressionAttributeValues: {
        ":pk": `MESSAGE#${messageId}`,
      },
      Limit: 1,
    });

    const result = await docClient.send(command);
    console.log("Query result:", result);
    const message = result.Items?.[0];
    if (!message) throwError("Message not found", 404);
    if (!message.PK || !message.SK) throwError("Missing PK or SK for update", 500);
    console.log("Updating message with key:", { PK: message.PK, SK: message.SK });

    const nowStockholm = DateTime.now().setZone("Europe/Stockholm");
    updateData.createdAt = nowStockholm.toISO();

    const updateCommand = new UpdateCommand({
      TableName: "shui-table",
      Key: {
        PK: message.PK,
        SK: message.SK,
      },
      UpdateExpression: "SET #text = :newText, #createdAt = :newCreatedAt",
      ExpressionAttributeNames: {
        "#text": "text",
        "#createdAt": "createdAt",
      },
      ExpressionAttributeValues: {
        ":newText": updateData.text,
        ":newCreatedAt": updateData.createdAt,
      },
      ReturnValues: "ALL_NEW",
    });

    const updateResult = await docClient.send(updateCommand);

    return { success: true, updatedMessage: updateResult.Attributes };
  } catch (error) {
    console.error("Error updating message:", error);
    if (error.statusCode) throw error;
    throwError("Could not update message", 500);
  }
};

export const deleteMessage = async (messageId) => {
  try {
    const command = new QueryCommand({
      TableName: "shui-table",
      IndexName: "GSI2",
      KeyConditionExpression: "GSI2PK = :pk",
      ExpressionAttributeValues: {
        ":pk": `MESSAGE#${messageId}`,
      },
      Limit: 1,
    });

    const result = await docClient.send(command);
    const message = result.Items?.[0];

    if (!message) throwError("Message not found", 404);

    const deleteCommand = new DeleteCommand({
      TableName: "shui-table",
      Key: {
        PK: message.PK,
        SK: message.SK,
      },
      ReturnValues: "ALL_OLD",
    });
    const deleteResult = await docClient.send(deleteCommand);

    return {
      success: true,
      deletedMessage: deleteResult.Attributes,
    };
  } catch (error) {
    console.error(`Error deleting message with id ${messageId}:`, error.message);
    throwError(`Could not delete message with id ${messageId}`, 500);
  }
};
