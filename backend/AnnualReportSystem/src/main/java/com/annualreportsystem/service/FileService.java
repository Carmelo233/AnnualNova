package com.annualreportsystem.service;

import org.springframework.web.multipart.MultipartFile;

public interface FileService {
    Integer upload(MultipartFile file);
}
