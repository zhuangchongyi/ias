package com.zcy.ias.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.zcy.ias.entity.SysUser;

/**
 * 用户表(SysUser)表数据库访问层
 *
 * @author zhuangchongyi
 * @since 2025-03-25 18:23:14
 */
public interface SysUserMapper extends BaseMapper<SysUser> {

    /**
     * 根据用户名查询用户信息
     */
    SysUser selectUserByUserName(String username);

}

