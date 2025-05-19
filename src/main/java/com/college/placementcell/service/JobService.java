package com.college.placementcell.service;

import com.college.placementcell.model.Job;
import com.college.placementcell.repository.JobRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class JobService {

    private final JobRepository jobRepository;

    public List<Job> getAllJobs() {
        return jobRepository.findAll();
    }

    public Optional<Job> getJobById(Long id) {
        return jobRepository.findById(id);
    }

    public Job createJob(Job job) {
        return jobRepository.save(job);
    }

    public Job updateJob(Long id, Job updatedJob) {
        return jobRepository.findById(id)
                .map(existingJob -> {
                    existingJob.setTitle(updatedJob.getTitle());
                    existingJob.setDescription(updatedJob.getDescription());
                    existingJob.setLocation(updatedJob.getLocation());
                    existingJob.setSalary(updatedJob.getSalary());
                    existingJob.setCompany(updatedJob.getCompany());
                    return jobRepository.save(existingJob);
                })
                .orElseThrow(() -> new RuntimeException("Job not found with id: " + id));
    }

    public void deleteJob(Long id) {
        jobRepository.deleteById(id);
    }
}
