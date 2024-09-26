import * as cdk from 'aws-cdk-lib';
import { Bucket, CfnBucket } from 'aws-cdk-lib/aws-s3';
import { Construct } from 'constructs';

export class PhotosStack extends cdk.Stack {
    constructor(scope: Construct, id: string, props?: cdk.StackProps) {
        super(scope, id, props);

        /**
         * Create new resource.
         * delete the old one
         */
        const myBucket = new Bucket(this, 'PhotosBucket2', {
            bucketName: 'photosbucket-ddsf4435'
        });
        (myBucket.node.defaultChild as CfnBucket).overrideLogicalId('PhotosBucket2atdrf2564');
    }
}