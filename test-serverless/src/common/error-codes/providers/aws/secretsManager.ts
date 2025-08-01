import {
    SecretsManagerClient,
    GetSecretValueCommand,
  } from '@aws-sdk/client-secrets-manager';

  import { logger } from '@baselime/lambda-logger';
  
  const getSecretsManagerClient = (): SecretsManagerClient => {
    if (process.env.IS_OFFLINE === 'true') {
      if (!process.env.OFFLINE_AWS_REGION) {
        throw new Error(
          'Using local environment without a chosen remote service set',
        );
      }
      return new SecretsManagerClient({
        region: process.env.OFFLINE_AWS_REGION,
      });
    }
    return new SecretsManagerClient({
      maxAttempts: 3,
      requestHandler: {
        httpOptions: {
          timeout: 5000,
        },
      },
    });
  };
  
  /**
   * Retrieves a secret value from AWS Secrets Manager
   * @param secretId - The ID of the secret
   * @returns The secret string value, or undefined if not found
   */
  export const getSecret = async (secretId: string) => {
    if (process.env.IS_OFFLINE === 'true') { 
      const match = /^inline:(?<value>.*)$/.exec(secretId);
      if (match && match.groups && match.groups.value) {
        return match.groups.value;
      } else {
        return '';
      }
    }
    
    const client = getSecretsManagerClient();
    try {
      const response = await client.send(
        new GetSecretValueCommand({ SecretId: secretId }),
      );
      
      if (response.SecretString === undefined) {
        throw new Error('Not process.envured secret');
      }
      try {
        return JSON.parse(response.SecretString);
      } catch (error) {
        // Fallback to original value if JSON parsing fails
        return response.SecretString;
      }
    } catch (error) {
      logger.error(
        'Error retrieving secret from Secrets Manager:',
        error as Error,
      );
      throw error;
    } 
  };
  