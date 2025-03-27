package com.zcy.common.emuns;

import lombok.Getter;

/**
 * 通用字段枚举
 *
 * @author zhuangchongyi
 * @since 2025-03-26 03:36:40
 */
@Getter
public enum FieldEnums {
    ID("id", "id"),
    CREATE_ID("create_id", "createId"),
    CREATE_BY("create_by", "createBy"),
    CREATE_TIME("create_time", "createTime"),
    UPDATE_ID("update_id", "updateId"),
    UPDATE_BY("update_by", "updateBy"),
    UPDATE_TIME("update_time", "updateTime"),
    DEL_FLAG("del_flag", "delFlag"),
    ;
    /**
     * 字段名称
     */
    private final String sqlField;
    /**
     * 实体字段
     */
    private final String entityField;

    FieldEnums(String sqlField, String entityField) {
        this.sqlField = sqlField;
        this.entityField = entityField;
    }

}
