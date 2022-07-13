package com.example.demo.Models.DTO;

import com.example.demo.Models.Project;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.sql.Date;

@Getter
@Setter
public class FreelancerBids {
    private Integer id;
    private Project project;
    //private String projectName;
    private BigDecimal amount;
    private Date bidDate;
    private Integer deliveryTime;
    private Integer Status;
    private Integer LoginId;
}
