export const lambdaResponse = (statusCode: number, body: object) => ({
  statusCode,
  body: JSON.stringify(body),
});
