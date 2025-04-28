package com.zcy.ias.entity;

import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * 用户角色表(SysUserRole)表实体类
 *
 * @author zhuangchongyi
 * @since 2025-04-28 17:23:36
 */
@Data
@NoArgsConstructor
@TableName("sys_user_role")
public class SysUserRole {
    /**用户ID*/
    private Long userId;
    /**角色ID*/
    private Long roleId;

}

