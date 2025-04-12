package com.zcy.ias.controller;


import com.zcy.common.core.R;
import com.zcy.common.utils.FileUtils;
import com.zcy.common.utils.StringUtils;
import com.zcy.ias.service.SysFileService;
import com.zcy.ias.vo.SysFileVO;
import jakarta.annotation.Resource;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.nio.charset.StandardCharsets;
import java.util.Optional;

/**
 * 认证控制器
 *
 * @author zhuangchongyi
 * @since 2025-03-26 03:43:15
 */
@Slf4j
@RestController
@RequestMapping("/common")
public class CommonController {
    @Resource
    private SysFileService sysFileService;

    /**
     * 用户登录接口
     *
     * @return token
     */
    @PostMapping("/file/upload")
    public R<SysFileVO> login(MultipartFile file) throws Exception {
        String originalFilename = file.getOriginalFilename();
        if (originalFilename == null) {
            return R.fail("文件名格式不正确");
        }
        SysFileVO sysFile = new SysFileVO();
        sysFile.setFileName(FileUtils.getFileName(originalFilename));
        sysFile.setFileType(FileUtils.getFileType(originalFilename));
        sysFile.setFileSize(file.getSize());
        byte[] fileData = file.getBytes();
        sysFile.setFileData(fileData);
        sysFile.setFileId(FileUtils.calculateFileHash(fileData));
        sysFileService.save(sysFile);
        sysFile.setFileUrl(StringUtils.format("/api/common/file/preview/{}.{}", sysFile.getId(), sysFile.getFileType()));
        return R.ok(sysFile);
    }

    /**
     * 文件预览
     */
    @GetMapping("/file/preview/{fileId}")
    public void filePreview(@PathVariable("fileId") String fileId,
                            HttpServletResponse response) {
        Optional.ofNullable(sysFileService.getById(FileUtils.getFileName(fileId))).ifPresent(sysFile -> {
            try {
                response.setContentType(FileUtils.getContentType(sysFile.getFileType()));
                response.setContentLength(sysFile.getFileData().length);
                response.getOutputStream().write(sysFile.getFileData());
                response.flushBuffer();
            } catch (Exception e) {
                log.error("文件预览失败", e);
            }
        });
    }

    /**
     * 文件下载
     */
    @PostMapping("/file/download/{fileId}")
    public void fileDownload(@PathVariable String fileId, HttpServletResponse response) {
        Optional.ofNullable(sysFileService.getById(FileUtils.getFileName(fileId))).ifPresent(sysFile -> {
            try {
                String fileName = sysFile.getFileName() + StringUtils.DOT + sysFile.getFileType();
                response.setContentType("application/octet-stream; charset=UTF-8");
                response.addHeader("Access-Control-Allow-Origin", "*");
                response.setHeader("Content-Disposition", StringUtils.format("attachment; filename=\"{}\"",
                        java.net.URLEncoder.encode(fileName, StandardCharsets.UTF_8))
                );
                response.setContentLength(sysFile.getFileData().length);
                response.getOutputStream().write(sysFile.getFileData());
                response.flushBuffer();
            } catch (Exception e) {
                log.error("文件下载失败", e);
            }
        });
    }

}

