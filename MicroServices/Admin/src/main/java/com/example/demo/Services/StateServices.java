package com.example.demo.Services;

import com.example.demo.Models.Statedetail;
import com.example.demo.Repository.StateRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class StateServices {

    @Autowired
    public StateRepository stateRepository;

    public Statedetail insertState(Statedetail statedetail)
    {
        return stateRepository.save(statedetail);
    }

    public Optional<Statedetail> getById(Integer id)
    {
        return stateRepository.findById(id);
    }

    public List<Statedetail> All(){return stateRepository.findAll();}

    public List<Statedetail> getBycounty_Id(Integer id)
    {
        return stateRepository.findByCountry_Id(id);
    }
}
