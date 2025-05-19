package com.college.placementcell.repository;

import com.college.placementcell.model.Admin;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AdminRepository extends JpaRepository<Admin, Long> {
    Admin findByUsername(String username); // Optional custom method
}
