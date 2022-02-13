# Repository Watcher - AWS Node.js Typescript

This project has been generated using the `aws-nodejs-typescript` template from the [Serverless framework](https://www.serverless.com/).

For detailed instructions, please refer to the [documentation](https://www.serverless.com/framework/docs/providers/aws/).

## Service Logic Flow


## Installation/deployment instructions

Depending on your preferred cloud provider, follow the instructions below to deploy your project.

> **Obtian GitHub OAuth Token**
- 


> **Configure AWS Access**
- AWS Credentials [cli-configuration](https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-quickstart.html)

> **Deploy to AWS**
- Run `npm i` to install the project dependencies
- Run `npx sls deploy` to deploy this stack to AWS
- Take the resulting endpoint for your newly created lambda function 
    Example: 
        endpoint: POST - https://akqiz1cume.execute-api.us-east-1.amazonaws.com/dev/repositoryWatcher

> **Github Webhook**
Create the Github webhook to send to our function endpoint.

Navigate to a repository where you're an owner or an admin. Click "Settings" at the top, then the "Webhooks" tab on the left hand side. Then, click the "Add webhook button".

In the Add webhook screen, enter your function endpoint (obtained in the step above) into the Payload URL input box and choose application/json as the Content Type:

Click the "Let me select individual events" option, then choose the "Repository" event near the bottom of the list.

> **Requirements**: 
NodeJS `lts/fermium (v.14.15.0)`. 
If you're using [nvm](https://github.com/nvm-sh/nvm), run `nvm use` to ensure you're using the same Node version in local and in your lambda's runtime.

## Test your service

This template contains a single lambda function triggered by an HTTP request made on the provisioned API Gateway REST API `/repositoryWatcher` route with `POST` method. The request body must be provided as `application/json`. The body structure is tested by API Gateway against `src/functions/repositoryWatcher/schema.ts` JSON-Schema definition: it must contain the `name` property.

- requesting any other path than `/repositoryWatcher` with any other method than `POST` will result in API Gateway returning a `403` HTTP error code
- sending a `POST` request to `/repositoryWatcher` with a payload **not** containing a string property named `name` will result in API Gateway returning a `400` HTTP error code
- sending a `POST` request to `/repositoryWatcher` with a payload containing a string property named `name` will result in API Gateway returning a `200` HTTP status code with a message saluting the provided name and the detailed event processed by the lambda

> :warning: As is, this template, once deployed, opens a **public** endpoint within your AWS account resources. Anybody with the URL can actively execute the API Gateway endpoint and the corresponding lambda. You should protect this endpoint with the authentication method of your choice.

### Project structure

The project code base is mainly located within the `src` folder. This folder is divided in:

- `functions` - containing code base and configuration for your lambda functions
- `libs` - containing shared code base between your lambdas

```
.
├── src
│   ├── functions               # Lambda configuration and source code folder
│   │   ├── repositoryWatcher
│   │   │   ├── handler.ts      # `Hello` lambda source code
│   │   │   ├── index.ts        # `Hello` lambda Serverless configuration
│   │   │   ├── mock.json       # `Hello` lambda input parameter, if any, for local invocation
│   │   │   └── schema.ts       # `Hello` lambda input event JSON-Schema
│   │   │
│   │   └── index.ts            # Import/export of all lambda configurations
│   │
│   └── libs                    # Lambda shared code
│       └── apiGateway.ts       # API Gateway specific helpers
│       └── handlerResolver.ts  # Sharable library for resolving lambda handlers
│       └── lambda.ts           # Lambda middleware
│
├── package.json
├── serverless.ts               # Serverless service file
├── tsconfig.json               # Typescript compiler configuration
├── tsconfig.paths.json         # Typescript paths
└── webpack.config.js           # Webpack configuration
```

### 3rd party libraries

- [json-schema-to-ts](https://github.com/ThomasAribart/json-schema-to-ts) - uses JSON-Schema definitions used by API Gateway for HTTP request validation to statically generate TypeScript types in your lambda's handler code base
- [middy](https://github.com/middyjs/middy) - middleware engine for Node.Js lambda. This template uses [http-json-body-parser](https://github.com/middyjs/middy/tree/master/packages/http-json-body-parser) to convert API Gateway `event.body` property, originally passed as a stringified JSON, to its corresponding parsed object
- [@serverless/typescript](https://github.com/serverless/typescript) - provides up-to-date TypeScript definitions for your `serverless.ts` service file

### Advanced usage

Any tsconfig.json can be used, but if you do, set the environment variable `TS_NODE_CONFIG` for building the application, eg `TS_NODE_CONFIG=./tsconfig.app.json npx serverless webpack`




