package com.annualreportsystem.model;

import java.io.Serializable;
import java.util.Date;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * 年报分析结果表
 * @TableName analysis_result
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class AnalysisResult implements Serializable {
    /**
     * 分析结果 id
     */
    private Integer id;

    /**
     * 对应年报记录 id
     */
    private Integer reportId;

    /**
     * 财务信息摘要
     */
    private String financialAbstract;

    /**
     * 非财务信息摘要
     */
    private String nonFinancialAbstract;

    /**
     * 三因素法得分
     */
    private Double threeFactorScore;

    /**
     * 七因素法得分
     */
    private Double sevenFactorScore;

    /**
     * 情感分析得分
     */
    private Double emotionScore;

    /**
     * 综合得分
     */
    private Double comprehensiveScore;

    /**
     * 该分析结果是否被删除，用于后续清理或用户删除(0-未删除，1-已删除)
     */
    private Integer deleted;

    /**
     * 该结果生成状态(0--生成成功，1--生成失败)
     */
    private Integer status;

    /**
     * 分析结果创建时间
     */
    private Date createTime;

    private static final long serialVersionUID = 1L;
}