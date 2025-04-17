package com.zcy.ias.controller;


import com.zcy.common.core.R;
import com.zcy.ias.service.SysUserFaceService;
import jakarta.annotation.Resource;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

/**
 * 移动端API接口
 *
 * @author zhuangchongyi
 * @since 2025-04-17 06:31:06
 */
@Validated
@RestController
@RequestMapping("/mobile")
public class MobileController {

    @Resource
    private SysUserFaceService sysUserFaceService;

    /**
     * 上传用户人脸校验是否存在
     *
     * @param file 人脸图像数据
     */
    @PostMapping("/checkFaceExists")
    public R<Object> checkFaceExists(@RequestParam("userId") Long userId,
                                     MultipartFile file) {
        return R.ok(this.sysUserFaceService.checkFaceExists(userId, file));
    }

}

