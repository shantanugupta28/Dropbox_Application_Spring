package com.controller;
import com.entity.User;
import com.service.UserService;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpSession;
import java.io.File;
import java.security.MessageDigest;

@Controller    // This means that this class is a Controller
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping(path="/user") // This means URL's start with /demo (after Application path)
public class UserController {
    @Autowired
    private UserService userService;



    public static String generateHash(String input) {
        StringBuilder hash = new StringBuilder();

        try {
            MessageDigest sha = MessageDigest.getInstance("SHA-1");
            byte[] hashedBytes = sha.digest(input.getBytes());
            char[] digits = { '0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
                    'a', 'b', 'c', 'd', 'e', 'f' };
            for (int idx = 0; idx < hashedBytes.length;idx++) {
                byte b = hashedBytes[idx];
                hash.append(digits[(b & 0xf0) >> 4]);
                hash.append(digits[b & 0x0f]);
            }
        } catch (Exception e) {
            // handle error here.
        }

        return hash.toString();
    }

    @PostMapping(path="/add",consumes = MediaType.APPLICATION_JSON_VALUE) // Map ONLY POST Requests
    public  ResponseEntity<?> addNewUser (@RequestBody User user) {
        // @ResponseBody means the returned String is the response, not a view name
        // @RequestParam means it is a parameter from the GET or POST request
        userService.addUser(user);
        System.out.println("Saved");
        return new ResponseEntity(null,HttpStatus.CREATED);
    }

    @GetMapping(path="/all",produces = MediaType.APPLICATION_JSON_VALUE)
    public @ResponseBody Iterable<User> getAllUsers() {
        // This returns a JSON with the users
        return userService.getAllUsers();
    }

  /*  @PostMapping(path="/login",consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> login(@RequestBody String user, HttpSession session)
    {
        JSONObject jsonObject = new JSONObject(user);
        session.setAttribute("name",jsonObject.getString("username"));
       // System.out.println(session.getAttribute("name")+"login");
        return new ResponseEntity(userService.login(jsonObject.getString("username"),jsonObject.getString("password")),HttpStatus.OK);
    }*/

    @PostMapping(path="/login",consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> login(@RequestBody String user, HttpSession session)
    {
        JSONObject jsonObject = new JSONObject(user);
        session.setAttribute("name",jsonObject.getString("username"));
        return new ResponseEntity(userService.login(jsonObject.getString("username"),jsonObject.getString("password")),HttpStatus.OK);
    }

    @PostMapping(value = "/logout")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public ResponseEntity<?> logout(HttpSession session) {
        System.out.println(session.getAttribute("name"));
        session.invalidate();
        return  new ResponseEntity(HttpStatus.OK);
    }

    @GetMapping(path="/list",produces = MediaType.APPLICATION_JSON_VALUE)
    public @ResponseBody File[] listdir()
    {

        //JSONObject jsonObject = new JSONObject(user);
        //session.setAttribute("email",jsonObject.getString("email"));
        //System.out.println(session.getAttribute("name")+"check");
       // System.out.println(userService.listdir("email"));
        System.out.println(userService.listdir());
        return userService.listdir();

    }

    @PostMapping(path="/signup",consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> signup(@RequestBody String user)
    {

        JSONObject jsonObject = new JSONObject(user);
        System.out.println(user);
        String saltedPassword= jsonObject.getString("password");
        String hashedPassword= generateHash(saltedPassword);
        User use= new User();
        use.setPassword(hashedPassword);
        use.setEmail(jsonObject.getString("email"));
        use.setFirstName(jsonObject.getString("firstName"));
        use.setLastName(jsonObject.getString("lastName"));
            userService.addUser(use);


        return new ResponseEntity("Signup Successfull", HttpStatus.OK);
    }




}