package com.example.demo.Services.transformers;

import com.example.demo.Models.Bid;
import com.example.demo.Models.DTO.BidsTo;
import org.springframework.stereotype.Component;

@Component
public class BidsTransformer {

    public BidsTo toTransferObject(Bid bid){
        BidsTo bid1 = new BidsTo();

        bid1.setId(bid.getId());
        bid1.setAmount(bid.getAmount());
        bid1.setBidDate(bid.getBidDate());
        bid1.setProject(bid.getProject());
        bid1.setStatus(bid.getStatus());
        bid1.setDeliveryTime(bid.getDeliveryTime());
        bid1.setUser(bid.getUser());

        return bid1;
    }

}
