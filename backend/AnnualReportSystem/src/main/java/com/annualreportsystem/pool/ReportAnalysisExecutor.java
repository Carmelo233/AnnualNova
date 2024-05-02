package com.annualreportsystem.pool;

import com.annualreportsystem.mapper.AnalysisResultMapper;
import com.annualreportsystem.model.AnalysisResult;
import com.annualreportsystem.model.dto.ReportAnalysisDTO;
import com.annualreportsystem.model.dto.ReportAnalysisResultDTO;
import com.annualreportsystem.pool.task.ReportAnalysisTask;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Component;

import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.Future;

@Component
@Slf4j
public class ReportAnalysisExecutor {
    // 创建一个线程池
    private final ExecutorService threadPool = Executors.newFixedThreadPool(5);

    @Autowired
    private StringRedisTemplate stringRedisTemplate;
    @Autowired
    private AnalysisResultMapper analysisResultMapper;

    public void submit(ReportAnalysisDTO reportAnalysisDTO) {
        Future<ReportAnalysisResultDTO> analysisResultFuture = threadPool.submit(new ReportAnalysisTask(reportAnalysisDTO, stringRedisTemplate));

        // 保存结果
        try {
            AnalysisResult analysisResult = new AnalysisResult();
            ReportAnalysisResultDTO reportAnalysisResultDTO = analysisResultFuture.get();
            log.info("任务执行成功，结果为:{}", reportAnalysisResultDTO);

            BeanUtils.copyProperties(reportAnalysisResultDTO, analysisResult);
            analysisResult.setReportId(reportAnalysisDTO.getId());
            // 保存结果
            analysisResultMapper.insertSelective(analysisResult);
        } catch (Exception e) {
            log.error("任务执行失败", e);
            throw new RuntimeException("任务执行失败");
        }

    }
}
