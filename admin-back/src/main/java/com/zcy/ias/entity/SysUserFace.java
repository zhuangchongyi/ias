package com.zcy.ias.entity;

import com.baomidou.mybatisplus.annotation.*;
import jakarta.validation.constraints.NotEmpty;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.Accessors;

import java.time.LocalDateTime;

/**
 * 用户人脸记录表(SysUserFace)表实体类
 *
 * @author zhuangchongyi
 * @since 2025-04-12 16:31:09
 */
@Data
@Accessors(chain = true)
@NoArgsConstructor
@TableName("sys_user_face")
public class SysUserFace {
    /**
     * ID
     */
    @TableId
    private Long id;
    /**
     * 用户ID
     */
    private Long userId;
    /**
     * 文件地址url
     */
    @NotEmpty(message = "文件地址url不能为空")
    private String fileUrl;
    /**
     * 人脸数据ID
     */
    @NotEmpty(message = "人脸数据ID不能为空")
    private String faceId;
    /**
     * 创建人ID
     */
    @TableField(fill = FieldFill.INSERT)
    private Long createId;
    /**
     * 创建人名称
     */
    @TableField(fill = FieldFill.INSERT)
    private String createBy;
    /**
     * 创建时间
     */
    @TableField(fill = FieldFill.INSERT)
    private LocalDateTime createTime;
    /**
     * 更新人ID
     */
    @TableField(fill = FieldFill.UPDATE)
    private Long updateId;
    /**
     * 更新人名称
     */
    @TableField(fill = FieldFill.UPDATE)
    private String updateBy;
    /**
     * 更新时间
     */
    @TableField(fill = FieldFill.UPDATE)
    private LocalDateTime updateTime;
    /**
     * 是否删除（0否 1是）
     */
    @TableLogic(value = "0", delval = "1")
    private Integer delFlag;

}

