package com.example.demo.Models;

import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.sql.Date;

@Getter
@Setter
public class FreelancerBids {
    private Integer id;
    private Integer projectId;
    private String projectName;
    private BigDecimal amount;
    private Date bidDate;
    private Integer deliveryTime;
    private Integer Status;
    private Integer LoginId;
}
