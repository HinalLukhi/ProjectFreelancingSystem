package com.example.demo.Controlller;


import com.example.demo.Models.Bid;
import com.example.demo.Services.BidsServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/bids")
@CrossOrigin(origins = "*")
public class BidsController {

    @Autowired
    BidsServices bidsServices;

    @PostMapping("/add")
    public Bid add(@RequestBody Bid bid)
    {
        return bidsServices.insertData(bid);
    }

    @PutMapping("/update/{id}")
    public Bid UpdateData(@RequestBody  Bid bid,@PathVariable Integer id)
    {
        return bidsServices.update(bid,id);
    }

    @DeleteMapping("/delete/{id}")
    public Boolean DeleteBid(@PathVariable Integer id)
    {
        return bidsServices.DeleteTask(id);
    }

    @GetMapping("/all")
    public List<Bid> all(){
        return bidsServices.all();
    }

    @GetMapping("/project/{id}")
    public List<Bid> fetchById(@PathVariable Integer id)
    {
        return bidsServices.DisplayByProjectID(id);
    }

    @PutMapping("/accept/{id}")
    public Bid acceptBid(@PathVariable Integer id)
    {
        return bidsServices.acceptBid(id);
    }

    @PutMapping("/reject/{id}")
    public Bid rejectBid(@PathVariable Integer id)
    {
        return bidsServices.rejectBid(id);
    }

    @GetMapping("/freelancer/{id}")
    public List<Bid> fetchByFreelanceId(@PathVariable Integer id)
    {
        return bidsServices.DisplayByFreelanceID(id);
    }

    @GetMapping("/accepted/freelancer/{id}")
    public List<Bid> AcceptedBidsList(@PathVariable Integer id)
    {
        return bidsServices.DisplayAcceptedBidsByFreelanceID(id);
    }

    @GetMapping("/rejected/freelancer/{id}")
    public List<Bid> RejectedBidsList(@PathVariable Integer id)
    {
        return bidsServices.DisplayRejectedBidsByFreelanceID(id);
    }
}
