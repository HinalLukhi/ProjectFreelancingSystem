package com.example.demo.Models;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.sql.Date;
import java.util.LinkedHashSet;
import java.util.Set;

@Entity
@Table(name = "logininfo")
@JsonIgnoreProperties({"hibernateLazyInitializer"})
@Getter
@Setter
public class Logininfo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "login_id", nullable = false)
    private Integer id;

    @ManyToOne(fetch = FetchType.EAGER, optional = false)
    @JoinColumn(name = "user_type_id", nullable = false)
    private Usertype userType;

    @Column(name = "email", nullable = false, length = 30)
    private String email;

    @Column(name = "password", nullable = false, length = 40)
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private String password;

    @Column(name = "registration_date", nullable = false)
    private Date registrationDate;

    @ManyToOne(fetch = FetchType.EAGER, optional = false)
    @JoinColumn(name = "status_id", nullable = false)
    private Statusdetail status;

    @Column(name = "verification_code", length = 64)
    private String verificationCode;

    @OneToMany(mappedBy = "login")
    private Set<Userprofile> userprofiles = new LinkedHashSet<>();
}