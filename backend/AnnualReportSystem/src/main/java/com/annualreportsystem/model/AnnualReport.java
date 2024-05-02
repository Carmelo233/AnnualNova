package com.annualreportsystem.model;

import java.io.Serializable;
import java.util.Date;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * 年报记录表
 * @TableName annual_report
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AnnualReport implements Serializable {
    /**
     * 年报 id
     */
    private Integer id;

    /**
     * 上传该份年报的用户 id
     */
    private Integer uid;

    /**
     * 年报名(文件名或提取的)
     */
    private String reportName;

    /**
     * 文件存储 url(可以是本地也可以是云)
     */
    private String fileUrl;

    /**
     * 该年报是否被删除，用于后续清理或用户删除(0--未删除，1--已删除)
     */
    private Integer deleted;

    /**
     * 该年报上传状态(0--上传成功，1--上传失败)
     */
    private Integer status;

    /**
     * 年报记录创建时间，用于排序
     */
    private Date createTime;

    private static final long serialVersionUID = 1L;
}