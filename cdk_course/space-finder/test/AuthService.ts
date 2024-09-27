import { Amplify } from "aws-amplify";
import { SignInOutput, fetchAuthSession, signIn } from "@aws-amplify/auth";
import { CognitoIdentityClient } from "@aws-sdk/client-cognito-identity";
import { fromCognitoIdentityPool } from "@aws-sdk/credential-providers";

const awsRegion = 'ap-south-1';
Amplify.configure({
    Auth: {
        Cognito: {
            userPoolId: 'ap-south-1_StSiK91HJ',
            userPoolClientId: '4v2ue1p7nhgg07k7diph2uirlh',
            identityPoolId: 'ap-south-1:d0e72b46-6a27-40fc-ad8a-2ac76f885400'
        }
    }
});

export class AuthService {
    public async login(userName: string, password: string) {
        const signInOutput: SignInOutput = await signIn({
            username: userName,
            password: password,
            options: {
                authFlowType: 'USER_PASSWORD_AUTH'
            }
        });

        return signInOutput;
    }

    /**
     * Call only after login
     */
    public async getIdToken() {
        const authSession = await fetchAuthSession();
        return authSession.tokens?.idToken?.toString();
    }

    public async generateTemporaryCredentials() {
        const idToken = await this.getIdToken();
        const cognitoIdentityPool = `cognito-idp.${awsRegion}.amazonaws.com/ap-south-1_StSiK91HJ`
        const cognitoIdentity = new CognitoIdentityClient({
            credentials: fromCognitoIdentityPool({
                identityPoolId: 'ap-south-1:d0e72b46-6a27-40fc-ad8a-2ac76f885400',
                logins: {
                    [cognitoIdentityPool]: idToken
                }
            })
        });

        const credentials = await cognitoIdentity.config.credentials();
        return credentials;
    }
}