package com.example.demo.Services;

import com.example.demo.Client.BidSRepository;
import com.example.demo.Models.Bid;
import com.example.demo.Models.FreelancerBids;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class FreelancerBidsService {
    private final BidSRepository bidSRepository;

    public List<FreelancerBids> getBids(Integer id) {
        List<Bid> bids = bidSRepository.findByFreelanceId(id);
        return bids.stream().map(bid -> {
            FreelancerBids bid1 = new FreelancerBids();
            bid1.setId(bid.getId());
            bid1.setBidDate(bid.getBidDate());
            bid1.setStatus(bid.getStatus().getId());
            bid1.setAmount(bid.getAmount());
            bid1.setDeliveryTime(bid.getDeliveryTime());
            bid1.setLoginId(bid.getUser().getId());
            bid1.setProject(bid.getProject());
            //bid1.setProjectName(bid.getProject().getProjectName());
            return bid1;
        }).collect(Collectors.toList());
    }

    public List<FreelancerBids> getAcceptedBids(Integer id) {
        List<Bid> bids = bidSRepository.findAcceptedBidByFreelanceId(id);
        return bids.stream().map(bid -> {
            FreelancerBids bid1 = new FreelancerBids();
            bid1.setId(bid.getId());
            bid1.setBidDate(bid.getBidDate());
            bid1.setStatus(bid.getStatus().getId());
            bid1.setAmount(bid.getAmount());
            bid1.setDeliveryTime(bid.getDeliveryTime());
            bid1.setLoginId(bid.getUser().getId());
            bid1.setProject(bid.getProject());
            //bid1.setProjectName(bid.getProject().getProjectName());
            return bid1;
        }).collect(Collectors.toList());
    }

}
