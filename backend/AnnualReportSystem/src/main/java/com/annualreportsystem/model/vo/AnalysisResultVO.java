package com.annualreportsystem.model.vo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AnalysisResultVO {
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
}
