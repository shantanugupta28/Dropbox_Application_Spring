package com.entity;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity // This tells Hibernate to make a table out of this class
public class User {
    @Id
    @GeneratedValue(strategy=GenerationType.AUTO)


    private String firstName;

    private String lastName;

    private String email;

    private String password;



    //private String users;

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

   public String getFirstName() { return firstName; }

    public void setFirstName(String firstName)
    {
        this.firstName= firstName;
    }

    public String getLastName() {
        return lastName;
    }


    public void setLastName(String lastName)
    {
        this.lastName= lastName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }


}