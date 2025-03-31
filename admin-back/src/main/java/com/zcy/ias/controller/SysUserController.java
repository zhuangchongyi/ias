package com.zcy.ias.controller;


import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.zcy.common.core.R;
import com.zcy.ias.entity.SysUser;
import com.zcy.ias.service.SysUserService;
import jakarta.annotation.Resource;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * 系统用户表(SysUser)表控制层
 *
 * @author zhuangchongyi
 * @since 2025-03-25 18:23:13
 */
@RestController
@RequestMapping("/sysUser")
public class SysUserController {

    @Resource
    private SysUserService sysUserService;

    /**
     * 分页查询所有系统用户表数据
     *
     * @param page    分页对象
     * @param sysUser 查询实体
     * @return 所有数据
     */
    @GetMapping("/page")
    public R<Page<SysUser>> page(Page<SysUser> page, SysUser sysUser) {
        return R.ok(this.sysUserService.page(page, new QueryWrapper<>(sysUser)));
    }

    /**
     * 通过主键查询单条系统用户表数据
     *
     * @param id 主键
     * @return 单条数据
     */
    @GetMapping("/get/{id}")
    public R<SysUser> selectOne(@PathVariable Integer id) {
        return R.ok(this.sysUserService.getById(id));
    }

    /**
     * 新增系统用户表数据
     *
     * @param sysUser 实体对象
     * @return 新增结果
     */
    @PostMapping("/add")
    public R<Boolean> add(@RequestBody SysUser sysUser) {
        return R.ok(this.sysUserService.save(sysUser));
    }

    /**
     * 修改系统用户表数据
     *
     * @param sysUser 实体对象
     * @return 修改结果
     */
    @PutMapping("/edit")
    public R<Boolean> edit(@RequestBody SysUser sysUser) {
        return R.ok(this.sysUserService.updateById(sysUser));
    }

    /**
     * 删除系统用户表数据
     *
     * @param idList 主键结合
     * @return 删除结果
     */
    @DeleteMapping("/remove")
    public R<Boolean> delete(@RequestParam("idList") List<Long> idList) {
        return R.ok(this.sysUserService.removeByIds(idList));
    }
}

