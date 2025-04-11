package com.zcy.ias.entity;

import com.baomidou.mybatisplus.annotation.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

/**
 * 文件表(SysFile)表实体类
 *
 * @author zhuangchongyi
 * @since 2025-04-09 17:54:35
 */
@Data
@NoArgsConstructor
@TableName("sys_file")
public class SysFile {
    /**
     * 文件ID
     */
    @TableId(type = IdType.ASSIGN_ID)
    private Long id;
    /**
     * 文件名称
     */
    private String fileName;
    /**
     * 文件大小(B)
     */
    private Long fileSize;
    /**
     * 文件类型
     */
    private String fileType;
    /**
     * 文件哈希值ID
     */
    private String fileId;
    /**
     * 文件数据
     */
    private byte[] fileData;
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

