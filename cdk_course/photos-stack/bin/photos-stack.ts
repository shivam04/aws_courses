#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { PhotosStack } from '../lib/photos-stack-stack';
import { PhotosHandlerStack } from '../lib/PhotosHandlerStack';

const app = new cdk.App();
new PhotosStack(app, 'PhotosStack');
new PhotosHandlerStack(app, 'PhotosHandlerStack');