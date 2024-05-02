package com.annualreportsystem.controller;

import com.annualreportsystem.common.BaseResponse;
import com.annualreportsystem.common.ResultUtils;
import com.annualreportsystem.model.AnalysisResult;
import com.annualreportsystem.model.vo.AnalysisResultVO;
import com.annualreportsystem.model.vo.AnnualReportVO;
import com.annualreportsystem.model.vo.SessionMessageVO;
import com.annualreportsystem.service.AnnualReportService;
import com.github.xiaoymin.knife4j.annotations.ApiOperationSupport;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/v1/annual-report")
@Api(tags = "年报分析")
public class AnnualReportController {

    @Autowired
    private AnnualReportService annualReportService;

    @ApiOperation("获取年报分析结果，若分析失败则结果为 null")
    @ApiOperationSupport(author = "林裕松")
    @GetMapping("/get-analysis-result")
    public BaseResponse<AnalysisResultVO> getAnalysisResult(@RequestParam("reportId") Integer reportId) {
        return ResultUtils.success(annualReportService.getAnalysisResult(reportId));
    }

    @ApiOperation("获取上传年报列表")
    @ApiOperationSupport(author = "林裕松")
    @GetMapping("/get-report-list")
    public BaseResponse<List<AnnualReportVO>> getReportList() {
        return ResultUtils.success(annualReportService.getReportList());
    }

    @ApiOperation("根据年报内容聊天")
    @ApiOperationSupport(author = "林裕松")
    @PostMapping("/chat")
    public BaseResponse<SessionMessageVO> chat(@RequestParam("reportId") Integer reportId, @RequestParam("message") String message) {
        return ResultUtils.success(annualReportService.chat(reportId, message));
    }

    @ApiOperation("获取年报聊天记录列表，列表第一个消息时间最早，按照时间由早到晚排序")
    @ApiOperationSupport(author = "林裕松")
    @GetMapping("/get-chat-list")
    public BaseResponse<List<SessionMessageVO>> getChatList(@RequestParam("reportId") Integer reportId) {
        return ResultUtils.success(annualReportService.getChatList(reportId));
    }
}
