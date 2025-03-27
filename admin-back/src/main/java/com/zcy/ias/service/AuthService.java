package com.zcy.ias.service;

import com.zcy.common.core.entity.LoginBody;
import com.zcy.common.core.entity.LoginUser;

/**
 * 认证服务接口
 *
 * @author zhuangchongyi
 * @since 2025-03-27 09:37:41
 */
public interface AuthService {
    /**
     * 登录
     */
    String login(LoginBody loginBody);

    /**
     * 获取用户信息
     */
    LoginUser getInfo();

}
