package com.annualreportsystem.service.impl;

import com.annualreportsystem.mapper.AnnualReportMapper;
import com.annualreportsystem.model.AnnualReport;
import com.annualreportsystem.model.dto.ReportAnalysisDTO;
import com.annualreportsystem.mq.LocalMessageQueue;
import com.annualreportsystem.service.FileService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.util.UUID;

@Service
@Slf4j
public class FileServiceImpl implements FileService {
    @Autowired
    private AnnualReportMapper annualReportMapper;
    @Autowired
    private LocalMessageQueue<ReportAnalysisDTO> localMessageQueue;

    @Override
    public Integer upload(MultipartFile file) {
        // todo 用策略模式实现上传到本地和上传到 OSS 的切换
        // todo 开发时文件关联用户都是 id = 1 的开发用户

        // 将文件保存到本地
        // 获取当前工作目录
        String workDir =  System.getProperty("user.dir");
        // 拼接文件上传目录
        String uploadDir = workDir + File.separator + "upload";
        // 判断文件夹是否存在，若不存在则创建
        File uploadFolder = new File(uploadDir);
        if (!uploadFolder.exists()) {
            uploadFolder.mkdirs();
        }

        // 获取文件扩展名
        String originalFilename = file.getOriginalFilename();
        String fileExtension = originalFilename.substring(originalFilename.lastIndexOf("."));
        // 随机生成文件名
        String fileName = UUID.randomUUID() + fileExtension;
        String filePath = uploadDir + File.separator + fileName;
        // 将文件保存到本地
        try {
            file.transferTo(new File(filePath));
            log.info("文件保存成功");
        } catch (Exception e) {
            log.error("文件保存失败", e);
            throw new RuntimeException("文件保存失败");
        }

        // 若保存成功则向数据库插入记录
        AnnualReport annualReport = AnnualReport.builder().reportName(originalFilename)
                .fileUrl(originalFilename.substring(0, originalFilename.lastIndexOf(".")))
                .uid(1) // todo 设为 1
                .build();
        // 插入数据库
        annualReportMapper.insertSelective(annualReport);

        // 将任务提交到消息队列
        ReportAnalysisDTO reportAnalysisDTO = new ReportAnalysisDTO();
        BeanUtils.copyProperties(annualReport, reportAnalysisDTO);
        localMessageQueue.enqueue(reportAnalysisDTO);
        log.info("任务提交到消息队列");

        // 返回文件 id
        return annualReport.getId();
    }
}
