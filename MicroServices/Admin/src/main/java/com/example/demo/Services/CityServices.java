package com.example.demo.Services;

import com.example.demo.Models.City;
import com.example.demo.Repository.CityRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CityServices {

    @Autowired
    public CityRepository cityRepository;

    public City insertCity(City city)
    {
        return cityRepository.save(city);
    }

    public Optional<City> getById(Integer id)
    {
        return cityRepository.findById(id);
    }

    public List<City> All(){return cityRepository.findAll();}

    public List<City> getByStateId(Integer id)
    {
        return cityRepository.findByState_Id(id);
    }
}
