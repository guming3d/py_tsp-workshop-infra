#!/usr/bin/env node
import * as cdk from '@aws-cdk/core';
import { PyTspWorkshopInfraStack } from '../lib/py_tsp-workshop-infra-stack';

const app = new cdk.App();
new PyTspWorkshopInfraStack(app, 'PyTspWorkshopInfraStack');
