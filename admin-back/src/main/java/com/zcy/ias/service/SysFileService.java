package com.zcy.ias.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.zcy.ias.entity.SysFile;
import com.zcy.ias.vo.SysFileVO;
import org.springframework.web.multipart.MultipartFile;

/**
 * 文件表(SysFile)表服务接口
 *
 * @author zhuangchongyi
 * @since 2025-04-09 17:54:35
 */
public interface SysFileService extends IService<SysFile> {

    /**
     * 文件上传保存
     */
    SysFileVO fileUpload(MultipartFile file);

}

