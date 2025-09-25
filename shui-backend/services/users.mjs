import { docClient } from "./client.mjs";
import { GetCommand, PutCommand } from "@aws-sdk/lib-dynamodb";
import { hashPassword } from "../utils/bcrypt.mjs";

export const addUser = async (user) => {
  console.log(user);

  const existingUser = await getUser(user.username);
  if (existingUser) {
    console.log(`User already exists`);
    return { success: false, message: `User already exists` };
  }
  try {
    const item = {
      PK: `USER#${user.username}`,
      SK: `PROFILE`,
      username: user.username,
      email: user.email,
      password: await hashPassword(user.password),
      role: user.role || "USER",
    };

    const command = new PutCommand({
      TableName: "shui-table",
      Item: item,
    });

    await docClient.send(command);
    return { success: true, user: item };
  } catch (error) {
    console.log("ERROR in db:", error.message);
    throw new Error("Could not create user");
  }
};

export const getUser = async (username) => {
  try {
    const command = new GetCommand({
      TableName: "shui-table",
      Key: {
        PK: `USER#${username}`,
        SK: `PROFILE`,
      },
    });

    const { Item } = await docClient.send(command);
    if (!Item) return false;
    console.log(Item);
    return Item || null;
  } catch (error) {
    console.log("ERROR in db:", error.message);
    throw new Error("Could not fetch user");
  }
};
