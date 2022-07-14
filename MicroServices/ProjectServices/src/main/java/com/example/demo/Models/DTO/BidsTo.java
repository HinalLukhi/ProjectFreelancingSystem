package com.example.demo.Models.DTO;

import com.example.demo.Models.Logininfo;
import com.example.demo.Models.Project;
import com.example.demo.Models.Statedetail;
import com.example.demo.Models.Statusdetail;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.sql.Date;

@Getter@Setter
public class BidsTo {
    private Integer id;
    private BigDecimal amount;
    private Date bidDate;
    private Integer deliveryTime;
    private Project project;
    private Statusdetail status;
    private Logininfo user;
}
