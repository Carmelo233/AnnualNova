package com.annualreportsystem.mapper;

import com.annualreportsystem.model.SessionMessage;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

/**
* @author lenovo
* @description 针对表【session_message(消息记录表)】的数据库操作Mapper
* @createDate 2024-05-02 09:24:20
* @Entity com.annualreportsystem.model.SessionMessage
*/
@Mapper
public interface SessionMessageMapper {

    int deleteByPrimaryKey(Long id);

    int insert(SessionMessage record);

    int insertSelective(SessionMessage record);

    SessionMessage selectByPrimaryKey(Long id);

    int updateByPrimaryKeySelective(SessionMessage record);

    int updateByPrimaryKey(SessionMessage record);

    List<SessionMessage> selectByReportId(Integer reportId);
}
