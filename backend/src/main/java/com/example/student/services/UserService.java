package com.example.student.services;

import com.example.student.model.User;
import com.example.student.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public Optional<User> login(String gmail) {
        return userRepository.findByGmail(gmail);
    }
    public User register(User user) {
        Optional<User> existingUser = userRepository.findByGmail(user.getGmail());
        if (existingUser.isPresent()) {
            throw new RuntimeException("Gmail already exists");
        }
        return userRepository.save(user);
    }
}