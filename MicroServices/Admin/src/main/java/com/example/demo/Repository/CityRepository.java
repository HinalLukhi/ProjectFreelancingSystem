package com.example.demo.Repository;

import com.example.demo.Models.City;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CityRepository extends JpaRepository<City,Integer> {
    List<City> findByState_Id(Integer id);

}
