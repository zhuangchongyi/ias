package com.zcy.ias.service.impl;

import com.zcy.common.core.entity.LoginBody;
import com.zcy.common.core.entity.LoginUser;
import com.zcy.common.exception.AuthException;
import com.zcy.common.utils.BeanUtils;
import com.zcy.common.utils.SecurityUtils;
import com.zcy.config.context.AuthenticationContextHolder;
import com.zcy.ias.service.AuthService;
import com.zcy.ias.service.SysUserService;
import com.zcy.ias.service.auth.TokenService;
import com.zcy.ias.vo.SysUserVO;
import jakarta.annotation.Resource;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AuthServiceImpl implements AuthService {
    @Resource
    private AuthenticationManager authenticationManager;
    @Resource
    private SysUserService sysUserService;
    @Resource
    private TokenService tokenService;


    @Override
    public String login(LoginBody loginBody) {
        String username = loginBody.getUsername();
        String password = loginBody.getPassword();
        UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(username, password);
        AuthenticationContextHolder.setContext(authenticationToken);
        // 该方法会去调用UserDetailsServiceImpl.loadUserByUsername
        Authentication authentication = authenticationManager.authenticate(authenticationToken);
        LoginUser loginUser = (LoginUser) authentication.getPrincipal();
        // 生成token
        String token = tokenService.createToken(loginUser);
        // 更新用户登录信息
        sysUserService.updateLoginInfo(loginUser.getId());
        return token;
    }

    @Override
    public SysUserVO getInfo() {
        return Optional.ofNullable(SecurityUtils.getLoginUser())
                .map(LoginUser::getUser)
                .map(user -> {
                    SysUserVO vo = new SysUserVO();
                    BeanUtils.copyBeanProp(user, vo);
                    // TODO 获取用户角色权限信息

                    return vo;
                })
                .orElseThrow(() -> new AuthException("获取用户信息失败"));

    }


}
