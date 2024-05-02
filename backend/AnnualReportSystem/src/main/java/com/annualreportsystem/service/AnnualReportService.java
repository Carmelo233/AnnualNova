package com.annualreportsystem.service;

import com.annualreportsystem.model.AnalysisResult;
import com.annualreportsystem.model.vo.AnalysisResultVO;
import com.annualreportsystem.model.vo.AnnualReportVO;
import com.annualreportsystem.model.vo.SessionMessageVO;

import java.util.List;

public interface AnnualReportService {
    AnalysisResultVO getAnalysisResult(Integer reportId);

    List<AnnualReportVO> getReportList();

    SessionMessageVO chat(Integer reportId, String message);

    List<SessionMessageVO> getChatList(Integer reportId);
}
