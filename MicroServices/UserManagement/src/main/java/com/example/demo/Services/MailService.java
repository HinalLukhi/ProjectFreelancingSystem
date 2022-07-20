package com.example.demo.Services;

import com.example.demo.Models.MailInfo;
import lombok.RequiredArgsConstructor;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
import java.io.UnsupportedEncodingException;

@Service
@RequiredArgsConstructor
public class MailService {

    private final JavaMailSender mailSender;

    public void sendNotificationEmail(MailInfo info)
            throws MessagingException, UnsupportedEncodingException {

        String toAddress = info.getReceiver();
        String fromAddress = "freelancingscape@gmail.com";
        String senderName = "FreelancingScape";
        String subject = info.getSubject();
        String content = "Dear [[name]],<br>"
                + "Employer with the email : [[employer]] <br>"
                + "wants to approach you. with the message : . <br>"
                + info.getMessage() + " <br>"
                + "Thank you,<br> "
                + "FreelancingScape.";

        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message);

        helper.setFrom(fromAddress, senderName);
        helper.setTo(toAddress);
        helper.setSubject(subject);

        content = content.replace("[[employer]]", info.getSender());
        content = content.replace("[[name]]", info.getReceiver());

        helper.setText(content, true);
        mailSender.send(message);
    }
}
