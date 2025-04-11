package com.zcy.ias.vo;

import lombok.Data;

import java.io.Serial;
import java.io.Serializable;

@Data
public class FileVO implements Serializable {
    @Serial
    private static final long serialVersionUID = 1L;
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
     * 文件访问地址
     */
    private String fileUrl;
    /**
     * 文件哈希值ID
     */
    private String fileId;

}
