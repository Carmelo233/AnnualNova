package com.annualreportsystem.model;

import java.io.Serializable;
import java.util.Date;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * 消息记录表
 * @TableName session_message
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class SessionMessage implements Serializable {
    /**
     * 消息 id
     */
    private Integer id;

    /**
     * 对应年报记录 id
     */
    private Integer reportId;

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

    /**
     * 消息是否删除(0--未删除，1--已删除)
     */
    private Integer deleted;

    private static final long serialVersionUID = 1L;
}