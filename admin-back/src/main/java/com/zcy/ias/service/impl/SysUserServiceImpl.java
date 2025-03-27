package com.zcy.ias.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.zcy.common.utils.ip.IpUtils;
import com.zcy.ias.entity.SysUser;
import com.zcy.ias.mapper.SysUserMapper;
import com.zcy.ias.service.SysUserService;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

/**
 * 系统用户表(SysUser)表服务实现类
 *
 * @author zhuangchongyi
 * @since 2025-03-25 18:23:14
 */
@Service
public class SysUserServiceImpl extends ServiceImpl<SysUserMapper, SysUser> implements SysUserService {

    @Async
    @Override
    public void updateLoginInfo(Integer userId) {
        SysUser sysUser = new SysUser();
        sysUser.setId(userId);
        sysUser.setLoginIp(IpUtils.getIpAddr());
        sysUser.setLoginDate(LocalDateTime.now());
        this.updateById(sysUser);
    }
}

