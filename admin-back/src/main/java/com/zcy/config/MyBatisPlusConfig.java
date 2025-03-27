package com.zcy.config;

import com.baomidou.mybatisplus.annotation.DbType;
import com.baomidou.mybatisplus.extension.plugins.MybatisPlusInterceptor;
import com.baomidou.mybatisplus.extension.plugins.inner.OptimisticLockerInnerInterceptor;
import com.baomidou.mybatisplus.extension.plugins.inner.PaginationInnerInterceptor;
import org.mybatis.spring.annotation.MapperScan;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

/**
 * Mybatis支持*匹配扫描包
 *
 * @author ruoyi
 */
@MapperScan("com.zcy.**.mapper")
@Configuration
public class MyBatisPlusConfig {

    @Bean
    public MybatisPlusInterceptor mybatisPlusInterceptor() {
        /*
        自动分页: PaginationInnerInterceptor
        多租户: TenantLineInnerInterceptor
        动态表名: DynamicTableNameInnerInterceptor
        乐观锁: OptimisticLockerInnerInterceptor
        sql 性能规范: IllegalSQLInnerInterceptor
        防止全表更新与删除: BlockAttackInnerInterceptor
        */
        MybatisPlusInterceptor interceptor = new MybatisPlusInterceptor();
        // 乐观锁插件
        interceptor.addInnerInterceptor(new OptimisticLockerInnerInterceptor());
        // 分页插件
        interceptor.addInnerInterceptor(new PaginationInnerInterceptor(DbType.MYSQL));
        return interceptor;
    }


}