package com.example.student.controllers;

import com.example.student.model.User;
import com.example.student.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.example.student.jwt.JwtService;

import java.util.Optional;

@RestController
@RequestMapping("/users")
@CrossOrigin(origins = "https://anil-student-management-system-production-e998.up.railway.app")
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private JwtService jwtService;

    @PostMapping("/login")
    public String login(@RequestBody User user) {
        System.out.println("Login API called");
        Optional<User> dbUser = userService.login(user.getGmail());

        if (dbUser.isPresent() &&
                dbUser.get().getPassword().equals(user.getPassword())) {
            String token = jwtService.generateToken(user.getGmail());
            return token;
        }

        return "Invalid Gmail or Password";
    }

    @PostMapping("/register")
    public String register(@RequestBody User user) {
        try {
            userService.register(user);
            return "Register Successful";
        } catch (RuntimeException e) {
            return e.getMessage();
        }
    }
}