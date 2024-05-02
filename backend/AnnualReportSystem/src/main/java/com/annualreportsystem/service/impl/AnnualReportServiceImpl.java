package com.annualreportsystem.service.impl;

import com.annualreportsystem.mapper.AnalysisResultMapper;
import com.annualreportsystem.mapper.AnnualReportMapper;
import com.annualreportsystem.mapper.SessionMessageMapper;
import com.annualreportsystem.model.AnalysisResult;
import com.annualreportsystem.model.AnnualReport;
import com.annualreportsystem.model.SessionMessage;
import com.annualreportsystem.model.dto.ReportAnalysisDTO;
import com.annualreportsystem.model.vo.AnalysisResultVO;
import com.annualreportsystem.model.vo.AnnualReportVO;
import com.annualreportsystem.model.vo.SessionMessageVO;
import com.annualreportsystem.mq.LocalMessageQueue;
import com.annualreportsystem.pool.ReportAnalysisExecutor;
import com.annualreportsystem.service.AnnualReportService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Slf4j
public class AnnualReportServiceImpl implements AnnualReportService {
    @Autowired
    private LocalMessageQueue<ReportAnalysisDTO> localMessageQueue;
    @Autowired
    private ReportAnalysisExecutor reportAnalysisExecutor;
    @Autowired
    private AnalysisResultMapper analysisResultMapper;
    @Autowired
    private AnnualReportMapper annualReportMapper;
    @Autowired
    private SessionMessageMapper sessionMessageMapper;
    @Autowired
    private StringRedisTemplate stringRedisTemplate;

    private static final Integer USER_ROLE = 0;
    private static final Integer AI_ROLE = 1;


    // 设置定时任务，每两秒从消息队列中获取消息
    @Scheduled(fixedRate = 2000)
    public void fetchMessage() {
        ReportAnalysisDTO reportAnalysisDTO = localMessageQueue.dequeue();
        if (reportAnalysisDTO != null) {
            log.info("从本地消息队列获取成功:{}", reportAnalysisDTO);
            reportAnalysisExecutor.submit(reportAnalysisDTO);
        }
    }

    @Override
    public AnalysisResultVO getAnalysisResult(Integer reportId) {
        // 根据 reportId 从数据库查询分析结果
        AnalysisResult analysisResult = analysisResultMapper.selectByReportId(reportId);
        AnalysisResultVO analysisResultVO = new AnalysisResultVO();
        BeanUtils.copyProperties(analysisResult, analysisResultVO);
        return analysisResultVO;
    }

    @Override
    public List<AnnualReportVO> getReportList() {
        // todo 从 session 中获取 uid
        List<AnnualReport> annualReportList = annualReportMapper.selectByUid(1);
        return annualReportList.stream()
                .map(annualReport -> {
                    AnnualReportVO annualReportVO = new AnnualReportVO();
                    BeanUtils.copyProperties(annualReport, annualReportVO);
                    return annualReportVO;
                })
                .collect(Collectors.toList());
    }

    @Override
    public SessionMessageVO chat(Integer reportId, String message) {
        // 将用户消息插入数据库
        SessionMessage userMessage = SessionMessage.builder()
                .reportId(reportId)
                .message(message)
                .role(USER_ROLE)
                .build();
        sessionMessageMapper.insertSelective(userMessage);

        // todo 调用 AI 接口获取 AI 回复
        // todo 开发时直接从 redis 拿了
        String aiMessage = stringRedisTemplate.opsForValue().get(message);
        if (aiMessage == null) {
            aiMessage = "不太理解你的问题呢~";
        }
        // 将 ai 消息插入数据库
        SessionMessage aiMessageEntity = SessionMessage.builder()
                .reportId(reportId)
                .message(aiMessage)
                .role(AI_ROLE)
                .createTime(Date.from(LocalDateTime.now().atZone(ZoneId.systemDefault()).toInstant()))
                .build();
        sessionMessageMapper.insertSelective(aiMessageEntity);

        SessionMessageVO aiMessageVO = new SessionMessageVO();
        BeanUtils.copyProperties(aiMessageEntity, aiMessageVO);
        return aiMessageVO;
    }

    @Override
    public List<SessionMessageVO> getChatList(Integer reportId) {
        List<SessionMessage> sessionMessageList = sessionMessageMapper.selectByReportId(reportId);
        return sessionMessageList.stream()
                .map(sessionMessage -> {
                    SessionMessageVO sessionMessageVO = new SessionMessageVO();
                    BeanUtils.copyProperties(sessionMessage, sessionMessageVO);
                    return sessionMessageVO;
                })
                .collect(Collectors.toList());
    }
}
