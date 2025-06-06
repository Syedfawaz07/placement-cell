package com.college.placementcell.repository;

import com.college.placementcell.model.Company;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;


public interface CompanyRepository extends JpaRepository<Company, Long> {
	List<Company> findAllByName(String name);

}
