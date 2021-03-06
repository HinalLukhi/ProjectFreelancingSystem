package com.example.demo.Models;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.LinkedHashSet;
import java.util.Set;

@Entity
@Table(name = "statedetails")
@JsonIdentityInfo(scope = Statedetail.class,
        generator = ObjectIdGenerators.PropertyGenerator.class,
        property = "id")
@JsonIgnoreProperties({"hibernateLazyInitializer"})
@Getter
@Setter
public class Statedetail {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "state_id", nullable = false)
    private Integer id;

    @ManyToOne(fetch = FetchType.EAGER, optional = false)
    @JoinColumn(name = "country_id", nullable = false)
    private Country country;

    @Column(name = "state_name", nullable = false, length = 20)
    private String stateName;

    @OneToMany(mappedBy = "state")
    @JsonBackReference
    private Set<City> cities = new LinkedHashSet<>();
}