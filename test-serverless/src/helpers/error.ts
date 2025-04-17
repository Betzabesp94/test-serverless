export const lambdaErrorHandler = (err: unknown) => {
  console.error('Error in lambdaErrorHandler', err);

  return {
    statusCode: 500,
    body: JSON.stringify({
      error: 'Internal Server Error',
      message: (err as Error).message || 'An unexpected error occurred',
    }),
  };
};
