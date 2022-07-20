package com.example.demo.Repository;

import com.example.demo.Models.Subscribersdetail;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SubscribersdetailRepository extends JpaRepository<Subscribersdetail,Integer> {

    Subscribersdetail findByUser_Id(Integer id);

}
