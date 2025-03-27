package com.zcy.common.emuns;

import lombok.Getter;

/**
 * 通用字段枚举
 *
 * @author zhuangchongyi
 * @since 2025-03-26 03:36:40
 */
@Getter
public enum IEnums {
    NO(0, "否"),
    YES(1, "是"),
    ;
    private final int code;
    private final String msg;

    IEnums(int code, String msg) {
        this.code = code;
        this.msg = msg;
    }


}
