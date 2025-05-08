package com.zcy.ias.controller;


import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.zcy.common.core.R;
import com.zcy.ias.entity.SysRole;
import com.zcy.ias.service.SysRoleService;
import jakarta.annotation.Resource;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * 角色表(SysRole)表控制层
 *
 * @author zhuangchongyi
 * @since 2025-04-09 17:44:07
 */
@RestController
@RequestMapping("/sysRole")
public class SysRoleController {

    @Resource
    private SysRoleService sysRoleService;

    /**
     * 分页查询所有角色表数据
     *
     * @param page    分页对象
     * @param sysRole 查询实体
     * @return 所有数据
     */
    @GetMapping("/page")
    public R<Page<SysRole>> page(Page<SysRole> page, SysRole sysRole) {
        LambdaQueryWrapper<SysRole> queryWrapper = new LambdaQueryWrapper<>(sysRole);
        queryWrapper.orderByAsc(SysRole::getOrderNum, SysRole::getId);
        return R.ok(this.sysRoleService.page(page, queryWrapper));
    }

    /**
     * 通过主键查询单条角色表数据
     *
     * @param id 主键
     * @return 单条数据
     */
    @GetMapping("/get/{id}")
    public R<SysRole> get(@PathVariable Long id) {
        return R.ok(this.sysRoleService.getById(id));
    }

    /**
     * 新增角色表数据
     *
     * @param sysRole 实体对象
     * @return 新增结果
     */
    @PostMapping("/add")
    public R<Boolean> add(@RequestBody SysRole sysRole) {
        return R.ok(this.sysRoleService.save(sysRole));
    }

    /**
     * 修改角色表数据
     *
     * @param sysRole 实体对象
     * @return 修改结果
     */
    @PutMapping("/edit")
    public R<Boolean> edit(@RequestBody SysRole sysRole) {
        return R.ok(this.sysRoleService.updateById(sysRole));
    }

    /**
     * 删除角色表数据
     *
     * @param idList 主键结合
     * @return 删除结果
     */
    @DeleteMapping("/remove")
    public R<Boolean> delete(@RequestParam("idList") List<Long> idList) {
        return R.ok(this.sysRoleService.removeByIds(idList));
    }
}

