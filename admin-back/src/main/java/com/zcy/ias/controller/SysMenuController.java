package com.zcy.ias.controller;


import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.zcy.common.core.R;
import com.zcy.ias.entity.SysMenu;
import com.zcy.ias.service.SysMenuService;
import jakarta.annotation.Resource;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * 菜单权限表(SysMenu)表控制层
 *
 * @author zhuangchongyi
 * @since 2025-03-29 15:53:25
 */
@RestController
@RequestMapping("/sysMenu")
public class SysMenuController {

    @Resource
    private SysMenuService sysMenuService;

    /**
     * 分页查询所有菜单权限表数据
     *
     * @param page    分页对象
     * @param sysMenu 查询实体
     * @return 所有数据
     */
    @GetMapping("/page")
    public R<Page<SysMenu>> page(Page<SysMenu> page, SysMenu sysMenu) {
        return R.ok(this.sysMenuService.page(page, new QueryWrapper<>(sysMenu)));
    }

    /**
     * 通过主键查询单条菜单权限表数据
     *
     * @param id 主键
     * @return 单条数据
     */
    @GetMapping("/get/{id}")
    public R<SysMenu> selectOne(@PathVariable Integer id) {
        return R.ok(this.sysMenuService.getById(id));
    }

    /**
     * 新增菜单权限表数据
     *
     * @param sysMenu 实体对象
     * @return 新增结果
     */
    @PostMapping("/add")
    public R<Boolean> add(@RequestBody SysMenu sysMenu) {
        return R.ok(this.sysMenuService.save(sysMenu));
    }

    /**
     * 修改菜单权限表数据
     *
     * @param sysMenu 实体对象
     * @return 修改结果
     */
    @PutMapping("/edit")
    public R<Boolean> edit(@RequestBody SysMenu sysMenu) {
        return R.ok(this.sysMenuService.updateById(sysMenu));
    }

    /**
     * 删除菜单权限表数据
     *
     * @param idList 主键结合
     * @return 删除结果
     */
    @DeleteMapping("/remove")
    public R<Boolean> delete(@RequestParam("idList") List<Long> idList) {
        return R.ok(this.sysMenuService.removeByIds(idList));
    }
}

