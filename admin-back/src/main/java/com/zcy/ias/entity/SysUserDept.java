package com.zcy.ias.entity;

import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * 用户部门表(SysUserDept)表实体类
 *
 * @author zhuangchongyi
 * @since 2025-04-28 17:23:36
 */
@Data
@NoArgsConstructor
@TableName("sys_user_dept")
public class SysUserDept {
    /**用户ID*/
    private Long userId;
    /**部门ID*/
    private Long deptId;

}

