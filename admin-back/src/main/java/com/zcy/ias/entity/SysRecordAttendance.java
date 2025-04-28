package com.zcy.ias.entity;

import com.baomidou.mybatisplus.annotation.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

/**
 * 打卡记录表(SysRecordAttendance)表实体类
 *
 * @author zhuangchongyi
 * @since 2025-04-28 17:25:13
 */
@Data
@NoArgsConstructor
@TableName("sys_record_attendance")
public class SysRecordAttendance {
    /**ID*/
    @TableId
    private Long id;
    /**用户ID*/
    private Long userId;
    /**打卡来源（1自动 2补卡）*/
    private Integer punchSource;
    /**打卡类型（1上班打卡 2迟到打卡 3下班打卡）*/
    private Integer punchType;
    /**打卡方式（1人脸打卡 2定位打卡）*/
    private Integer punchMode;
    /**打卡时间*/
    private LocalDateTime punchTime;
    /**人脸打卡时的人脸数据ID*/
    private String faceId;
    /**打卡位置（用于定位打卡）*/
    private String location;
    /**创建人ID*/
    @TableField(fill = FieldFill.INSERT)
    private Long createId;
    /**创建人名称*/
    @TableField(fill = FieldFill.INSERT)
    private String createBy;
    /**创建时间*/
    @TableField(fill = FieldFill.INSERT)
    private LocalDateTime createTime;
    /**更新人ID*/
    @TableField(fill = FieldFill.UPDATE)
    private Long updateId;
    /**更新人名称*/
    @TableField(fill = FieldFill.UPDATE)
    private String updateBy;
    /**更新时间*/
    @TableField(fill = FieldFill.UPDATE)
    private LocalDateTime updateTime;
    /**是否删除（0否 1是）*/
    @TableLogic(value = "0", delval = "1")
    private Integer delFlag;

}

