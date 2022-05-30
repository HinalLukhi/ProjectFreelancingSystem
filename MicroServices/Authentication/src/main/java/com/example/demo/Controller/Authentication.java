package com.example.demo.Controller;


import com.example.demo.Client.RegistrationRepository;
import com.example.demo.Models.Logininfo;
import com.example.demo.Services.RegistrationService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import javax.mail.MessagingException;
import javax.servlet.http.HttpServletRequest;
import java.io.UnsupportedEncodingException;


@RestController
@RequestMapping("/auth")
public class Authentication {


    @Autowired
    public  RegistrationRepository registrationRepository;

    @Autowired
    public RegistrationService registrationService;

    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    @GetMapping("/all")
    public  Iterable<Logininfo> getData(){

        return registrationRepository.findAll();
    }

    @PostMapping("/login")
    boolean Login(@RequestParam String email, @RequestParam String password, HttpServletRequest request)
    {

        return registrationService.chklogin(email,password,request);
    }


    @PostMapping(value = "/reg")
    Logininfo regUser(@RequestBody Logininfo registration, HttpServletRequest request) throws MessagingException, UnsupportedEncodingException {
        System.out.println(registration);
        return registrationService.newRegistration(registration, request);
    }

    @PostMapping("/logout")
    void logout(HttpServletRequest request)
    {
       registrationService.Logout(request);
    }


    @GetMapping("/reg/verify")
    public String verifyUser(@RequestParam("code") String code) {
        if (registrationService.verify(code)) {
            return "verify_success";
        } else {
            return "verify_fail";
        }
    }
}
