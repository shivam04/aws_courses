import { Amplify } from 'aws-amplify';
import { SignInOutput, fetchAuthSession, signIn } from '@aws-amplify/auth';
import { AuthStack } from '../../../space-finder/outputs.json'
import { CognitoIdentityClient } from '@aws-sdk/client-cognito-identity';
import { fromCognitoIdentityPool } from '@aws-sdk/credential-providers';

const awsRegion = 'ap-south-1';

Amplify.configure({
    Auth: {
      Cognito: {
        userPoolId: AuthStack.SpaceUserPoolId,
        userPoolClientId: AuthStack.SpaceUserPoolClientId,
        identityPoolId: AuthStack.SpaceIdentityPoolId
      },
    },
});

export class AuthService {
    
    private user: SignInOutput | undefined;
    private userName: string = '';
    private jwtToken: string | undefined;
    private temporaryCredentials: object | undefined;

    public async login(userName: string, password: string):Promise<Object | undefined> {
        try {
            const signInOutput: SignInOutput = await signIn({
                username: userName,
                password: password,
                options: {
                    authFlowType: 'USER_PASSWORD_AUTH'
                }
            });
            
            this.user = signInOutput;
            this.userName = userName;
            console.log(this.user);
            await this.generateIdToken();
            return this.user;
        } catch (error) {
            console.error(error);
            return undefined;
        }
    }

    private async generateIdToken() {
        this.jwtToken = (await fetchAuthSession()).tokens?.idToken?.toString();
    }

    private async generateTemporaryCredentials() {
        const cognitoIdentityPool = `cognito-idp.${awsRegion}.amazonaws.com/${AuthStack.SpaceUserPoolId}`
        const cognitoIdentity = new CognitoIdentityClient({
            credentials: fromCognitoIdentityPool({
                clientConfig: {
                    region: awsRegion
                },
                identityPoolId: AuthStack.SpaceIdentityPoolId,
                logins: {
                    [cognitoIdentityPool]: this.jwtToken!
                }
            })
        });

        this.temporaryCredentials = await cognitoIdentity.config.credentials();
    }

    public getIdToken() {
        return this.jwtToken;
    }

    public getUserName(){
        return this.userName;
    }

    public async getTemporaryCredentials() {
        if (!this.temporaryCredentials) {
            await this.generateTemporaryCredentials();
        }
        return this.temporaryCredentials;
    }

    public isAuthorized(){
        if (this.user) {
            console.log(true);
            return true;
        }
        console.log(false);
        return false;
    }
}