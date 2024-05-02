package com.annualreportsystem.mapper;

import com.annualreportsystem.model.AnnualReport;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

/**
* @author lenovo
* @description 针对表【annual_report(年报记录表)】的数据库操作Mapper
* @createDate 2024-05-01 16:10:56
* @Entity com.annualreportsystem.pojo.AnnualReport
*/
@Mapper
public interface AnnualReportMapper {

    int deleteByPrimaryKey(Long id);

    int insert(AnnualReport record);

    int insertSelective(AnnualReport record);

    AnnualReport selectByPrimaryKey(Long id);

    int updateByPrimaryKeySelective(AnnualReport record);

    int updateByPrimaryKey(AnnualReport record);

    List<AnnualReport> selectByUid(int i);
}
