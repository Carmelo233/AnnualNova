package com.annualreportsystem;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@ComponentScan(basePackages ={"com.annualreportsystem.*"})
@SpringBootApplication
public class AnnualReportSystemApplication {

    public static void main(String[] args) {
        SpringApplication.run(AnnualReportSystemApplication.class, args);
    }

}
