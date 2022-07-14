package com.example.demo.Controller;

import com.example.demo.Models.Skill;
import com.example.demo.Services.SkillServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/skill")
@CrossOrigin("*")


public class SkillController {

    @Autowired
    public SkillServices skillServices;

    @GetMapping(path = "/all")
    public List<Skill> all(){
        System.out.println("skill all call..");
        return  skillServices.all();
    }

    @PostMapping("/add")
    public Skill insert(@RequestBody Skill s1)
    {
        return skillServices.InsertSkill(s1);
    }

}
