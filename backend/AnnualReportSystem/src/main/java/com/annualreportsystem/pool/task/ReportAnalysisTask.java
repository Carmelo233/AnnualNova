package com.annualreportsystem.pool.task;

import com.annualreportsystem.model.dto.ReportAnalysisDTO;
import com.annualreportsystem.model.dto.ReportAnalysisResultDTO;
import org.springframework.data.redis.core.StringRedisTemplate;

import java.util.Objects;
import java.util.concurrent.Callable;

public class ReportAnalysisTask implements Callable<ReportAnalysisResultDTO> {
    private final ReportAnalysisDTO reportAnalysisDTO;
    private final StringRedisTemplate stringRedisTemplate;

    public ReportAnalysisTask(ReportAnalysisDTO reportAnalysisDTO, StringRedisTemplate stringRedisTemplate) {
        this.reportAnalysisDTO = reportAnalysisDTO;
        this.stringRedisTemplate = stringRedisTemplate;
    }

    @Override
    public ReportAnalysisResultDTO call() {
        // 执行任务
        // todo 先写死了，直接从 redis 拿数据
        try {
            String financialAbstract = stringRedisTemplate.opsForValue().get("financialAbstract");
            String nonFinancialAbstract = stringRedisTemplate.opsForValue().get("nonFinancialAbstract");
            double threeFactorScore = Double.parseDouble(Objects.requireNonNull(stringRedisTemplate.opsForValue().get("threeFactorScore")));
            double sevenFactorScore = Double.parseDouble(Objects.requireNonNull(stringRedisTemplate.opsForValue().get("sevenFactorScore")));
            double emotionScore = Double.parseDouble(Objects.requireNonNull(stringRedisTemplate.opsForValue().get("emotionScore")));
            double comprehensiveScore = Double.parseDouble(Objects.requireNonNull(stringRedisTemplate.opsForValue().get("comprehensiveScore")));

            // 创建 ReportAnalysisResult 对象
            return ReportAnalysisResultDTO.builder()
                    .financialAbstract(financialAbstract)
                    .nonFinancialAbstract(nonFinancialAbstract)
                    .threeFactorScore(threeFactorScore)
                    .sevenFactorScore(sevenFactorScore)
                    .emotionScore(emotionScore)
                    .comprehensiveScore(comprehensiveScore)
                    .build();
        } catch (Exception e) {
            throw new RuntimeException("算法运行出错");
        }

    }
}
