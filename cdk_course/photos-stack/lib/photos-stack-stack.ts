import * as cdk from 'aws-cdk-lib';
import { Bucket } from 'aws-cdk-lib/aws-s3';
import { Construct } from 'constructs';
import { Fn } from 'aws-cdk-lib'

export class PhotosStack extends cdk.Stack {
  private stackSuffix: string;
  public readonly photosbucketArn: string;;

  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    this.initalizeSuffix();

    const photosBucket = new Bucket(this, 'PhotosBucket', {
      bucketName: `photos-bucket-${this.stackSuffix}`
    });

    this.photosbucketArn = photosBucket.bucketArn;

  }

  private initalizeSuffix() {
    const shortStackId = Fn.select(2, Fn.split('/', this.stackId));
    this.stackSuffix = Fn.select(4, Fn.split('-', shortStackId));
  }
}
