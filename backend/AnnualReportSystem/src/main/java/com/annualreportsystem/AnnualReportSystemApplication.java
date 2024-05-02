package com.annualreportsystem;

import org.apache.ibatis.annotations.Mapper;
import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.scheduling.annotation.EnableScheduling;

//@ComponentScan(basePackages ={"com.annualreportsystem.*"})
@SpringBootApplication
@EnableScheduling
@MapperScan(basePackages = "com.annualreportsystem.mapper", annotationClass = Mapper.class)
public class AnnualReportSystemApplication {

    public static void main(String[] args) {
        SpringApplication.run(AnnualReportSystemApplication.class, args);
    }

}
