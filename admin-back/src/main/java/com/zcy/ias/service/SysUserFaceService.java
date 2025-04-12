package com.zcy.ias.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.zcy.ias.entity.SysUserFace;

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
    Boolean addUserFace(Long userId, List<String> list);

    /**
     * 获取用户人脸
     */
    List<String> getUserFace(Long userId);
}

