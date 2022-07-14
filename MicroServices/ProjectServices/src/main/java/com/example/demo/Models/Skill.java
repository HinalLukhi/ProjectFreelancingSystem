package com.example.demo.Models;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.LinkedHashSet;
import java.util.Set;

@Entity
@Table(name = "skills")
@Getter
@Setter
public class Skill {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "skill_id", nullable = false)
    private Integer id;

    @Column(name = "skill_name", length = 20, nullable = false)
    private String skillName;

    @OneToMany(mappedBy = "skill",fetch = FetchType.LAZY)
    @JsonManagedReference
    private Set<Projectskill> projectskills = new LinkedHashSet<>();

    @OneToMany(mappedBy = "skill")
    private Set<Freelancerskill> freelancerskills = new LinkedHashSet<>();
}