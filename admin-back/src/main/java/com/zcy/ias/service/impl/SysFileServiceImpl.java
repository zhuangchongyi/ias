package com.zcy.ias.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.zcy.common.exception.ServiceException;
import com.zcy.common.utils.FileUtils;
import com.zcy.common.utils.StringUtils;
import com.zcy.ias.entity.SysFile;
import com.zcy.ias.mapper.SysFileMapper;
import com.zcy.ias.service.SysFileService;
import com.zcy.ias.vo.SysFileVO;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

/**
 * 文件表(SysFile)表服务实现类
 *
 * @author zhuangchongyi
 * @since 2025-04-09 17:54:35
 */
@Service
public class SysFileServiceImpl extends ServiceImpl<SysFileMapper, SysFile> implements SysFileService {

    @Override
    public SysFileVO fileUpload(MultipartFile file) {
        try {
            String originalFilename = file.getOriginalFilename();
            SysFileVO sysFile = new SysFileVO();
            sysFile.setFileName(FileUtils.getFileName(originalFilename));
            sysFile.setFileType(FileUtils.getFileType(originalFilename));
            sysFile.setFileSize(file.getSize());
            byte[] fileData = file.getBytes();
            sysFile.setFileData(fileData);
            sysFile.setFileId(FileUtils.calculateFileHash(fileData));
            this.save(sysFile);
            sysFile.setFileUrl(StringUtils.format("/api/common/file/preview/{}.{}", sysFile.getId(), sysFile.getFileType()));
            return sysFile;
        } catch (Exception e) {
            throw new ServiceException(e.getMessage());
        }
    }
}

