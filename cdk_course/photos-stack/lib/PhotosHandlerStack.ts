import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { Code, Function as LambdaFunction, Runtime } from 'aws-cdk-lib/aws-lambda';
import { Fn } from 'aws-cdk-lib';

interface PhotosHandlerStackProps extends cdk.StackProps {
  targetBuckerArn: string
}


export class PhotosHandlerStack extends cdk.Stack {

  constructor(scope: Construct, id: string, props: PhotosHandlerStackProps) {
    super(scope, id, props);

    new LambdaFunction(this, 'PhotosHandler', {
      runtime: Runtime.NODEJS_18_X,
      handler: 'index.handler',
      code: Code.fromInline(`
          exports.handler = async (event) => {
            console.log("hello!: " + process.env.TARGET_BUCKET);
          };
      `),
      environment: {
        TARGET_BUCKET: props.targetBuckerArn
      }
    });
  }
}
