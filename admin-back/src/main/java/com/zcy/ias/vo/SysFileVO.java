package com.zcy.ias.vo;

import com.zcy.ias.entity.SysFile;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * 文件表(SysFile)VO类
 *
 * @author zhuangchongyi
 * @since 2025-04-12 17:31:56
 */
@Data
@NoArgsConstructor
public class SysFileVO extends SysFile {
    /**
     * 文件地址url
     */
    private String fileUrl;
    /**
     * 其他数据
     */
    private Object otherData;

}

