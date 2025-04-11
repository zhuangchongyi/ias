package com.zcy.config.handler;

import com.zcy.common.core.R;
import com.zcy.common.utils.JSONUtils;
import com.zcy.common.utils.ServletUtils;
import com.zcy.common.utils.StringUtils;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.io.Serial;
import java.io.Serializable;

/**
 * 认证失败处理类 返回未授权
 *
 * @author ruoyi
 */
@Component
public class AuthenticationEntryPointImpl implements AuthenticationEntryPoint, Serializable {
    @Serial
    private static final long serialVersionUID = 1L;

    @Override
    public void commence(HttpServletRequest request, HttpServletResponse response, AuthenticationException authException) throws IOException, ServletException {
        String msg = StringUtils.format("请求访问：{} {}，认证失败，无法访问系统资源", request.getMethod(), request.getRequestURI());
        ServletUtils.renderString(response, JSONUtils.toJson(R.fail(HttpStatus.UNAUTHORIZED.value(), msg)));
    }
}
