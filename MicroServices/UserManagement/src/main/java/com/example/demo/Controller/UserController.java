package com.example.demo.Controller;

import com.example.demo.Client.loginInfoRepository;
import com.example.demo.Models.Freelancerskill;
import com.example.demo.Models.Logininfo;
import com.example.demo.Models.MailInfo;
import com.example.demo.Models.Userprofile;
import com.example.demo.Services.MailService;
import com.example.demo.Services.UserServices;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.web.bind.annotation.*;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
import javax.persistence.criteria.CriteriaBuilder;
import java.io.UnsupportedEncodingException;
import java.util.ArrayList;
import java.util.List;

@RestController
@CrossOrigin(origins = "*")
@RequiredArgsConstructor
public class UserController {
    private final UserServices userServices;

    private final MailService mailService;

    private final loginInfoRepository loginInfoRepository;

    @GetMapping("/all")
    public @ResponseBody Iterable<Userprofile> all()
    {
            return userServices.findAll();
    }

    @PostMapping("/email")
    public @ResponseBody Logininfo findByEmailId(@RequestBody Logininfo user)
    {

         Logininfo l1=loginInfoRepository.findByEmail(user.getEmail());
        return l1;
    }

    @GetMapping("/{id}")
    public @ResponseBody
    Logininfo findById(@PathVariable Integer id)
    {
        return  userServices.findDataById(id);
    }

    @DeleteMapping(path = "/{id}")
    public  @ResponseBody Boolean DeleteUser(@PathVariable Integer id)
    {
        return  userServices.Delete(id);
    }

    @PostMapping("/add")
    public @ResponseBody Userprofile Insert(@RequestBody  Userprofile userprofile)
    {
        return userServices.add(userprofile);
    }

    @PutMapping("/update/{id}")
    public @ResponseBody Userprofile update(@RequestBody  Userprofile userprofile,@PathVariable Integer id)
    {
        return userServices.Update(userprofile,id);
    }

    @GetMapping("/freelancer")
    public @ResponseBody List<Logininfo> displayFreelancer()
    {
        return  userServices.listfreelancer();
    }

    @PostMapping("/addSkills")
    public List<Freelancerskill> addSkills(@RequestBody List<Freelancerskill> freelancerskills)
    {
        List<Freelancerskill> freelancerskillList= new ArrayList<>();
        for (Freelancerskill skill:freelancerskills) {
            freelancerskillList.add(userServices.addSkill(skill));
        }
        return freelancerskillList;

    }

    @GetMapping("/skill/{id}")
    public  List<Freelancerskill> displaySkill(@PathVariable Integer id)
    {
        System.out.println(id);
        return userServices.displaySkill(id);
    }

    @PostMapping("/offer")
    public Boolean makeOffer(@RequestBody MailInfo info) {
        try {
            mailService.sendNotificationEmail(info);
        } catch (MessagingException e) {
            return false;
        } catch (UnsupportedEncodingException e) {
            return false;
        }
        return  true;
    }


}
