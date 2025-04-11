package com.zcy.ias.vo;

import com.zcy.ias.entity.SysUser;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

/**
 * 用户表(SysUser)VO类
 *
 * @author zhuangchongyi
 * @since 2025-03-28 17:52:31
 */
@Data
@NoArgsConstructor
public class SysUserVO extends SysUser {
    /**
     * 权限列表
     */
    private List<String> permissionList;
}

