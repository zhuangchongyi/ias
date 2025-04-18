package com.zcy.ias.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.zcy.common.core.R;
import com.zcy.common.exception.ServiceException;
import com.zcy.ias.client.FaceServerClient;
import com.zcy.ias.entity.SysUserFace;
import com.zcy.ias.mapper.SysUserFaceMapper;
import com.zcy.ias.service.SysFileService;
import com.zcy.ias.service.SysUserFaceService;
import com.zcy.ias.vo.SysFileVO;
import jakarta.annotation.Resource;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Objects;
import java.util.Optional;

/**
 * 用户人脸记录表(SysUserFace)表服务实现类
 *
 * @author zhuangchongyi
 * @since 2025-04-12 16:31:09
 */
@Service
public class SysUserFaceServiceImpl extends ServiceImpl<SysUserFaceMapper, SysUserFace> implements SysUserFaceService {
    @Resource
    private FaceServerClient faceServer;
    @Resource
    private SysFileService fileService;

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

    @Override
    public SysFileVO uploadUserFace(Long userId, MultipartFile file) {
        R<?> validR = faceServer.registerFace(userId, file);
        if (validR.isSuccess() && Objects.nonNull(validR.getData())) {
            return fileService.fileUpload(file);
        } else {
            throw new ServiceException(validR.getMsg());
        }
    }

    @Override
    public R<Object> checkFaceExists(Long userId, MultipartFile file) {
        R<?> validR = faceServer.compareFace(userId, file);
        if (validR.isSuccess() && Optional.ofNullable(validR.getData())
                .map(o -> Boolean.parseBoolean(o.toString()))
                .orElse(false)) {
            return R.ok(validR.getData());
        } else {
            throw new ServiceException(validR.getMsg());
        }
    }
}

