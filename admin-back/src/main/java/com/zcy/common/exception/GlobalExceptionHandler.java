package com.zcy.common.exception;

import com.zcy.common.core.R;
import com.zcy.common.utils.StringUtils;
import com.zcy.common.utils.html.EscapeUtil;
import com.zcy.common.utils.text.Convert;
import jakarta.annotation.Resource;
import jakarta.servlet.http.HttpServletRequest;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.env.Environment;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.validation.BindException;
import org.springframework.web.HttpRequestMethodNotSupportedException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.MissingPathVariableException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.method.annotation.MethodArgumentTypeMismatchException;
import org.springframework.web.multipart.MaxUploadSizeExceededException;

import java.util.Objects;

/**
 * 全局异常处理器
 *
 * @author ruoyi
 */
@Slf4j
@RestControllerAdvice
public class GlobalExceptionHandler {
    @Resource
    private Environment env;

    /**
     * 权限校验异常
     */
    @ExceptionHandler(AccessDeniedException.class)
    public R<String> handleAccessDeniedException(AccessDeniedException e, HttpServletRequest request) {
        log.error("请求方式'{}',请求地址'{}',权限校验失败'{}'", request.getMethod(), request.getRequestURI(), e.getMessage());
        return R.fail(HttpStatus.FORBIDDEN.value(), "没有权限，请联系管理员授权");
    }

    /**
     * 请求方式不支持
     */
    @ExceptionHandler(HttpRequestMethodNotSupportedException.class)
    public R<String> handleHttpRequestMethodNotSupported(HttpRequestMethodNotSupportedException e,
                                                         HttpServletRequest request) {
        log.error("请求地址'{}',不支持'{}'请求", request.getRequestURI(), e.getMethod());
        return R.fail(e.getMessage());
    }

    /**
     * 业务异常
     */
    @ExceptionHandler(ServiceException.class)
    public R<String> handleServiceException(ServiceException e, HttpServletRequest request) {
        // 限制只打印前 20 层堆栈信息
        StackTraceElement[] stackTrace = e.getStackTrace();
        StringBuilder sb = new StringBuilder();
        int limit = Math.min(stackTrace.length, 20);
        for (int i = 0; i < limit; i++) {
            sb.append("    at ").append(stackTrace[i]).append("\n");
        }
        log.error("请求方式'{}',请求地址'{}',发生未知异常.\ncom.ruoyi.common.exception.ServiceException: {}\n{}",
                request.getMethod(), request.getRequestURI(), e.getMessage(), sb);
        int code = e.getCode();
        return R.fail(code, e.getMessage());
    }


    /**
     * 请求路径中缺少必需的路径变量
     */
    @ExceptionHandler(MissingPathVariableException.class)
    public R<String> handleMissingPathVariableException(MissingPathVariableException e, HttpServletRequest request) {
        log.error("请求路径中缺少必需的路径变量'{}',发生系统异常.", request.getRequestURI(), e);
        return R.fail(String.format("请求路径中缺少必需的路径变量[%s]", e.getVariableName()));
    }

    /**
     * 请求参数类型不匹配
     */
    @ExceptionHandler(MethodArgumentTypeMismatchException.class)
    public R<String> handleMethodArgumentTypeMismatchException(MethodArgumentTypeMismatchException e, HttpServletRequest request) {
        String value = Convert.toStr(e.getValue());
        if (StringUtils.isNotEmpty(value)) {
            value = EscapeUtil.clean(value);
        }
        log.error("请求参数类型不匹配'{}',发生系统异常.", request.getRequestURI(), e);
        return R.fail(String.format("请求参数类型不匹配，参数[%s]要求类型为：'%s'，但输入值为：'%s'", e.getName(), Objects.requireNonNull(e.getRequiredType()).getName(), value));
    }

    /**
     * 拦截未知的运行时异常
     */
    @ExceptionHandler(RuntimeException.class)
    public R<String> handleRuntimeException(RuntimeException e, HttpServletRequest request) {
        log.error("请求方式'{}',请求地址'{}',发生未知异常.", request.getMethod(), request.getRequestURI(), e);
        return R.fail(e.getMessage());
    }

    /**
     * 认证异常
     */
    @ExceptionHandler(AuthException.class)
    public R<String> handleRuntimeException(AuthException e, HttpServletRequest request) {
        return R.fail(e.getMessage());
    }

    /**
     * 拦截未知的运行时异常
     */
    @ExceptionHandler(MaxUploadSizeExceededException.class)
    public R<String> handleRuntimeException(MaxUploadSizeExceededException e, HttpServletRequest request) {
        String maxFileSize = env.getProperty("spring.servlet.multipart.max-file-size");
        String maxRequestSize = env.getProperty("spring.servlet.multipart.max-request-size");
        String msg = StringUtils.format("单个文件大小上传不能超过{},总上传的文件大小上传不能超过{}", maxFileSize, maxRequestSize);
        log.error("请求方式'{}',请求地址'{}',发生未知异常.{}", request.getMethod(), request.getRequestURI(), msg, e);
        return R.fail(msg);
    }

    /**
     * 系统异常
     */
    @ExceptionHandler(Exception.class)
    public R<String> handleException(Exception e, HttpServletRequest request) {
        log.error("请求方式'{}',请求地址'{}',发生系统异常.", request.getMethod(), request.getRequestURI(), e);
        return R.fail(e.getMessage());
    }

    /**
     * 自定义验证异常
     */
    @ExceptionHandler(BindException.class)
    public R<String> handleBindException(BindException e) {
        log.error(e.getMessage(), e);
        String message = e.getAllErrors().getFirst().getDefaultMessage();
        return R.fail(message);
    }

    /**
     * 自定义验证异常
     */
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public Object handleMethodArgumentNotValidException(MethodArgumentNotValidException e) {
        log.error(e.getMessage(), e);
        String message = Objects.requireNonNull(e.getBindingResult().getFieldError()).getDefaultMessage();
        return R.fail(message);
    }

}
