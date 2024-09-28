import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { APIGatewayProxyEvent, APIGatewayProxyResult, Context } from "aws-lambda";
import { postSpaces } from "./PostSpaces";
import { getSpaces } from "./GetSpaces";
import { updateSpaces } from "./UpdateSpaces";
import { deleteSpaces } from "./DeleteSpaces";
import { JsonError, MissingFieldError } from "../shared/Validator";
import { addCorsHeader } from "../shared/Utils";
import { captureAWSv3Client, getSegment } from "aws-xray-sdk-core";

const ddbClient = captureAWSv3Client(new DynamoDBClient({}));

async function handler(event:APIGatewayProxyEvent, context: Context): Promise<APIGatewayProxyResult> {

    let response: APIGatewayProxyResult;
    const subSeg = getSegment().addNewSubsegment('MyLongCall')
    await new Promise(resolve => { setTimeout(resolve, 3000) });
    subSeg.close();

    const subSeg2 = getSegment().addNewSubsegment('MyShortCall')
    await new Promise(resolve =>{ setTimeout(resolve, 500)})
    subSeg2.close();

    try {
        switch (event.httpMethod) {
            case 'GET':
                const getResponse = await getSpaces(event, ddbClient);
                response = getResponse;
                console.log(getResponse);
                break;
            case 'POST':
                const postResponse = await postSpaces(event, ddbClient);
                response = postResponse;
                console.log(postResponse);
                break;
            case 'PUT':
                const putResponse = await updateSpaces(event, ddbClient);
                response = putResponse;
                console.log(putResponse);
                break;
            case 'DELETE':
                const deleteResponse = await deleteSpaces(event, ddbClient);
                response = deleteResponse;
                console.log(deleteResponse);
                break;
            default:
                return {
                    statusCode: 405,
                    body: JSON.stringify("Method Not Allowed!")
                };
        }
    } catch (error) {
        console.error(error);
        if (error instanceof MissingFieldError) {
            return {
                statusCode: 400,
                body: error.message
            }
        }

        if (error instanceof JsonError) {
            return {
                statusCode: 400,
                body: error.message
            }
        }

        return {
            statusCode: 500,
            body: error.message
        }
    }
    addCorsHeader(response);
    return response;
}

export { handler }