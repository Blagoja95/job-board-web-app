package com.example.burzarada;

import java.io.*;
import java.util.List;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;


import jakarta.servlet.http.*;
import jakarta.servlet.annotation.*;

// insert row in users
// insert into users (id, name, hashPass, email, about, username) values (1123, "Tritol Banja Luka", -831574497, "email@tritol.me","Tritol kompanija Banja Luka", "tritol22");
// alter table users add column city varchar(40);
//update users set city="Banja Luka" where id=1123;
@WebServlet("/test")
public class HelloServlet extends HttpServlet {
    private String message;

    public void init() {
        message = "Hello World!";
    }

    public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
        response.setContentType("text/html");

        DbAccess db = new DbAccess();

        JSONArray usersJson = new JSONArray();

        List<User> users = db.getAllUsers();

        for(User user : users){
            System.out.println(user.toString());
            JSONObject jsonUser = new JSONObject();

            jsonUser.put("id", user.getId());
            jsonUser.put("name", user.getName());
            jsonUser.put("username", user.getUsername());
            jsonUser.put("email", user.getEmail());
            jsonUser.put("about", user.getAbout());

            usersJson.add(jsonUser);
        }


        JSONObject respJson = new JSONObject();
        respJson.put("users", usersJson);

        response.setContentType("application/json");
        response.getWriter().println(respJson);
    }

    public void destroy() {
    }
}