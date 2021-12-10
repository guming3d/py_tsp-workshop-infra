#!/usr/bin/env node
import * as cdk from '@aws-cdk/core';
import { PyTspWorkshopInfraStack } from '../lib/py_tsp-workshop-infra-stack';

const app = new cdk.App();

const vpcId = app.node.tryGetContext('vpcId');
const env = vpcId ? {
  account: process.env.CDK_DEFAULT_ACCOUNT,
  region: process.env.CDK_DEFAULT_REGION,
} : undefined;

new PyTspWorkshopInfraStack(app, 'PyTspWorkshopInfraStack',
    {
        env: env
    }
);
