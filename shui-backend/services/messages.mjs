import { generateId } from "../utils/generateId.mjs";
import { docClient } from "./client.mjs";
import { throwError } from "../responses/throwError.mjs";
import { DeleteCommand, PutCommand, QueryCommand, UpdateCommand } from "@aws-sdk/lib-dynamodb";

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
    throw new Error("Could not fetch messages");
  }
};

export const getMessagesByUser = async (username) => {
  try {
    const command = new QueryCommand({
      TableName: "shui-table",
      IndexName: "GSI1",
      KeyConditionExpression: "GSI1PK= :username",
      ExpressionAttributeValues: {
        ":username": `USER#${username}`,
      },
      ScanIndexForward: true, // true innebär äldsta först
    });

    const result = await docClient.send(command);
    return result.Items || [];
  } catch (error) {
    console.error(`Error fetching messages for user ${username}:`, error.message);
    throwError("Could not fetch messages for user", 500);
  }
};

export const addMessage = async ({ username, text }) => {
  const messageId = generateId();
  const createdAt = new Date().toISOString();

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
    return { success: false, message: `Error saving booking: ${error.message}` };
  }
};

export const updateMessage = async (messageId, updateData) => {
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
    if (!message) {
      throwError("Message not found", 404);
    }

    const updateCommand = new UpdateCommand({
      TableName: "shui-table",
      Key: {
        PK: message.PK,
        SK: message.SK,
      },
      UpdateExpression: "SET #text = :newText",
      ExpressionAttributeNames: {
        "#text": "text",
      },
      ExpressionAttributeValues: {
        ":newText": updateData.text,
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

    if (!message) {
      throwError("Message not found", 404);
    }

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
    return {
      success: false,
      message: `Error deleting message: ${error.message}`,
    };
  }
};
