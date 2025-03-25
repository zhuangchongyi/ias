package com.zcy.ias;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@MapperScan("com.zcy.**.mapper")
@SpringBootApplication
public class IASystemApplication {

    public static void main(String[] args) {
        SpringApplication.run(IASystemApplication.class, args);
    }

}
