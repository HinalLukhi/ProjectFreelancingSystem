package com.example.demo.Models.DTO;

import com.example.demo.Models.*;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.sql.Date;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Set;

@Getter
@Setter
public class ProjectTo {
    private Integer id;
    private Logininfo user;
    private String projectName;
    private Integer duration;
    private Statusdetail status;
    private String projectDescription;
    private String attachment;
    private Date postDate;
    private Date completionDate;
    private Date startDate;
    private BigDecimal minBudget;
    private BigDecimal maxBudget;
    private Skilllevel skillLevel;
    private String userDescription;
    private Set<Task> tasks = new LinkedHashSet<Task>();
    private Set<ProjectSkillTo> projectskills;
    private Set<Bid> bids = new LinkedHashSet<>();
}
