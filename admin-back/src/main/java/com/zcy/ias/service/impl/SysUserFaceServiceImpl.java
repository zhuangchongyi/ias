package com.zcy.ias.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.zcy.ias.entity.SysUserFace;
import com.zcy.ias.mapper.SysUserFaceMapper;
import com.zcy.ias.service.SysUserFaceService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * 用户人脸记录表(SysUserFace)表服务实现类
 *
 * @author zhuangchongyi
 * @since 2025-04-12 16:31:09
 */
@Service
public class SysUserFaceServiceImpl extends ServiceImpl<SysUserFaceMapper, SysUserFace> implements SysUserFaceService {

    @Transactional(rollbackFor = Exception.class)
    @Override
    public Boolean addUserFace(Long userId, List<String> list) {
        List<SysUserFace> faceList = list.stream().map(fileUrl -> new SysUserFace().setUserId(userId).setFileUrl(fileUrl)).toList();
        this.remove(new LambdaQueryWrapper<SysUserFace>()
                .eq(SysUserFace::getUserId, userId)
                .notIn(SysUserFace::getFileUrl, list));
        return this.saveBatch(faceList);
    }

    @Override
    public List<String> getUserFace(Long userId) {
        return this.list(new LambdaQueryWrapper<SysUserFace>()
                        .select(SysUserFace::getFileUrl)
                        .eq(SysUserFace::getUserId, userId))
                .stream()
                .map(SysUserFace::getFileUrl)
                .toList();
    }
}

