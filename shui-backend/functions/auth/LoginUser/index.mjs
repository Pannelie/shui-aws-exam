import middy from "@middy/core";
import httpJsonBodyParser from "@middy/http-json-body-parser";

export const handler = middy(async (event) => {}).use(httpJsonBodyParser);
