package com.zcy.ias.entity;

import com.baomidou.mybatisplus.annotation.*;
import jakarta.validation.constraints.NotEmpty;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

/**
 * 角色表(SysRole)表实体类
 *
 * @author zhuangchongyi
 * @since 2025-04-09 17:44:08
 */
@Data
@NoArgsConstructor
@TableName("sys_role")
public class SysRole {
    /**
     * 角色ID
     */
    @TableId
    private Long id;
    /**
     * 角色权限字符串
     */
    @NotEmpty(message = "角色权限字符串不能为空")
    private String roleKey;
    /**
     * 角色名称
     */
    @NotEmpty(message = "角色名称不能为空")
    private String roleName;
    /**
     * 显示顺序
     */
    private Integer orderNum;
    /**
     * 角色状态（0禁用 1启用）
     */
    private Integer status;
    /**
     * 创建人ID
     */
    @TableField(fill = FieldFill.INSERT)
    private Long createId;
    /**
     * 创建人名称
     */
    @TableField(fill = FieldFill.INSERT)
    private String createBy;
    /**
     * 创建时间
     */
    @TableField(fill = FieldFill.INSERT)
    private LocalDateTime createTime;
    /**
     * 更新人ID
     */
    @TableField(fill = FieldFill.UPDATE)
    private Long updateId;
    /**
     * 更新人名称
     */
    @TableField(fill = FieldFill.UPDATE)
    private String updateBy;
    /**
     * 更新时间
     */
    @TableField(fill = FieldFill.UPDATE)
    private LocalDateTime updateTime;
    /**
     * 是否删除（0否 1是）
     */
    @TableLogic(value = "0", delval = "1")
    private Integer delFlag;

}

