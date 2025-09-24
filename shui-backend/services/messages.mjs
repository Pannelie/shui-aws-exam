import { generateId } from "../utils/generateId.mjs";
import { docClient } from "./client.mjs";
import { PutCommand } from "@aws-sdk/lib-dynamodb";

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
