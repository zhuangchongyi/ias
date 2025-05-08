package com.zcy.ias.controller;


import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.zcy.common.core.R;
import com.zcy.ias.entity.SysRecordRepair;
import com.zcy.ias.service.SysRecordRepairService;
import jakarta.annotation.Resource;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * 补卡记录表(SysRecordRepair)表控制层
 *
 * @author zhuangchongyi
 * @since 2025-04-28 17:25:13
 */
@RestController
@RequestMapping("/sysRecordRepair")
public class SysRecordRepairController {

    @Resource
    private SysRecordRepairService sysRecordRepairService;

    /**
     * 分页查询所有补卡记录表数据
     *
     * @param page            分页对象
     * @param sysRecordRepair 查询实体
     * @return 所有数据
     */
    @GetMapping("/page")
    public R<Page<SysRecordRepair>> page(Page<SysRecordRepair> page, SysRecordRepair sysRecordRepair) {
        return R.ok(this.sysRecordRepairService.page(page, new QueryWrapper<>(sysRecordRepair)));
    }

    /**
     * 通过主键查询单条补卡记录表数据
     *
     * @param id 主键
     * @return 单条数据
     */
    @GetMapping("/get/{id}")
    public R<SysRecordRepair> get(@PathVariable Long id) {
        return R.ok(this.sysRecordRepairService.getById(id));
    }

    /**
     * 新增补卡记录表数据
     *
     * @param sysRecordRepair 实体对象
     * @return 新增结果
     */
    @PostMapping("/add")
    public R<Boolean> add(@RequestBody SysRecordRepair sysRecordRepair) {
        return R.ok(this.sysRecordRepairService.save(sysRecordRepair));
    }

    /**
     * 修改补卡记录表数据
     *
     * @param sysRecordRepair 实体对象
     * @return 修改结果
     */
    @PutMapping("/edit")
    public R<Boolean> edit(@RequestBody SysRecordRepair sysRecordRepair) {
        return R.ok(this.sysRecordRepairService.updateById(sysRecordRepair));
    }

    /**
     * 删除补卡记录表数据
     *
     * @param idList 主键结合
     * @return 删除结果
     */
    @DeleteMapping("/remove")
    public R<Boolean> delete(@RequestParam("idList") List<Long> idList) {
        return R.ok(this.sysRecordRepairService.removeByIds(idList));
    }
}

