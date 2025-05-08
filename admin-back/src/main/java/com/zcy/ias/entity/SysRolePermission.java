package com.zcy.ias.entity;

import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * 角色权限表(SysRolePermission)表实体类
 *
 * @author zhuangchongyi
 * @since 2025-04-28 17:23:36
 */
@Data
@NoArgsConstructor
@TableName("sys_role_permission")
public class SysRolePermission {
    /**
     * 角色ID
     */
    private Long roleId;
    /**
     * 权限ID
     */
    private Long permissionId;

}

