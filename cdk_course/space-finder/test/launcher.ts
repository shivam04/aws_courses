import { handler } from "../src/services/spaces/handler";

process.env.AWS_REGION = "ap-south-1";
process.env.TABLE_NAME = "SpaceStack-0612cdabf1fd";

handler({
    httpMethod: 'GET',
    queryStringParameters: {
        id: 'b1f44239-21a7-4d52-b06f-1071eae85442'
    }
} as any, {} as any);