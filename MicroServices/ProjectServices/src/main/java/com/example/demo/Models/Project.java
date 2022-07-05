package com.example.demo.Models;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.math.BigDecimal;
import java.sql.Date;
import java.time.Instant;
import java.util.LinkedHashSet;
import java.util.Set;

@Entity
@Table(name = "projects")
@Getter
@Setter
public class Project {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "project_id", nullable = false)
    private Integer id;

    @ManyToOne(fetch = FetchType.EAGER, optional = false)
    @JoinColumn(name = "user_id", nullable = false)
    private Logininfo user;

    @Column(name = "project_name", nullable = false, length = 100)
    private String projectName;

    @Column(name = "duration", nullable = false)
    private Integer duration;

    @Column(name = "project_description", nullable = false, length = 250)
    private String projectDescription;

    @Column(name = "attachment", length = 100)
    private String attachment;

    @Column(name = "post_date", nullable = false)
    private Date postDate;

    @Column(name = "completion_date", nullable = false)
    private Date completionDate;

    @ManyToOne(fetch = FetchType.EAGER, optional = false)
    @JoinColumn(name = "status_id", nullable = false)
    private Statusdetail status;

    @Column(name = "start_date")
    private Date startDate;

    @Column(name = "min_budget", precision = 10)
    private BigDecimal minBudget;

    @Column(name = "max_budget", precision = 10)
    private BigDecimal maxBudget;
  
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "skill_level_id")
    private Skilllevel skillLevel;

    @Column(name = "user_description")
    private String userDescription;

    @OneToMany(mappedBy = "project")
    private Set<Task> tasks = new LinkedHashSet<>();

    @OneToMany(mappedBy = "project",fetch = FetchType.LAZY)
    private Set<Projectskill> projectskills = new LinkedHashSet<>();

    @OneToMany(mappedBy = "project")
    private Set<Bid> bids = new LinkedHashSet<>();
}