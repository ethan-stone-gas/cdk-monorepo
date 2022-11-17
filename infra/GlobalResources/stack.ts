import { Stack, StackProps, App } from "aws-cdk-lib";
import { SubnetType, Vpc } from "aws-cdk-lib/aws-ec2";

type Props = StackProps;

export class GlobalResourcesStack extends Stack {
  public vpc: Vpc;

  constructor(scope: App, id: string, props: Props) {
    super(scope, id, props);

    this.vpc = new Vpc(this, "VPC", {
      maxAzs: 2,
      subnetConfiguration: [
        {
          name: `${id}-Private-NAT`,
          cidrMask: 20,
          subnetType: SubnetType.PRIVATE_WITH_EGRESS,
        },
        {
          name: `${id}-Public`,
          cidrMask: 20,
          subnetType: SubnetType.PUBLIC,
        },
      ],
    });
  }
}
