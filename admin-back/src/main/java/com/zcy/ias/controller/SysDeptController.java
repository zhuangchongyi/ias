package com.zcy.ias.controller;


import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.zcy.common.core.R;
import com.zcy.common.emuns.IEnums;
import com.zcy.ias.entity.SysDept;
import com.zcy.ias.service.SysDeptService;
import jakarta.annotation.Resource;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * 部门表(SysDept)表控制层
 *
 * @author zhuangchongyi
 * @since 2025-04-09 17:44:07
 */
@RestController
@RequestMapping("/sysDept")
public class SysDeptController {

    @Resource
    private SysDeptService sysDeptService;

    /**
     * 查询所有部门表列表数据
     *
     * @param sysDept 查询实体
     * @return 所有数据
     */
    @GetMapping("/list")
    public R<List<SysDept>> list(SysDept sysDept) {
        LambdaQueryWrapper<SysDept> queryWrapper = new LambdaQueryWrapper<>(sysDept);
        queryWrapper.orderByAsc(SysDept::getOrderNum, SysDept::getId);
        return R.ok(this.sysDeptService.list(queryWrapper));
    }

    /**
     * 查询所有部门表启用列表数据
     *
     * @param sysDept 查询实体
     * @return 所有数据
     */
    @GetMapping("/enableList")
    public R<List<SysDept>> enableList(SysDept sysDept) {
        LambdaQueryWrapper<SysDept> queryWrapper = new LambdaQueryWrapper<>(sysDept);
        queryWrapper.eq(SysDept::getStatus, IEnums.YES);
        queryWrapper.orderByAsc(SysDept::getOrderNum, SysDept::getId);
        return R.ok(this.sysDeptService.list(queryWrapper));
    }

    /**
     * 通过主键查询单条部门表数据
     *
     * @param id 主键
     * @return 单条数据
     */
    @GetMapping("/get/{id}")
    public R<SysDept> selectOne(@PathVariable Long id) {
        return R.ok(this.sysDeptService.getById(id));
    }

    /**
     * 新增部门表数据
     *
     * @param sysDept 实体对象
     * @return 新增结果
     */
    @PostMapping("/add")
    public R<Boolean> add(@RequestBody SysDept sysDept) {
        return R.ok(this.sysDeptService.save(sysDept));
    }

    /**
     * 修改部门表数据
     *
     * @param sysDept 实体对象
     * @return 修改结果
     */
    @PutMapping("/edit")
    public R<Boolean> edit(@RequestBody SysDept sysDept) {
        return R.ok(this.sysDeptService.updateById(sysDept));
    }

    /**
     * 删除部门表数据
     *
     * @param idList 主键结合
     * @return 删除结果
     */
    @DeleteMapping("/remove")
    public R<Boolean> delete(@RequestParam("idList") List<Long> idList) {
        return R.ok(this.sysDeptService.removeByIds(idList));
    }
}

