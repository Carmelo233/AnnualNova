package com.annualreportsystem.model.vo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AnnualReportVO {
    private Integer id;
    private String reportName;
    private Date createTime;
}
