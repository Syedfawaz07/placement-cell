package com.college.placement_cell;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@EnableJpaRepositories(basePackages = "com.college.placementcell.repository")
@EntityScan(basePackages = "com.college.placementcell.model")
@ComponentScan(basePackages = "com.college.placementcell")
public class PlacementCellApplication {
    public static void main(String[] args) {
        SpringApplication.run(PlacementCellApplication.class, args);
    }
}
