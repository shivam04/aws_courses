import { handler } from "../src/services/spaces/handler";

process.env.AWS_REGION = "ap-south-1";
process.env.TABLE_NAME = "SpaceStack-0612cdabf1fd";

handler({
    httpMethod: 'POST',
    body: JSON.stringify({
        location: 'Kanpur'
    })
} as any, {} as any).then(result => {
    console.log(result);
})