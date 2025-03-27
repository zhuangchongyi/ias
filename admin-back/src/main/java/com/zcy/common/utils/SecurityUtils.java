package com.zcy.common.utils;

import com.zcy.common.core.entity.LoginUser;
import com.zcy.common.exception.ServiceException;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

/**
 * 安全服务工具类
 *
 * @author ruoyi
 */
public class SecurityUtils {

    /**
     * 用户ID
     **/
    public static Integer getUserId() {
        try {
            return getLoginUser().getId();
        } catch (Exception e) {
            throw new ServiceException(HttpStatus.UNAUTHORIZED.value(), "获取用户ID异常");
        }
    }

    /**
     * 获取用户账户
     **/
    public static String getUsername() {
        try {
            return getLoginUser().getUsername();
        } catch (Exception e) {
            throw new ServiceException(HttpStatus.UNAUTHORIZED.value(), "获取用户账户异常");
        }
    }

    /**
     * 获取用户账户
     **/
    public static String getNickname() {
        try {
            return getLoginUser().getNickname();
        } catch (Exception e) {
            throw new ServiceException(HttpStatus.UNAUTHORIZED.value(), "获取用户账户异常");
        }
    }

    /**
     * 获取用户
     **/
    public static LoginUser getLoginUser() {
        try {
            return (LoginUser) getAuthentication().getPrincipal();
        } catch (Exception e) {
            throw new ServiceException(HttpStatus.UNAUTHORIZED.value(), "获取用户信息异常");
        }
    }

    /**
     * 获取Authentication
     */
    public static Authentication getAuthentication() {
        return SecurityContextHolder.getContext().getAuthentication();
    }

    /**
     * 生成BCryptPasswordEncoder密码
     *
     * @param password 密码
     * @return 加密字符串
     */
    public static String encryptPassword(String password) {
        BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        return passwordEncoder.encode(password);
    }

    /**
     * 判断密码是否相同
     *
     * @param rawPassword     真实密码
     * @param encodedPassword 加密后字符
     * @return 结果
     */
    public static boolean matchesPassword(String rawPassword, String encodedPassword) {
        BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        return passwordEncoder.matches(rawPassword, encodedPassword);
    }

    public static void main(String[] args) {
//        String encryptPassword = encryptPassword("123456");
        String encryptPassword = "$2a$10$iR64Zi41sNmut6JQchF.EukrWqwb2JQDlNU4F4sOvuaKVUmxaxHR2";
        System.out.println(encryptPassword);
        System.out.println(matchesPassword("123456", encryptPassword));
    }

}
