package com.zcy.common.core.entity;

import lombok.Data;

/**
 * 用户登录对象
 *
 * @author zhuangchongyi
 * @since 2025-03-27 09:09:13
 */
@Data
public class LoginBody {
    /**
     * 用户名
     */
    private String username;

    /**
     * 用户密码
     */
    private String password;

    /**
     * 验证码
     */
    private String code;

    /**
     * 唯一标识
     */
    private String uuid;

}
