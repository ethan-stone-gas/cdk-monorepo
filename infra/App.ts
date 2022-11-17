import { App } from "aws-cdk-lib";
import { GlobalResourcesStack } from "./GlobalResources/stack";
import { ServiceA } from "./ServiceA/stack";

const app = new App({});

const awsAccountId = process.env.CDK_DEFAULT_ACCOUNT || "";

const env = {
  account: awsAccountId,
  region: "us-east-1",
};

const resources = new GlobalResourcesStack(app, "GlobalResources", {
  env,
});

new ServiceA(app, "ServiceA", {
  env,
  vpc: resources.vpc,
});
