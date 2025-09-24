import { generateId } from "../utils/generateId.mjs";
import { docClient } from "./client.mjs";
import { PutCommand, QueryCommand } from "@aws-sdk/lib-dynamodb";

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
