package com.annualreportsystem.mapper;

import com.annualreportsystem.model.AnalysisResult;
import org.apache.ibatis.annotations.Mapper;

/**
* @author lenovo
* @description 针对表【analysis_result(年报分析结果表)】的数据库操作Mapper
* @createDate 2024-05-01 17:33:44
* @Entity com.annualreportsystem.model.AnalysisResult
*/
@Mapper
public interface AnalysisResultMapper {

    int deleteByPrimaryKey(Long id);

    int insert(AnalysisResult record);

    int insertSelective(AnalysisResult record);

    AnalysisResult selectByPrimaryKey(Long id);

    int updateByPrimaryKeySelective(AnalysisResult record);

    int updateByPrimaryKey(AnalysisResult record);

    AnalysisResult selectByReportId(Integer reportId);
}
