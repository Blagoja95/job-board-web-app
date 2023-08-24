package com.example.burzarada;

import java.io.*;
import java.util.List;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;


import jakarta.servlet.http.*;
import jakarta.servlet.annotation.*;
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

        for (User user : users) {
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
// insert into posts (id, title, type, city, about, qual, companyID, date) values (12301, "Potreban WEB programer", "Remote", "Banja Luka", "InterPO je u potrazi za strucnim i motivisanim web programerom koji ce se pridruziti našem timu. Kao web programer u InterPO-u, vasa uloga bice da radite na razvoju i održavanju visokokvalitetnih web aplikacija za nase klijente. Vaše zaduzenje će obuhvatiti pisanje cistog i efikasnog koda, razumevanje potreba klijenata i kreiranje funkcionalnih i skalabilnih web resenja.", "Trazimo osobu koja poseduje iskustvo u programiranju na front-end i/ili back-endu i koja poznaje razlicite tehnologije kao sto su HTML, CSS, JavaScript, PHP i MySQL. Takodje, vazno nam je da imate iskustvo u radu sa razlicitim razvojnim alatima i okvirima kao sto su React, Angular, Vue.js, Laravel, Symfony i slicno.", 109, '2022-08-15 12:33:33');