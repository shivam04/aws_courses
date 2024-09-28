package com.awstutorial;

import java.nio.file.Path;

import software.amazon.awssdk.awscore.AwsClient;
import software.amazon.awssdk.regions.Region;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.GetObjectRequest;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;

/**
 * Hello world!
 *
 */
public class App 
{
    private static final String BUCKET = "shvmsnha-demo";
    public static void main( String[] args )
    {
        try(S3Client client = S3Client.builder().region(Region.AP_SOUTH_1).build()) {
            PutObjectRequest putRequest = PutObjectRequest.builder()
                .bucket(BUCKET)
                    .key("public/hello.txt")
                .build(); 
            // write
            client.putObject(putRequest, Path.of("hello.txt"));   
            GetObjectRequest getRequest = GetObjectRequest.builder()
                .bucket(BUCKET)
                    .key("public/02-aws.png")
                .build(); 
            client.getObject(getRequest, Path.of("aws.png"));
        }
    }
}
