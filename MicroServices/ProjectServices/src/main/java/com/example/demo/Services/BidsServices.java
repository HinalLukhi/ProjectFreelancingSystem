package com.example.demo.Services;

import com.example.demo.Client.BidSRepository;
import com.example.demo.Client.LogininfoRepository;
import com.example.demo.Client.ProjectRepository;
import com.example.demo.Client.StatusdetailRepository;
import com.example.demo.Models.Bid;
import com.example.demo.Models.Logininfo;
import com.example.demo.Models.Project;
import com.example.demo.Models.Statusdetail;
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

    private Project project;

    public Bid insertData(Bid bid) {
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

   public List<Bid> DisplayByProjectID(Integer id)
    {
        return bidSRepository.findByProjectId(id);
    }

    public Bid acceptBid(Integer id)
    {
        Bid bid = bidSRepository.findById(id).orElse(null);
        bid.setStatus(statusdetailRepository.findById(7).orElse(null));
        Bid acceptedBid =  bidSRepository.save(bid);

        project = acceptedBid.getProject();
        System.out.println(project.getId());
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
}
