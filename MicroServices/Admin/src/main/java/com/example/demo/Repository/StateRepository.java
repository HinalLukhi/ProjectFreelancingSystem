package com.example.demo.Repository;

import com.example.demo.Models.Statedetail;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;


public interface StateRepository extends JpaRepository<Statedetail,Integer> {
    List<Statedetail> findByCountry_Id(Integer id);

}
