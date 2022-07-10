package com.example.demo.Models;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.sql.Date;

@Entity
@Table(name = "task")
@Getter
@Setter
public class Task {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "task_id", nullable = false)
    private Integer id;

    @ManyToOne(fetch = FetchType.EAGER,optional = false)
    @JoinColumn(name = "project_id", nullable = false)
    private Project project;

    @Column(name = "task_name", nullable = false, length = 50)
    private String taskName;

    @Column(name = "task_description", nullable = false, length = 250)
    private String taskDescription;

    @Column(name = "start_date", nullable = false)
    private Date startDate;

    @Column(name = "end_date", nullable = false)
    private Date endDate;

    @Column(name = "attachment", length = 100)
    private String attachment;

    @Column(name = "post_date", nullable = false)
    private Date postDate;

    @ManyToOne(fetch = FetchType.EAGER, optional = false)
    @JoinColumn(name = "status_id", nullable = false)
    private Statusdetail status;

}