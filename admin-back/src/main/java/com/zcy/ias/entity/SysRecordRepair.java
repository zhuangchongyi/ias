package com.zcy.ias.entity;

import com.baomidou.mybatisplus.annotation.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

/**
 * 补卡记录表(SysRecordRepair)表实体类
 *
 * @author zhuangchongyi
 * @since 2025-04-28 17:25:14
 */
@Data
@NoArgsConstructor
@TableName("sys_record_repair")
public class SysRecordRepair {
    /**ID*/
    @TableId
    private Long id;
    /**用户ID*/
    private Long userId;
    /**打卡记录ID*/
    private Long attendanceId;
    /**补卡类型（1上班 2下班）*/
    private Integer repairType;
    /**补卡时间*/
    private LocalDateTime repairTime;
    /**补卡原因*/
    private String reason;
    /**审核状态（0待审核 1已通过 2已拒绝）*/
    private Integer status;
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

