package com.college.placementcell.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Company {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private String location;

    @Column(unique = true, nullable = false)
    private String name;

    private String description;

    private String website;

    @OneToOne
    private User user;
}
