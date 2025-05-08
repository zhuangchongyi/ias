package com.zcy.ias.entity;

import com.baomidou.mybatisplus.annotation.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

/**
 * 权限表(SysPermission)表实体类
 *
 * @author zhuangchongyi
 * @since 2025-04-28 17:23:36
 */
@Data
@NoArgsConstructor
@TableName("sys_permission")
public class SysPermission {
    /**
     * 权限ID
     */
    @TableId
    private Long id;
    /**
     * 父级id
     */
    private Long parentId;
    /**
     * 权限字符串
     */
    private String permissionKey;
    /**
     * 权限名称
     */
    private String permissionName;
    /**
     * 显示顺序
     */
    private Integer orderNum;
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

