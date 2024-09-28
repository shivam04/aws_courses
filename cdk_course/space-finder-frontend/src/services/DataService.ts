import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { AuthService } from "./AuthService";
import { DataStack, ApiStack } from "../../../space-finder/outputs.json";
import { SpaceEntry } from "../components/model/model";

const spacesUrl = ApiStack.SpacesAPiEndpoint5876A844 + 'spaces';

export class DataService {

    private authService: AuthService;
    private s3Client: S3Client | undefined;
    private awsRegion = 'ap-south-1';

    constructor(authService: AuthService) {
        this.authService = authService;
    }

    public async createSpace(name: string, location:string, photo?: File){
        const space = {} as any;
        space.name = name;
        space.location = location;
        if (photo) {
            const uploadUrl = await this.uploadPublicFile(photo);
            space.photoUrl = uploadUrl;
        }
        const postResult = await fetch(spacesUrl, {
            method: 'POST',
            body: JSON.stringify(space),
            headers: {
                'Authorization': this.authService.getIdToken()!
            }
        });
        const postResultJSON = await postResult.json();
        console.log(postResultJSON);
        return postResultJSON.id;
    }

    private async uploadPublicFile(file: File) {
        const credentials = await this.authService.getTemporaryCredentials();
        console.log(credentials);
        if (!this.s3Client) {
            this.s3Client = new S3Client({
                credentials: credentials as any,
                region: this.awsRegion
            });
        }

        const command = new PutObjectCommand({
            Bucket: DataStack.SpaceFinderPhotosBucketName,
            Key: file.name,
            ACL:'public-read',
            Body: file
        });

        const result = await this.s3Client.send(command);
        console.log(result);
        return `https://${command.input.Bucket}.s3.${this.awsRegion}.amazonaws.com/${command.input.Key}`;
    }

    public reserveSpace(spaceId: string) {
        return `${spaceId}-123`;
    }

    public async getSpaces():Promise<SpaceEntry[]>{
        const getSpacesResult = await fetch(spacesUrl, {
            method: 'GET',
            headers: {
                'Authorization': this.authService.getIdToken()!
            }
        });
        const getSpacesResultJson = await getSpacesResult.json();
        return getSpacesResultJson;
    }

    public isAuthorized(){
        return this.authService.isAuthorized();
    }
}