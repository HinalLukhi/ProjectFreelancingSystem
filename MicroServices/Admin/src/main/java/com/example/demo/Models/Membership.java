package com.example.demo.Models;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.math.BigDecimal;
import java.util.LinkedHashSet;
import java.util.Set;

@Entity
@Table(name = "membership")
@Getter
@Setter
public class Membership {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "plan_id", nullable = false)
    private Integer id;

    @Column(name = "plan_name", nullable = false, length = 30)
    private String planName;

    @Column(name = "amount", nullable = false, precision = 8, scale = 2)
    private BigDecimal amount;

    @Column(name = "post_limit", nullable = false)
    private Integer postLimit;

    @Column(name = "bid_limit", nullable = false)
    private Integer bidLimit;

    @ManyToOne(fetch = FetchType.EAGER, optional = false)
    @JoinColumn(name = "user_type_id", nullable = false)
    private Usertype userTypeId;

    @OneToMany(mappedBy = "plan")
    @JsonManagedReference
    private Set<Subscribersdetail> subscribersdetails = new LinkedHashSet<>();
}