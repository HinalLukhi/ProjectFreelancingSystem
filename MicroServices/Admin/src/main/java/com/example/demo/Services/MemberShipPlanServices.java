package com.example.demo.Services;

import com.example.demo.Models.Membership;
import com.example.demo.Models.Subscribersdetail;
import com.example.demo.Repository.MemberShipPlanRepository;
import com.example.demo.Repository.SubscribersdetailRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MemberShipPlanServices {
    @Autowired
    public MemberShipPlanRepository memberShipPlanRepository;
    @Autowired
    public SubscribersdetailRepository subscribersdetailRepository;

    public Membership insertPlan(Membership membership)
    {
        return memberShipPlanRepository.save(membership);
    }

    public List<Membership> getAll() {
        return memberShipPlanRepository.findAll();
    }

    public Subscribersdetail getdataByUserId(Integer id)
    {
        return subscribersdetailRepository.findByUser_Id(id);
    }
}
