import { SNSEvent } from "aws-lambda";

const webHookUrl = 'https://hooks.slack.com/services/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';

async function handler(event: SNSEvent, context) {
    for (const record of event.Records) {
        await fetch(webHookUrl, {
            method: 'POST',
            body: JSON.stringify({
                "text": `Huston, we have a problem: ${record.Sns.Message}`
            })
        })
    }
}
export { handler }