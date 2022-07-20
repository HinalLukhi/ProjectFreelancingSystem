package com.example.demo.Models;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.LinkedHashSet;
import java.util.Set;

@Entity
@Table(name = "statusdetails")
@JsonIgnoreProperties({"hibernateLazyInitializer"})
@Getter
@Setter
public class Statusdetail {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "status_id", nullable = false)
    private Integer id;

    @Column(name = "status_name", nullable = false, length = 20)
    private String statusName;

    @OneToMany(mappedBy = "status")
    @JsonManagedReference
    private Set<Task> tasks = new LinkedHashSet<>();

    @OneToMany(mappedBy = "status")
    @JsonManagedReference
    private Set<Project> projects = new LinkedHashSet<>();

    @OneToMany(mappedBy = "status")
    @JsonManagedReference
    private Set<Subscribersdetail> subscribersdetails = new LinkedHashSet<>();

    @OneToMany(mappedBy = "status")
    private Set<Bid> bids = new LinkedHashSet<>();

    @OneToMany(mappedBy = "status")
    @JsonBackReference
    private Set<Logininfo> logininfos = new LinkedHashSet<>();
}