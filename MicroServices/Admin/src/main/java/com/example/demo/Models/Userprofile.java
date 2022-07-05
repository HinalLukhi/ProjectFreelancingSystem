package com.example.demo.Models;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.math.BigDecimal;
import java.util.LinkedHashSet;
import java.util.Set;

@Entity
@Table(name = "userprofile")
@Getter
@Setter
public class Userprofile {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id", nullable = false)
    private Integer id;

    @ManyToOne(fetch = FetchType.EAGER, optional = false)
    @JoinColumn(name = "login_id", nullable = false)
    private Logininfo login;

    @Column(name = "profile_image", length = 100)
    private String profileImage;

    @Column(name = "company_name", length = 30)
    private String companyName;

    @Column(name = "hourly_rate", precision = 5, scale = 2)
    private BigDecimal hourlyRate;

    @Column(name = "tag_line", length = 50)
    private String tagLine;

    @Column(name = "user_description")
    private String userDescription;

    @ManyToOne(fetch = FetchType.EAGER, optional = false)
    @JoinColumn(name = "city_id", nullable = false)
    private City city;

    @Column(name = "mobile_no", precision = 10)
    private BigDecimal mobileNo;

    @OneToMany(mappedBy = "user")
    private Set<Project> projects = new LinkedHashSet<>();

    @OneToMany(mappedBy = "user")
    private Set<Subscribersdetail> subscribersdetails = new LinkedHashSet<>();

    @OneToMany(mappedBy = "user")
    private Set<Bid> bids = new LinkedHashSet<>();

    @OneToMany(mappedBy = "freelancer")
    private Set<Freelancerskill> freelancerskills = new LinkedHashSet<>();
}