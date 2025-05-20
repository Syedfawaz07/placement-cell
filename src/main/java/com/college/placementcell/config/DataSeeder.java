package com.college.placementcell.config;

import com.college.placementcell.model.*;
import com.college.placementcell.repository.*;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class DataSeeder {

    @Bean
    CommandLineRunner initDatabase(UserRepository userRepo,
                                   CompanyRepository companyRepo,
                                   JobRepository jobRepo,
                                   StudentRepository studentRepo) {
        return args -> {
            // Add a sample admin user
            if (userRepo.findByEmail("admin@college.com").isEmpty()) {
                User admin = new User();
                admin.setEmail("admin@college.com");
                admin.setPassword("admin123"); // You may hash this in real app
                admin.setRole(Role.ADMIN);
                userRepo.save(admin);
            }

            // Add sample company
            Company comp = new Company();
            comp.setName("TechCorp");
            comp.setLocation("Bangalore");
            comp.setDescription("Leading tech company");
            companyRepo.save(comp);

            // Add sample job
            Job job = new Job();
            job.setTitle("Software Engineer");
            job.setDescription("Java backend role");
            job.setCompany(comp);
            job.setSalary("8 LPA");
            jobRepo.save(job);

            // Add sample student
            Student stu = new Student();
            stu.setName("Fawaz Syed");
            stu.setEmail("student@college.com");
            stu.setCourse("B.Tech CSE");
            studentRepo.save(stu);
        };
    }
}
