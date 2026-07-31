package com.example.student.model;

import jakarta.persistence.*;

@Entity
@Table(name = "user")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String gmail;
    private String password;
    public User() {}
    public Long getId(){
        return id;
    }
    public void setId(long id){this.id = id;}
    public String getGmail(){return gmail;}
    public void setGmail(String gmail){
        this.gmail = gmail;
    }
    public String getPassword(){
        return password;
    }
    public void setPassword(String password){
        this.password = password;
    }

}
