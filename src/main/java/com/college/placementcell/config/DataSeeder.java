package com.college.placementcell.config;

import com.college.placementcell.model.*;
import com.college.placementcell.repository.*;
import java.util.List;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.transaction.annotation.Transactional;

@Configuration
public class DataSeeder {

    private static final Logger logger = LoggerFactory.getLogger(DataSeeder.class);

    @Bean
    @Transactional
    CommandLineRunner initDatabase(UserRepository userRepository,
                                 CompanyRepository companyRepository,
                                 JobRepository jobRepository,
                                 StudentRepository studentRepository,
                                 PasswordEncoder passwordEncoder) {
        return args -> {
            try {
                seedAdminUser(userRepository, passwordEncoder);
                Company company = seedSampleCompany(companyRepository);
                seedSampleJob(jobRepository, company);
                seedSampleStudent(userRepository, studentRepository, passwordEncoder);
                logger.info("Data seeding completed successfully");
            } catch (Exception e) {
                logger.error("Error during data seeding: {}", e.getMessage());
                throw e;
            }
        };
    }

    private void seedAdminUser(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        Optional<User> existingAdmin = userRepository.findByEmail("admin@college.com");
        if (existingAdmin.isPresent()) {
            logger.info("Admin user already exists");
            return;
        }

        User admin = new User();
        admin.setEmail("admin@college.com");
        admin.setPassword(passwordEncoder.encode("admin123"));
        admin.setRole(Role.ADMIN);
        admin.setUsername("admin");
        userRepository.save(admin);
        logger.info("Admin user created successfully");
    }

    private Company seedSampleCompany(CompanyRepository companyRepository) {
        List<Company> existingCompanies = companyRepository.findAllByName("TechCorp");
        if (!existingCompanies.isEmpty()) {
            logger.info("Using existing company ({} found)", existingCompanies.size());
            return existingCompanies.get(0); // Return first match
        }

        Company company = new Company();
        company.setName("TechCorp");
        company.setLocation("Bangalore");
        company.setDescription("Leading tech company");
        company.setWebsite("www.techcorp.com");
        return companyRepository.save(company);
    }

    private void seedSampleJob(JobRepository jobRepository, Company company) {
        Optional<Job> existingJob = jobRepository.findByTitleAndCompany("Software Engineer", company);
        if (existingJob.isPresent()) {
            logger.info("Sample job already exists for company {}", company.getName());
            return;
        }

        Job job = new Job();
        job.setTitle("Software Engineer");
        job.setDescription("Java backend development role");
        job.setCompany(company);
        job.setSalary("8 LPA");
        job.setLocation("Bangalore");
        job.setPostedDate(java.time.LocalDate.now());
        jobRepository.save(job);
        logger.info("Sample job created for company {}", company.getName());
    }

    private void seedSampleStudent(UserRepository userRepository, 
                                 StudentRepository studentRepository,
                                 PasswordEncoder passwordEncoder) {
        Optional<Student> existingStudent = studentRepository.findByEmail("student@college.com");
        if (existingStudent.isPresent()) {
            logger.info("Sample student already exists");
            return;
        }

        // Create user account first
        User studentUser = new User();
        studentUser.setEmail("student@college.com");
        studentUser.setPassword(passwordEncoder.encode("student123"));
        studentUser.setRole(Role.STUDENT);
        studentUser.setUsername("student1");
        userRepository.save(studentUser);

        // Then create student profile
        Student student = new Student();
        student.setName("Fawaz Syed");
        student.setEmail("student@college.com");
        student.setCourse("B.Tech CSE");
        student.setDepartment("Computer Science");
        student.setCgpa(8.5f);
        student.setUser(studentUser);
        studentRepository.save(student);
        logger.info("Sample student and user account created");
    }
}