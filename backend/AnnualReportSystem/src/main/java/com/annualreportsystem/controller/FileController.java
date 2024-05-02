package com.annualreportsystem.controller;

import com.annualreportsystem.common.BaseResponse;
import com.annualreportsystem.common.ResultUtils;
import com.annualreportsystem.service.FileService;
import com.github.xiaoymin.knife4j.annotations.ApiOperationSupport;
import com.github.xiaoymin.knife4j.annotations.ApiSupport;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/v1/file")
@Api(tags = "文件管理")
public class FileController {

    @Autowired
    private FileService fileService;

    @ApiOperation("上传年报，上传成功后返回这份年报的 reportId，前端存储用于后续发请求")
    @ApiOperationSupport(author = "林裕松")
    @PostMapping("/upload")
    public BaseResponse<Integer> upload(@RequestParam("file") MultipartFile file) {
        return ResultUtils.success(fileService.upload(file));
    }

}
