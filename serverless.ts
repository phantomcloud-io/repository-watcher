import type { AWS } from '@serverless/typescript';

import repositoryWatcher from '@functions/repositoryWatcher';

const serverlessConfiguration: AWS = {
  service: 'github',
  frameworkVersion: '3',
  plugins: ['serverless-esbuild','serverless-offline'],
  provider: {
    name: 'aws',
    runtime: 'nodejs14.x',
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      NODE_OPTIONS: '--enable-source-maps --stack-trace-limit=1000',
      GITHUB_TOKEN: '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',
    },
  },
  // import the function via paths
  functions: { repositoryWatcher },
  package: { individually: true },
  custom: {
    esbuild: {
      bundle: true,
      minify: false,
      sourcemap: true,
      exclude: ['aws-sdk'],
      target: 'node14',
      define: { 'require.resolve': undefined },
      platform: 'node',
      concurrency: 10,
    },
  },
};

module.exports = serverlessConfiguration;
