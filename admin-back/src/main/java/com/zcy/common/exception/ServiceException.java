package com.zcy.common.exception;

import com.zcy.common.core.R;
import com.zcy.common.utils.StringUtils;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.io.Serial;

/**
 * 业务异常
 *
 * @author zhuangchongyi
 * @since 2025-03-27 09:45:11
 */
@EqualsAndHashCode(callSuper = true)
@Data
public final class ServiceException extends RuntimeException {
    @Serial
    private static final long serialVersionUID = 1L;

    /**
     * 错误码
     */
    private int code;

    /**
     * 错误提示
     */
    private String message;

    /**
     * 错误明细
     *
     * @param message 错误提示
     * @param args    参数
     */
    public ServiceException(String message, Object... args) {
        this(R.FAIL, message, args);
    }

    /**
     * 错误明细
     *
     * @param code    错误码
     * @param message 错误提示
     * @param args    参数
     */
    public ServiceException(int code, String message, Object... args) {
        this.code = code;
        this.message = StringUtils.format(message, args);
    }

    @Override
    public String getMessage() {
        return message;
    }


}