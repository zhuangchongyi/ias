package com.zcy.ias.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.zcy.ias.entity.SysUser;

/**
 * 用户表(SysUser)表服务接口
 *
 * @author zhuangchongyi
 * @since 2025-03-25 18:23:14
 */
public interface SysUserService extends IService<SysUser> {

    /**
     * 更新用户登录信息
     *
     * @param userId 用户id
     */
    void updateLoginInfo(Long userId);

    /**
     * 根据用户名查询用户信息
     */
    SysUser getUserByUserName(String username);

}

