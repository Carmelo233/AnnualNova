package com.annualreportsystem.model.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ReportAnalysisResultDTO {
    private String financialAbstract;

    private String nonFinancialAbstract;

    private double threeFactorScore;

    private double sevenFactorScore;

    private double emotionScore;

    private double comprehensiveScore;
}
