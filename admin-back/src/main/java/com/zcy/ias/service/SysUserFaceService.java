package com.zcy.ias.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.zcy.common.core.R;
import com.zcy.ias.entity.SysUserFace;
import com.zcy.ias.vo.SysFileVO;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

/**
 * 用户人脸记录表(SysUserFace)表服务接口
 *
 * @author zhuangchongyi
 * @since 2025-04-12 16:31:09
 */
public interface SysUserFaceService extends IService<SysUserFace> {
    /**
     * 上传用户人脸
     */
    Boolean addUserFace(Long userId, List<SysUserFace> list);

    /**
     * 获取用户人脸
     */
    List<SysUserFace> getUserFace(Long userId);

    /**
     * 上传用户人脸
     */
    SysFileVO uploadUserFace(Long userId, MultipartFile file);

    /**
     * 上传用户人脸校验是否存在
     */
    R<Object> checkFaceExists(Long userId, MultipartFile file);
}

