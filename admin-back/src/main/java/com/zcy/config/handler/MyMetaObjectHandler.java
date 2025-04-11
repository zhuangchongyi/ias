package com.zcy.config.handler;

import com.baomidou.mybatisplus.core.handlers.MetaObjectHandler;
import com.zcy.common.core.entity.LoginUser;
import com.zcy.common.emuns.FieldEnums;
import com.zcy.common.utils.SecurityUtils;
import lombok.extern.slf4j.Slf4j;
import org.apache.ibatis.reflection.MetaObject;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Date;
import java.util.Objects;

/**
 * mybatis plus 自动填充功能
 *
 * @author zhuangchongyi
 * @since 2025-03-26 03:37:36
 */
@Slf4j
@Component
public class MyMetaObjectHandler implements MetaObjectHandler {

    @Override
    public void insertFill(MetaObject metaObject) {
        if (metaObject.hasSetter(FieldEnums.CREATE_TIME.getEntityField())) {
            if (metaObject.getGetterType(FieldEnums.CREATE_TIME.getEntityField()).equals(Date.class)) {
                metaObject.setValue(FieldEnums.CREATE_TIME.getEntityField(), new Date());
            } else if (metaObject.getGetterType(FieldEnums.CREATE_TIME.getEntityField()).equals(LocalDateTime.class)) {
                metaObject.setValue(FieldEnums.CREATE_TIME.getEntityField(), LocalDateTime.now());
            } else if (metaObject.getGetterType(FieldEnums.CREATE_TIME.getEntityField()).equals(LocalDate.class)) {
                metaObject.setValue(FieldEnums.CREATE_TIME.getEntityField(), LocalDate.now());
            }
        }
        LoginUser currentUser = SecurityUtils.getCurrentUser();
        if (metaObject.hasSetter(FieldEnums.CREATE_ID.getEntityField())
                && Objects.isNull(metaObject.getValue(FieldEnums.CREATE_ID.getEntityField()))) {
            this.setFieldValByName(FieldEnums.CREATE_ID.getEntityField(), currentUser.getId(), metaObject);
        }
        if (metaObject.hasSetter(FieldEnums.CREATE_BY.getEntityField())
                && Objects.isNull(metaObject.getValue(FieldEnums.CREATE_BY.getEntityField()))
                && metaObject.getGetterType(FieldEnums.CREATE_BY.getEntityField()).equals(String.class)) {
            this.setFieldValByName(FieldEnums.CREATE_BY.getEntityField(), currentUser.getNickname(), metaObject);
        }

        // 清空更新字段信息
        if (metaObject.hasSetter(FieldEnums.UPDATE_TIME.getEntityField())) {
            metaObject.setValue(FieldEnums.UPDATE_TIME.getEntityField(), null);
        }
        if (metaObject.hasSetter(FieldEnums.UPDATE_ID.getEntityField())) {
            metaObject.setValue(FieldEnums.UPDATE_ID.getEntityField(), null);
        }
        if (metaObject.hasSetter(FieldEnums.UPDATE_BY.getEntityField())) {
            metaObject.setValue(FieldEnums.UPDATE_BY.getEntityField(), null);
        }

    }

    @Override
    public void updateFill(MetaObject metaObject) {
        if (metaObject.hasSetter(FieldEnums.UPDATE_TIME.getEntityField())) {
            if (metaObject.getGetterType(FieldEnums.UPDATE_TIME.getEntityField()).equals(Date.class)) {
                metaObject.setValue(FieldEnums.UPDATE_TIME.getEntityField(), new Date());
            } else if (metaObject.getGetterType(FieldEnums.UPDATE_TIME.getEntityField()).equals(LocalDateTime.class)) {
                metaObject.setValue(FieldEnums.UPDATE_TIME.getEntityField(), LocalDateTime.now());
            } else if (metaObject.getGetterType(FieldEnums.UPDATE_TIME.getEntityField()).equals(LocalDate.class)) {
                metaObject.setValue(FieldEnums.UPDATE_TIME.getEntityField(), LocalDate.now());
            }
        }
        LoginUser currentUser = SecurityUtils.getCurrentUser();
        if (metaObject.hasSetter(FieldEnums.UPDATE_ID.getEntityField())) {
            this.setFieldValByName(FieldEnums.UPDATE_ID.getEntityField(), currentUser.getId(), metaObject);
        }
        if (metaObject.hasSetter(FieldEnums.UPDATE_BY.getEntityField())
                && metaObject.getGetterType(FieldEnums.UPDATE_BY.getEntityField()).equals(String.class)) {
            this.setFieldValByName(FieldEnums.UPDATE_BY.getEntityField(), currentUser.getNickname(), metaObject);
        }

    }

}
