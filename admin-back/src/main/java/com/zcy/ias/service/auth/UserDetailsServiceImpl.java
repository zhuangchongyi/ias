package com.zcy.ias.service.auth;

import com.zcy.common.core.CacheConstants;
import com.zcy.common.core.entity.LoginUser;
import com.zcy.common.emuns.IEnums;
import com.zcy.common.exception.ServiceException;
import com.zcy.common.utils.SecurityUtils;
import com.zcy.common.utils.StringUtils;
import com.zcy.config.context.AuthenticationContextHolder;
import com.zcy.config.redis.RedisCache;
import com.zcy.ias.entity.SysUser;
import com.zcy.ias.mapper.SysUserMapper;
import jakarta.annotation.Resource;
import lombok.Data;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

import java.util.concurrent.TimeUnit;

/**
 * 用户验证处理
 *
 * @author zhuangchongyi
 * @since 2025-03-27 09:47:27
 */
@Slf4j
@Data
@Component
@ConfigurationProperties("user.password")
public class UserDetailsServiceImpl implements UserDetailsService {
    private int maxRetryCount;
    private int lockTime;
    @Resource
    private RedisCache redisCache;
    @Resource
    private SysUserMapper sysUserMapper;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        SysUser user = sysUserMapper.selectUserByUserName(username);
        if (StringUtils.isNull(user)) {
            throw new ServiceException("登录用户：{} 不存在.", username);
        } else if (IEnums.YES.getCode() == user.getDelFlag()) {
            throw new ServiceException("登录用户：{} 已被删除.", username);
        } else if (IEnums.NO.getCode() == user.getStatus()) {
            throw new ServiceException("登录用户：{} 已被停用.", username);
        }

        this.validate(user);

        return new LoginUser(user.getId(), user);
    }

    public void validate(SysUser user) {
        Authentication usernamePasswordAuthenticationToken = AuthenticationContextHolder.getContext();
        String username = usernamePasswordAuthenticationToken.getName();
        String password = usernamePasswordAuthenticationToken.getCredentials().toString();

        String cacheKey = CacheConstants.PWD_ERR_CNT_KEY + username;
        Integer retryCount = redisCache.getCacheObject(cacheKey);

        if (retryCount == null) {
            retryCount = 0;
        }

        if (retryCount >= maxRetryCount) {
            throw new ServiceException("密码输入错误{}次，帐户锁定{}分钟", maxRetryCount, lockTime);
        }

        if (SecurityUtils.matchesPassword(user.getPassword(), password)) {
            retryCount = retryCount + 1;
            redisCache.setCacheObject(cacheKey, retryCount, lockTime, TimeUnit.MINUTES);
            throw new ServiceException("密码错误");
        } else {
            redisCache.deleteObject(cacheKey);
        }
    }

}
