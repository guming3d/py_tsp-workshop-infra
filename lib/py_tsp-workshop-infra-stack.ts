import * as ec2 from '@aws-cdk/aws-ec2';
import * as cdk from '@aws-cdk/core';
import {readFileSync} from 'fs';

export class PyTspWorkshopInfraStack extends cdk.Stack {
  constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const keyPair = new cdk.CfnParameter(this, 'keyPair', {
      description: 'ec2 keypair name',
      type: 'String',
    })

    // import default VPC
    const vpc = ec2.Vpc.fromLookup(this, 'my-default-vpc', {
      isDefault: true,
    });


    // create a security group for the EC2 instance
    const webserverSG = new ec2.SecurityGroup(this, 'webserver-sg', {
      vpc,
    });

    webserverSG.addIngressRule(
      ec2.Peer.anyIpv4(),
      ec2.Port.tcp(5000),
      'allow HTTP traffic from anywhere',
    );

    webserverSG.addIngressRule(
      ec2.Peer.anyIpv4(),
      ec2.Port.tcp(22),
      'allow ssh login from anywhere',
    );

    // create the EC2 instance
    const ec2Instance = new ec2.Instance(this, 'ec2-instance', {
      vpc,
      vpcSubnets: {
        subnetType: ec2.SubnetType.PUBLIC,
      },
      securityGroup: webserverSG,
      instanceType: ec2.InstanceType.of(
        ec2.InstanceClass.T2,
        ec2.InstanceSize.MICRO,
      ),
      machineImage: new ec2.AmazonLinuxImage({
        generation: ec2.AmazonLinuxGeneration.AMAZON_LINUX_2,
      }),
      keyName: keyPair.valueAsString
    });

    // 👇 load user data script
    const userDataScript = readFileSync('./lib/user-data.sh', 'utf8');

    // 👇 add user data to the EC2 instance
    ec2Instance.addUserData(userDataScript);
  }
}
 