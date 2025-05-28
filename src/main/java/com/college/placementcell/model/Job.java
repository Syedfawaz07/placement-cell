package com.college.placementcell.model;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.util.Date;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Job {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    
    private String salary;
    
    private String location;

    private String description;

    private Date postedDate;

    @ManyToOne
    private Company company;

	public void setPostedDate(LocalDate now) {
		// TODO Auto-generated method stub
		
	}
}
