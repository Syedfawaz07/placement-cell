package com.college.placementcell.repository;

import com.college.placementcell.model.Job;
import com.college.placementcell.model.Company;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface JobRepository extends JpaRepository<Job, Long> {
	 Optional<Job> findByTitleAndCompany(String title, Company company);
}
