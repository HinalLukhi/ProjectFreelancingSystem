package com.example.demo.Services;

import com.example.demo.Models.Country;
import com.example.demo.Repository.CountryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CountryServices {

    @Autowired
    public CountryRepository countryRepository;

    public Country insertCountry(Country country)
    {
        return countryRepository.save(country);
    }

    public Optional<Country> getById(Integer id)
    {
        return countryRepository.findById(id);
    }

    public List<Country> all(){return countryRepository.findAll();}
}
