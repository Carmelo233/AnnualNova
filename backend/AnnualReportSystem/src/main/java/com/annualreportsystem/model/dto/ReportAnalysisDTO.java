package com.annualreportsystem.model.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * 年报分析消息
 */
@Data
@NoArgsConstructor
public class ReportAnalysisDTO {
    /**
     * 年报 id
     */
    private Integer id;

    /**
     * 上传该份年报的用户 id
     */
    private Integer uid;

    /**
     * 文件存储 url(可以是本地也可以是云)
     */
    private String fileUrl;

    /**
     * 年报记录创建时间，用于排序
     */
    private String createTime;
}
