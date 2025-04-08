package com.zcy.ias.controller;


import com.zcy.common.core.R;
import com.zcy.common.core.entity.LoginBody;
import com.zcy.ias.service.AuthService;
import com.zcy.ias.vo.SysUserVO;
import jakarta.annotation.Resource;
import org.springframework.web.bind.annotation.*;

/**
 * 认证控制器
 *
 * @author zhuangchongyi
 * @since 2025-03-26 03:43:15
 */
@RestController
@RequestMapping("/auth")
public class AuthController {
    @Resource
    private AuthService authService;

    /**
     * 用户登录接口
     *
     * @return token
     */
    @PostMapping("/login")
    public R<String> login(@RequestBody LoginBody loginBody) {
        return R.ok(authService.login(loginBody));
    }

    /**
     * 获取用户明细信息
     */
    @GetMapping("/getInfo")
    public R<SysUserVO> getInfo() {
        return R.ok(authService.getInfo());
    }

}

