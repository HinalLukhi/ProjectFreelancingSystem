package com.example.demo.Controller;

import com.example.demo.Models.Membership;
import com.example.demo.Models.Subscribersdetail;
import com.example.demo.Services.MemberShipPlanServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/membership")
@CrossOrigin(origins = "*")

public class MembershipplanController {

    @Autowired
    public MemberShipPlanServices memberShipPlanServices;

    @GetMapping("")
    public List<Membership> all(){
        return memberShipPlanServices.getAll();
    }

    @PostMapping("/add")
    public Membership insertData(@RequestBody Membership membership)
    {
        System.out.println(membership.getPlanName());
        return memberShipPlanServices.insertPlan(membership);
    }

    @GetMapping(path = "/user/{id}")
    public Subscribersdetail allUserData(@PathVariable Integer id){
        return memberShipPlanServices.getdataByUserId(id);
    }

}
