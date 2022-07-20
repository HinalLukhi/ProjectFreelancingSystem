package com.example.demo.Models;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.LinkedHashSet;
import java.util.Set;

@Entity
@Table(name = "skilllevel")
@Getter
@Setter
public class Skilllevel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "skill_level_id", nullable = false)
    private Integer id;

    @Column(name = "skill_name", nullable = false, length = 20)
    private String skillName;

    @OneToMany(mappedBy = "skillLevel")
    @JsonManagedReference
    private Set<Project> projectSkill;
}