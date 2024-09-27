import { Stack, StackProps } from "aws-cdk-lib";
import { CfnReplicationGroup } from "aws-cdk-lib/aws-elasticache";
import { Construct } from "constructs";

export class RedisStack extends Stack {
    constructor(scope: Construct, id: string, props?: StackProps) {
        super(scope, id, props);

        const redisStack = new CfnReplicationGroup(this, 'RedisCluster', {
            replicationGroupDescription: 'Redis cluster with 2 masters and 2 replicas',
            cacheNodeType: "cache.t2.micro",
            automaticFailoverEnabled: true,
            engine: "redis",
            numNodeGroups: 2,
            replicasPerNodeGroup: 2,
            multiAzEnabled: true,
            securityGroupIds: ['sg-0726b4c1865b18aad']
        })

    }
}