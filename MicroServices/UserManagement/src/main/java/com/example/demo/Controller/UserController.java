package com.example.demo.Controller;

import com.example.demo.Client.loginInfoRepository;
import com.example.demo.Models.Logininfo;
import com.example.demo.Models.Userprofile;
import com.example.demo.Services.UserServices;
import lombok.extern.java.Log;
import org.aspectj.lang.annotation.DeclareWarning;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "*")
public class UserController {

    @Autowired
    public UserServices userServices;

    @Autowired
    public loginInfoRepository loginInfoRepository;

    @GetMapping("/all")
    public @ResponseBody Iterable<Userprofile> all()
    {
            return userServices.findAll();
    }

    @PostMapping("/email")
    public @ResponseBody Logininfo findByEmailId(@RequestBody Logininfo user)
    {
        System.out.println(user.getEmail());

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

}
