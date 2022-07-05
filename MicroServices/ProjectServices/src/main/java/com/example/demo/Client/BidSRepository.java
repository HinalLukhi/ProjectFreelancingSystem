package com.example.demo.Client;


import com.example.demo.Models.Bid;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import javax.transaction.Transactional;
import java.util.List;

public interface BidSRepository extends JpaRepository<Bid,Integer> {
    @Query(value = "select * from bids where project_id=?1", nativeQuery = true)
    List<Bid> findByProjectId(Integer id);

    @Transactional
    @Modifying
    @Query(value = "update bids set status_id=8 where project_id=?1 and status_id!=7",nativeQuery = true)
    int rejectedAllBids(Integer id);


    @Query(value = "select * from bids where user_id=?1",nativeQuery = true)
    List<Bid> findByFreelanceId(Integer id);

    @Query(value = "select * from bids where user_id=?1 and status_id=7",nativeQuery = true)
    List<Bid> findAcceptedBidByFreelanceId(Integer id);

    @Query(value = "select * from bids where user_id=?1 and status_id=8",nativeQuery = true)
    List<Bid> findRejectedBidByFreelanceId(Integer id);
}
