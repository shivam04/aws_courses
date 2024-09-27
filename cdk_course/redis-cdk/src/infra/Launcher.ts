import { App } from 'aws-cdk-lib';
import { RedisStack } from './stacks/RedisStack';

const app = new App();
new RedisStack(app, 'RedisStack');