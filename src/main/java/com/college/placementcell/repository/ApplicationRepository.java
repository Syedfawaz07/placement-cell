package com.college.placementcell.repository;

import com.college.placementcell.model.Application;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ApplicationRepository extends JpaRepository<Application, Long> {
    
    List<Application> findByStudentId(Long studentId);

    List<Application> findByJobId(Long jobId);
}
