package com.zcy.ias.entity;

import com.baomidou.mybatisplus.annotation.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

/**
 * 系统用户表(SysUser)表实体类
 *
 * @author zhuangchongyi
 * @since 2025-03-25 18:25:57
 */
@Data
@NoArgsConstructor
@TableName("sys_user")
public class SysUser {
    /**
     * 用户ID
     */
    @TableId
    private Integer id;
    /**
     * 用户名
     */
    private String username;
    /**
     * 密码
     */
    private String password;
    /**
     * 昵称
     */
    private String nickname;
    /**
     * 头像
     */
    private String avatar;
    /**
     * 邮箱
     */
    private String email;
    /**
     * 手机号
     */
    private String phone;
    /**
     * 性别（1男 2女）
     */
    private Integer gender;
    /**
     * 帐号状态（0禁用 1启用）
     */
    private Integer status;
    /**
     * 最后登录IP
     */
    private String loginIp;
    /**
     * 最后登录时间
     */
    private LocalDateTime loginDate;
    /**
     * 创建人ID
     */
    @TableField(fill = FieldFill.INSERT)
    private Integer createId;
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
    private Integer updateId;
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

