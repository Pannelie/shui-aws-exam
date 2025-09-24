export const sendResponse = (code, data) => {
  return {
    statusCode: code,
    body: JSON.stringify({
      ...data,
    }),
  };
};

export const formatMessageResponse = (item) => {};
