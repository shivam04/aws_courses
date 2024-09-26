import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { APIGatewayProxyEvent, APIGatewayProxyResult, Context } from "aws-lambda";
import { postSpaces } from "./PostSpaces";
import { getSpaces } from "./GetSpaces";
import { updateSpaces } from "./UpdateSpaces";
import { deleteSpaces } from "./DeleteSpaces";
import { JsonError, MissingFieldError } from "../shared/Validator";

const ddbClient = new DynamoDBClient({});

async function handler(event:APIGatewayProxyEvent, context: Context): Promise<APIGatewayProxyResult> {

    let message: string;

    try {
        switch (event.httpMethod) {
            case 'GET':
                const getResponse = await getSpaces(event, ddbClient);
                console.log(getResponse);
                return getResponse;
            case 'POST':
                const postResponse = await postSpaces(event, ddbClient);
                console.log(postResponse);
                return postResponse;
            case 'PUT':
                const putResponse = await updateSpaces(event, ddbClient);
                console.log(putResponse);
                return putResponse;
            case 'DELETE':
                const deleteResponse = await deleteSpaces(event, ddbClient);
                console.log(deleteResponse);
                return deleteResponse;
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
}

export { handler }