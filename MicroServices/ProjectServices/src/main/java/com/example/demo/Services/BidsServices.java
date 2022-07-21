package com.example.demo.Services;

import com.example.demo.Client.BidSRepository;
import com.example.demo.Client.LogininfoRepository;
import com.example.demo.Client.ProjectRepository;
import com.example.demo.Client.StatusdetailRepository;
import com.example.demo.Models.Bid;
import com.example.demo.Models.DTO.BidsTo;
import com.example.demo.Models.Logininfo;
import com.example.demo.Models.Project;
import com.example.demo.Models.Statusdetail;
import com.example.demo.Services.transformers.BidsTransformer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
import java.io.UnsupportedEncodingException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class BidsServices {

    @Autowired
    public BidSRepository bidSRepository;

    @Autowired
    public ProjectRepository projectRepository;

    @Autowired
    public StatusdetailRepository statusdetailRepository;

    @Autowired
    public LogininfoRepository logininfoRepository;

    @Autowired
    private JavaMailSender mailSender;

    @Autowired
    private BidsTransformer bidsTransformer;

    private Project project;

    public Bid insertData(Bid bid) {
        if (bidSRepository.existsByUserAndProject(bid.getUser(), bid.getProject())) return null;
        return bidSRepository.save(bid);
    }

    public List<Bid> all() {
        return bidSRepository.findAll();
    }

    public Optional<Bid> getDataById(Integer id) {
        return bidSRepository.findById(id);
    }

    public Boolean DeleteTask(Integer id) {
        bidSRepository.deleteById(id);
        return bidSRepository.findById(id).isEmpty();
    }

    public Bid update(Bid bid, Integer id) {
        if (bidSRepository.existsById(id)) {
            Optional<Bid> bid1 = bidSRepository.findById(id);
            bid.setId(id);
            return bidSRepository.save(bid);
        } else {
            return null;
        }
    }

   public List<BidsTo> DisplayByProjectID(Integer id)
    {
         List<Bid> bids = bidSRepository.findByProjectId(id);

         return bids.stream().map(bid ->
             bidsTransformer.toTransferObject(bid)).collect(Collectors.toList());
    }

    public Bid acceptBid(Integer id)
    {
        Bid bid = bidSRepository.findById(id).orElse(null);
        bid.setStatus(statusdetailRepository.findById(7).orElse(null));
        Bid acceptedBid =  bidSRepository.save(bid);

        project = acceptedBid.getProject();
        bidSRepository.rejectedAllBids(project.getId());
        projectRepository.updateStatusTOActive(project.getId());

        Logininfo logininfo = logininfoRepository.findById(acceptedBid.getUser().getId()).orElse(null);
        try {
            sendNotificationEmail(logininfo);
        } catch (MessagingException e) {
            e.printStackTrace();
        } catch (UnsupportedEncodingException e) {
            e.printStackTrace();
        }

        return acceptedBid;
    }

    public Bid rejectBid(Integer id){
        Bid bid = bidSRepository.findById(id).orElse(null);
        bid.setStatus(statusdetailRepository.findById(8).orElse(null));
        return bidSRepository.save(bid);
    }

    public List<Bid> displayBidsByFreelancer(Integer id) {
        return bidSRepository.findByFreelanceId(id);
    }

    private void sendNotificationEmail(Logininfo registration)
            throws MessagingException, UnsupportedEncodingException {

        String toAddress = registration.getEmail();
        String fromAddress = "freelancingscape@gmail.com";
        String senderName = "FreelancingScape";
        String subject = "Hurray!! Your bid just got accepted";
        String content = "Dear [[name]],<br>"
                + "Your bid on project: [project] got accepted<br>"
                + "you can start working on it.<br>"
                + "Thank you,<br>"
                + "FreelancingScape.";

        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message);

        helper.setFrom(fromAddress, senderName);
        helper.setTo(toAddress);
        helper.setSubject(subject);

        content = content.replace("[[project]]", project.getProjectName());
        content = content.replace("[[name]]", registration.getEmail());
//        String verifyURL = siteURL + "/verify?code=" + registration.getVerificationCode();

//        content = content.replace("[[URL]]", verifyURL);

        helper.setText(content, true);
        mailSender.send(message);
    }

    public List<Bid> DisplayByFreelanceID(Integer id)
    {
        return bidSRepository.findByFreelanceId(id);
    }

    public List<Bid> DisplayAcceptedBidsByFreelanceID(Integer id)
    {
        return bidSRepository.findAcceptedBidByFreelanceId(id);
    }

    public List<Bid> DisplayRejectedBidsByFreelanceID(Integer id)
    {
        return bidSRepository.findRejectedBidByFreelanceId(id);
    }

    public Project DisplayProjectByBidId(Integer id)
    {
        Bid bid=bidSRepository.findById(id).get();
        return projectRepository.findById(bid.getProject().getId()).get();
    }
}
