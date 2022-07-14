package com.example.demo.Controller;

import com.example.demo.Models.Country;
import com.example.demo.Services.CountryServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/country")
@CrossOrigin(origins = "*")
public class CountryController {

    @Autowired
    public CountryServices services;

    @PostMapping
    public Country insert(@RequestBody Country country){return services.insertCountry(country);}

    @GetMapping(path = "/all")
    public List<Country> all(){ return services.all(); }
}
