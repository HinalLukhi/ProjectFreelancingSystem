package com.example.demo.Controller;

import com.example.demo.Models.Statedetail;
import com.example.demo.Services.StateServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/state")
@CrossOrigin(origins = "*")

public class StateController {

    @Autowired
    public StateServices services;

    @PostMapping
    public Statedetail insert(@RequestBody Statedetail statedetail)
    {
        return services.insertState(statedetail);
    }

    @GetMapping(path = "/country/{id}")
    public List<Statedetail> findByCounty(@PathVariable Integer id)
    {
        return services.getBycounty_Id(id);
    }
}
