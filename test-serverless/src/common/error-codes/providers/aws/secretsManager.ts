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
    logger.info('Logs variables', { isOffline: process.env.IS_OFFLINE, OFFLINE_AWS_REGION: process.env.OFFLINE_AWS_REGION, JWT_SECRET: process.env.JWT_SECRET });

     if (process.env.IS_OFFLINE === 'true') { 
    logger.info('Processing inline secret', { secretId });
    
    // Get the actual secret value from environment variable
    const secretValue = secretId;
    logger.info('Secret value from env', { secretValue });
    
    if (!secretValue) {
      logger.info('No secret value found in environment');
      return 'not-found';
    }
    
    const match = /^inline:(?<value>.*)$/.exec(secretValue);
    logger.info('Regex match result', { match: match ? match[0] : null, groups: match?.groups });
    if (match && match.groups && match.groups.value) {
      logger.info('Secret value extracted', { value: match.groups.value });
      return match.groups.value;
    } else {
      // ToDo: Tendria que tirar un error en vez de vacio, sino no se sabe distinguir del caso donde el secreto tiene el string vacio del caso donde no existe el secreto
      logger.info('No match found, returning not-found');
      return '';
    }
     }
      const client = getSecretsManagerClient();
    try {
      logger.debug('Retrieving secret from Secrets Manager', { secretId });
      const response = await client.send(
        new GetSecretValueCommand({ SecretId: secretId }),
      );
      logger.debug('Secret retrieved from Secrets Manager', { secretId });
      if (response.SecretString === undefined) {
        throw new Error('Not process.envured secret');
      }
      
      // Parse the JSON string and extract the value
      try {
        const secretObject = JSON.parse(response.SecretString);
        // Get the first value from the object (assuming it's a key-value pair)
        const secretValue = Object.values(secretObject)[0];
        logger.debug('Secret value extracted', { secretValue });
        return secretValue as string;
      } catch (parseError) {
        // If it's not JSON, return the raw string
        logger.debug('Secret is not JSON, returning raw string');
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
  