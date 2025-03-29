package com.zcy.config.handler;

import com.zcy.common.core.R;
import com.zcy.common.utils.JSONUtils;
import com.zcy.common.utils.ServletUtils;
import com.zcy.common.utils.StringUtils;
import com.zcy.ias.service.auth.TokenService;
import jakarta.annotation.Resource;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.logout.LogoutSuccessHandler;

import java.io.IOException;

/**
 * 自定义退出处理类 返回成功
 *
 * @author ruoyi
 */
@Configuration
public class LogoutSuccessHandlerImpl implements LogoutSuccessHandler {
    @Resource
    private TokenService tokenService;

    /**
     * 退出处理
     */
    @Override
    public void onLogoutSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {
        String userKey = tokenService.getUserTokenKey(request);
        if (StringUtils.isNotNull(userKey)) {
            // 删除用户缓存记录
            tokenService.delLoginUser(userKey);
        }
        ServletUtils.renderString(response, JSONUtils.toJson(R.ok("退出成功")));
    }
}
