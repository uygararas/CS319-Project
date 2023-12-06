package com.example.CampusConnect.Services;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.DeleteObjectRequest;
import com.amazonaws.services.s3.model.PutObjectRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.UUID;

@Service
public class StorageService {
    private final AmazonS3 s3Client;

    @Autowired
    public StorageService (AmazonS3 s3Client) {
        this.s3Client = s3Client;
    }

   private final String BUCKET_NAME = "campusconnectbucket";

    public String uploadFile(MultipartFile file) throws IOException {
        // Check file type
        String contentType = file.getContentType();
        if (!"image/jpeg".equals(contentType) && !"image/png".equals(contentType)) {
            throw new IllegalArgumentException("Invalid file type. Only JPEG and PNG are allowed.");
        }

        // Check file size (5MB = 5 * 1024 * 1024 bytes)
        long maxSize = 5 * 1024 * 1024;
        if (file.getSize() > maxSize) {
            throw new IllegalArgumentException("File size exceeds limit. Maximum allowed size is 5MB.");
        }

        File fileObj = convertMultiPartFileToFile(file);
        String fileName = UUID.randomUUID() + "_" + file.getOriginalFilename();
        s3Client.putObject(new PutObjectRequest(BUCKET_NAME, fileName, fileObj));
        fileObj.delete();
        return s3Client.getUrl(BUCKET_NAME, fileName).toString();
    }

    private File convertMultiPartFileToFile(MultipartFile file) throws IOException {
        File convertedFile = new File(file.getOriginalFilename());
        try (FileOutputStream fos = new FileOutputStream(convertedFile)) {
            fos.write(file.getBytes());
        }
        return convertedFile;
    }

    public void deleteFile(String fileKey) {
        if (fileKey == null || fileKey.isEmpty()) {
            throw new IllegalArgumentException("Invalid file key.");
        }

        s3Client.deleteObject(new DeleteObjectRequest(BUCKET_NAME, fileKey));
    }
}

