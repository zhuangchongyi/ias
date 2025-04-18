package com.zcy.ias.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.zcy.common.core.R;
import com.zcy.common.exception.ServiceException;
import com.zcy.common.utils.StringUtils;
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
    private FaceServerClient faceServerClient;
    @Resource
    private SysFileService sysFileService;

    @Transactional(rollbackFor = Exception.class)
    @Override
    public Boolean addUserFace(Long userId, List<SysUserFace> list) {
        List<Long> oldIdList = list.stream().map(SysUserFace::getId).filter(Objects::nonNull).toList();
        List<SysUserFace> oldList = this.list(new LambdaQueryWrapper<SysUserFace>()
                .select(SysUserFace::getId)
                .eq(SysUserFace::getUserId, userId)
                .notIn(StringUtils.isNotEmpty(oldIdList), SysUserFace::getId, oldIdList));
        // 删除旧数据
        if (StringUtils.isNotEmpty(oldList)) {
            this.removeByIds(oldList.stream().map(SysUserFace::getId).toList());
            faceServerClient.deleteFace(userId, oldList.stream().map(SysUserFace::getFaceId).toList());
        }
        // 新增数据
        List<SysUserFace> faceList = list.stream()
                .filter(item -> Objects.isNull(item.getId()))
                .peek(sysUserFace -> sysUserFace.setUserId(userId))
                .toList();
        if (StringUtils.isNotEmpty(faceList)) {
            return this.saveBatch(faceList);
        }
        return false;
    }

    @Override
    public List<SysUserFace> getUserFace(Long userId) {
        return this.list(new LambdaQueryWrapper<SysUserFace>()
                .eq(SysUserFace::getUserId, userId));
    }

    @Override
    public SysFileVO uploadUserFace(Long userId, MultipartFile file) {
        // 验证注册人脸
        R<?> validR = faceServerClient.registerFace(userId, file);
        if (validR.isSuccess() && Objects.nonNull(validR.getData())) {
            // 文件上传
            SysFileVO sysFileVO = sysFileService.fileUpload(file);
            // 保存人脸数据ID
            sysFileVO.setOtherData(validR.getData());
            return sysFileVO;
        } else {
            throw new ServiceException(validR.getMsg());
        }
    }

    @Override
    public R<Object> checkFaceExists(Long userId, MultipartFile file) {
        // 验证人脸是否存在
        R<?> validR = faceServerClient.compareFace(userId, file);
        if (validR.isSuccess() && Optional.ofNullable(validR.getData())
                .map(o -> Boolean.parseBoolean(o.toString()))
                .orElse(false)) {
            return R.ok(validR.getData());
        } else {
            return R.fail(validR.getMsg());
        }
    }
}

