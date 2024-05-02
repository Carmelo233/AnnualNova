package com.annualreportsystem.model.vo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SessionMessageVO {
    /**
     * 消息
     */
    private String message;

    /**
     * 消息归属(0--用户，1--AI)
     */
    private Integer role;

    /**
     * 消息生成时间，用于排序
     */
    private Date createTime;
}
