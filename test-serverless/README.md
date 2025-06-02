<!--
title: 'Serverless Framework Node Express API on AWS'
description: 'This template demonstrates how to develop and deploy a simple Node Express API running on AWS Lambda using the Serverless Framework.'
layout: Doc
framework: v4
platform: AWS
language: nodeJS
priority: 1
authorLink: 'https://github.com/serverless'
authorName: 'Serverless, Inc.'
authorAvatar: 'https://avatars1.githubusercontent.com/u/13742415?s=200&v=4'
-->

# Serverless Framework Node Express API on AWS

This is a **Serverless Boilerplate** aimed to improve development by providing a ready-to-use template for building and deploying a Node.js Express API on AWS Lambda using the Serverless Framework. It simplifies the process of setting up a serverless application and accelerates development.

This template configures a single function, `api`, which handles all incoming requests using the `httpApi` event. The Express.js framework is used for routing and handling requests internally, with the help of the `serverless-http` package. For more details, refer to the [serverless-http README](https://github.com/dougmoscrop/serverless-http).

## Usage

### Quick Start

Install dependencies with:

```
npm install
```

To test locally run

```
serverless offline
```

if you want to deploy, first make sure you have your aws credentials set, if not follow the example of .env.example creating the .env and fill the variables

```
# Aws access key id
AWS_ACCESS_KEY_ID=EXAMPLEKEYID
# Aws secret key
AWS_SECRET_ACCESS_KEY=EXAMPLESECRETKEY
# Aws region
AWS_REGION=us-east-1
```

and then deploy with:

```
serverless deploy
```

After running deploy, you should see output similar to:

```
Deploying "test-serverless" to stage "dev" (us-east-1)

✔ Service deployed to stack test-serverless-dev (96s)

endpoint: ANY - https://xxxxxxxxxx.execute-api.us-east-1.amazonaws.com
functions:
  api: test-serverless-dev-api (2.3 kB)
```

_Note_: In current form, after deployment, your API is public and can be invoked by anyone. For production deployments, you might want to configure an authorizer. For details on how to do that, refer to [`httpApi` event docs](https://www.serverless.com/framework/docs/providers/aws/events/http-api/).

### Invocation

After successful deployment, you can call the created application via HTTP:

```
curl https://xxxxxxx.execute-api.us-east-1.amazonaws.com/
```

Which should result in the following response:

```json
{ "message": "Hello from root!" }
```

### Using Serverless Offline

For local development, you can use the `serverless-offline` plugin to emulate AWS Lambda locally. Follow these steps:

1. Start the local server:

   ```
   serverless offline
   ```

   This will start a local server that emulates your API. You can now make requests to `http://localhost:3000` (or the port specified in your configuration).

## Contribution Guidelines

We welcome contributions to this project! To contribute, please follow these steps:

1. Fork the repository and create a new branch for your feature or bug fix.
2. Make your changes and ensure that the code is properly formatted and linted.
3. Write tests for your changes, if applicable.
4. Submit a pull request with a clear description of your changes and the problem they solve.

## Environment Variables

This project uses environment variables to configure the application. Follow these steps to set them up:

1. **Environment Files Location**:

   - Most environment variables are set in the `/envfiles` folder.
   - The structure follows the convention `/envfiles/{stage}.env`, where `{stage}` represents the deployment stage (e.g., `development`, `production`).
   - Public variables should be defined in these `{stage}.env` files.

2. **Secrets Management**:

   - Secrets should follow the convention `/envfiles/{stage}.secret.env`.
   - These files are used to store sensitive information like API keys, database credentials, etc.

3. **AWS Credentials**:

   - In the root of the project, you can create a `.env` file to set up AWS credentials if you plan to deploy to AWS.
   - Follow the example provided in `.env.example`:
     ```bash
     # AWS access key ID
     AWS_ACCESS_KEY_ID=EXAMPLEKEYID
     # AWS secret access key
     AWS_SECRET_ACCESS_KEY=EXAMPLESECRETKEY
     # AWS region
     AWS_REGION=us-east-1
     ```

4. **Steps to Set Up**:

   - Copy the `.env.example` file to `.env` in the root directory:
     ```bash
     cp .env.example .env
     ```
   - Update the values in the `.env` file as needed for AWS credentials.
   - Add the appropriate `{stage}.env` and `{stage}.secret.env` files in the `/envfiles` folder for your specific stage.

5. **Automatic Loading**:
   - The application will automatically load these variables based on the stage specified in the `STAGE` environment variable.
   - For example, if `STAGE=development`, the application will load `/envfiles/development.env` and `/envfiles/development.secret.env`.

By following this structure, you can manage public and secret environment variables effectively while keeping sensitive information secure.

### Code of Conduct

Please adhere to the [Contributor Covenant Code of Conduct](https://www.contributor-covenant.org/version/2/0/code_of_conduct/) when contributing to this project.

Thank you for contributing!
