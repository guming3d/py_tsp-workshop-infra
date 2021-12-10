#!/usr/bin/env node
import * as cdk from '@aws-cdk/core';
import { PyTspWorkshopInfraStack } from '../lib/py_tsp-workshop-infra-stack';

const app = new cdk.App();

const vpcId = app.node.tryGetContext('vpcId');
const env = {
  account: process.env.CDK_DEPLOY_ACCOUNT || process.env.CDK_DEFAULT_ACCOUNT, 
  region: process.env.CDK_DEPLOY_REGION || process.env.CDK_DEFAULT_REGION 
};

new PyTspWorkshopInfraStack(app, 'PyTspWorkshopInfraStack',
    {
        env: env
    }
);
