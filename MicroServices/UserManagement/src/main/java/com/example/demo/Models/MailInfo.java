package com.example.demo.Models;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class MailInfo {
    private String message;
    private String subject;
    private String sender;
    private String receiver;
}
