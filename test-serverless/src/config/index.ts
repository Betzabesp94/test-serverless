import dotenv from 'dotenv';
import dotenvExpand from 'dotenv-expand';
import path from 'path';
import { ConfigSchema } from './types';

// Function to load environment files based on priority
function loadEnvFiles(stage: string) {
  function getEnvFilePriority(stage: string): string[] {
    return [
      `.env`,
      `.secret.env`,
      `${stage}.secret.env`,
      `${stage}.env`,
      `shared/defaults.secret.env`,
      `shared/defaults.env`,
    ];
  }

  const envFilesLogicalPaths = getEnvFilePriority(stage);
  const paths = envFilesLogicalPaths.map((envFilesLogicalPath) => {
    return path.resolve('envfiles', envFilesLogicalPath);
  });

  paths.forEach((filePath) => {
    const result = dotenv.config({ path: filePath });
    if (result.error) {
      console.warn('[WARN]', result.error.message);
      return;
    }
    dotenvExpand.expand(result);
  });
}

// Load environment variables from the correct folder
loadEnvFiles(process.env.NODE_ENV || '');

// Validate and parse the environment variables
const parsedConfig = ConfigSchema.safeParse(process.env);

if (!parsedConfig.success) {
  const formattedErrors = JSON.stringify(parsedConfig.error.format(), null, 2);
  console.error('Invalid environment variables detected:', formattedErrors);
  throw new Error(
    `Environment variable validation failed. Please check the following issues:\n${formattedErrors}`,
  );
}

// Export the validated configuration
export const config = parsedConfig.data;
