package com.zcy.ias.controller;


import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.zcy.common.core.R;
import com.zcy.common.utils.SecurityUtils;
import com.zcy.ias.entity.SysUser;
import com.zcy.ias.entity.SysUserFace;
import com.zcy.ias.service.SysUserFaceService;
import com.zcy.ias.service.SysUserService;
import com.zcy.ias.vo.SysFileVO;
import jakarta.annotation.Resource;
import jakarta.validation.Valid;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

/**
 * 用户表(SysUser)表控制层
 *
 * @author zhuangchongyi
 * @since 2025-03-25 18:23:13
 */
@Validated
@RestController
@RequestMapping("/sysUser")
public class SysUserController {

    @Resource
    private SysUserService sysUserService;

    @Resource
    private SysUserFaceService sysUserFaceService;

    /**
     * 分页查询所有用户表数据
     *
     * @param page    分页对象
     * @param sysUser 查询实体
     * @return 所有数据
     */
    @GetMapping("/page")
    public R<Page<SysUser>> page(Page<SysUser> page, SysUser sysUser) {
        LambdaQueryWrapper<SysUser> queryWrapper = new LambdaQueryWrapper<>(sysUser);
        queryWrapper.orderByAsc(SysUser::getId);
        return R.ok(this.sysUserService.page(page, queryWrapper));
    }

    /**
     * 通过主键查询单条用户表数据
     *
     * @param id 主键
     * @return 单条数据
     */
    @GetMapping("/get/{id}")
    public R<SysUser> get(@PathVariable Integer id) {
        return R.ok(this.sysUserService.getById(id));
    }

    /**
     * 新增用户表数据
     *
     * @param sysUser 实体对象
     * @return 新增结果
     */
    @PostMapping("/add")
    public R<Boolean> add(@RequestBody @Validated SysUser sysUser) {
        sysUser.setPassword(SecurityUtils.encryptPassword(sysUser.getPassword()));
        return R.ok(this.sysUserService.save(sysUser));
    }

    /**
     * 修改用户表数据
     *
     * @param sysUser 实体对象
     * @return 修改结果
     */
    @PutMapping("/edit")
    public R<Boolean> edit(@RequestBody @Validated SysUser sysUser) {
        return R.ok(this.sysUserService.updateById(sysUser));
    }

    /**
     * 删除用户表数据
     *
     * @param idList 主键结合
     * @return 删除结果
     */
    @DeleteMapping("/remove")
    public R<Boolean> delete(@RequestParam("idList") List<Long> idList) {
        return R.ok(this.sysUserService.removeByIds(idList));
    }

    /**
     * 上传用户人脸
     *
     * @param list 数据
     */
    @PostMapping("/addUserFace")
    public R<Boolean> addUserFace(@RequestParam("userId") Long userId,
                                  @RequestBody @Valid List<SysUserFace> list) {
        return R.ok(this.sysUserFaceService.addUserFace(userId, list));
    }

    /**
     * 获取用户人脸
     */
    @GetMapping("/getUserFace")
    public R<List<SysUserFace>> getUserFace(@RequestParam("userId") Long userId) {
        return R.ok(this.sysUserFaceService.getUserFace(userId));
    }

    /**
     * 上传用户人脸
     *
     * @param file 人脸图像数据
     */
    @PostMapping("/uploadUserFace")
    public R<SysFileVO> uploadUserFace(@RequestParam("userId") Long userId,
                                       @RequestParam("file") MultipartFile file) {
        return R.ok(this.sysUserFaceService.uploadUserFace(userId, file));
    }

}

