package com.zcy.ias.controller;


import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.zcy.common.core.R;
import com.zcy.ias.entity.SysRecordAttendance;
import com.zcy.ias.service.SysRecordAttendanceService;
import jakarta.annotation.Resource;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * 打卡记录表(SysRecordAttendance)表控制层
 *
 * @author zhuangchongyi
 * @since 2025-04-28 17:25:13
 */
@RestController
@RequestMapping("/sysRecordAttendance")
public class SysRecordAttendanceController {

    @Resource
    private SysRecordAttendanceService sysRecordAttendanceService;

    /**
     * 分页查询所有打卡记录表数据
     *
     * @param page                分页对象
     * @param sysRecordAttendance 查询实体
     * @return 所有数据
     */
    @GetMapping("/page")
    public R<Page<SysRecordAttendance>> page(Page<SysRecordAttendance> page, SysRecordAttendance sysRecordAttendance) {
        return R.ok(this.sysRecordAttendanceService.page(page, new QueryWrapper<>(sysRecordAttendance)));
    }

    /**
     * 通过主键查询单条打卡记录表数据
     *
     * @param id 主键
     * @return 单条数据
     */
    @GetMapping("/get/{id}")
    public R<SysRecordAttendance> get(@PathVariable Long id) {
        return R.ok(this.sysRecordAttendanceService.getById(id));
    }

    /**
     * 新增打卡记录表数据
     *
     * @param sysRecordAttendance 实体对象
     * @return 新增结果
     */
    @PostMapping("/add")
    public R<Boolean> add(@RequestBody SysRecordAttendance sysRecordAttendance) {
        return R.ok(this.sysRecordAttendanceService.save(sysRecordAttendance));
    }

    /**
     * 修改打卡记录表数据
     *
     * @param sysRecordAttendance 实体对象
     * @return 修改结果
     */
    @PutMapping("/edit")
    public R<Boolean> edit(@RequestBody SysRecordAttendance sysRecordAttendance) {
        return R.ok(this.sysRecordAttendanceService.updateById(sysRecordAttendance));
    }

    /**
     * 删除打卡记录表数据
     *
     * @param idList 主键结合
     * @return 删除结果
     */
    @DeleteMapping("/remove")
    public R<Boolean> delete(@RequestParam("idList") List<Long> idList) {
        return R.ok(this.sysRecordAttendanceService.removeByIds(idList));
    }
}

