package com.service;


import com.entity.User;
import com.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.File;
import java.util.ArrayList;
import java.util.List;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    public Iterable<User> getAllUsers(){
        return userRepository.findAll();
    }


   public void addUser(User user){
        userRepository.save(user);
    }



    public List<User> login(String email,String password){
        return userRepository.findByEmailAndPassword(email,password);
    }
    public File[] listdir(){
        File folder = new File("D:\\Shim\\spring\\SpringBootDemoCode\\SpringBootDemo\\src\\test");
        File[] listOfFiles = folder.listFiles();
        for (int i = 0; i < listOfFiles.length; i++) {
            if (listOfFiles[i].isFile()) {
                System.out.println("File " + listOfFiles[i].getName());
            } else if (listOfFiles[i].isDirectory()) {
                //System.out.println("Directory " + listOfFiles[i].getName());
            }
        }

        return listOfFiles;
    }
   /* public void listdir(String directoryName){
        File directory = new File(directoryName);
        //get all the files from a directory
        File[] fList = directory.listFiles();
        for (File file : fList){
            if (file.isFile()){
                System.out.println(file.getName());
            }
        }
    }*/
 /*  List myList= new ArrayList();
        for (final File fileEntry : folder.listFiles()) {
        if (fileEntry.isDirectory()) {
            myList.add(fileEntry.getName());
            //listOfFiles(fileEntry);
        } else {
            System.out.println(fileEntry.getName());
            myList.add(fileEntry.getName());
        }
    }*/

}