import { App, Duration, Stack, StackProps } from "aws-cdk-lib";
import { NodejsFunction } from "aws-cdk-lib/aws-lambda-nodejs";
import { AutoScalingGroup } from "aws-cdk-lib/aws-autoscaling";
import { join } from "path";
import {
  AsgCapacityProvider,
  Cluster,
  ContainerImage,
  Ec2Service,
  Ec2TaskDefinition,
  EcsOptimizedImage,
  LogDriver,
  PlacementConstraint,
} from "aws-cdk-lib/aws-ecs";
import { InstanceType, SubnetType, Vpc } from "aws-cdk-lib/aws-ec2";

interface Props extends StackProps {
  vpc: Vpc;
}

export class ServiceA extends Stack {
  constructor(scope: App, id: string, props: Props) {
    super(scope, id, props);

    new NodejsFunction(this, "TestFunc", {
      entry: join(
        __dirname,
        "../../apps/service-a-functions/functions/hello.ts"
      ),
      handler: "main",
    });

    const asg = new AutoScalingGroup(this, "ASG", {
      vpc: props.vpc,
      machineImage: EcsOptimizedImage.amazonLinux2(),
      allowAllOutbound: true,
      associatePublicIpAddress: true,
      vpcSubnets: { subnetType: SubnetType.PUBLIC },
      instanceType: new InstanceType("t2.micro"),
      maxCapacity: 1,
      newInstancesProtectedFromScaleIn: false,
      cooldown: Duration.minutes(1),
    });

    const capacityProvider = new AsgCapacityProvider(
      this,
      "AsgCapacityProvider",
      {
        autoScalingGroup: asg,
        enableManagedTerminationProtection: false,
      }
    );

    const ecsCluster = new Cluster(this, "Cluster", {
      vpc: props.vpc,
    });

    ecsCluster.addAsgCapacityProvider(capacityProvider);

    const taskDefinition = new Ec2TaskDefinition(this, "TaskDef");

    taskDefinition.addContainer("Container", {
      image: ContainerImage.fromAsset(join(__dirname, "../../"), {
        file: "./infra/ServiceA/Dockerfile",
      }),
      memoryReservationMiB: 512,
    });
  }
}
