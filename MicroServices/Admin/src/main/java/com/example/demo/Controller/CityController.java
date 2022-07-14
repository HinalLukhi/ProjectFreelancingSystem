package com.example.demo.Controller;


import com.example.demo.Models.City;
import com.example.demo.Services.CityServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/city")
@CrossOrigin(origins = "*")

public class CityController {

    @Autowired
    public CityServices cityServices;

    @PostMapping("/add")
    public City addCity(@RequestBody City city)
    {
        return  cityServices.insertCity(city);
    }

    @GetMapping("/{id}")
    public Optional<City> getcityById(@PathVariable Integer id){
        return cityServices.getById(id);
    }

    @GetMapping("/all")
    public List<City> all(){return cityServices.All();}

    @GetMapping("/state/{id}")
    public List<City> getcityByStateId(@PathVariable Integer id){
        return cityServices.getByStateId(id);
    }
}
