package com.example.burzarada;

import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.json.simple.JSONObject;

import java.io.IOException;

@WebServlet("/register")
public class RegiserUserServlet extends HttpServlet {

    public void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {
        response.setContentType("application/json");

        JSONObject respJson = new JSONObject();

        String pass = request.getParameter("password");

        if (pass.length() == 0) {
            respJson.put("user", "pogresna lozinka");
            response.getWriter().println(respJson);
            return;
        }

        int hashPass = pass.hashCode();

        int id = (int) (Math.random() * 1800) + 100;

        User user = new User(
                id,
                request.getParameter("name"),
                hashPass,
                request.getParameter("email"),
                request.getParameter("about"),
                request.getParameter("username"),
                request.getParameter("city")
        );

        DbAccess db = new DbAccess();

        db.createUser(user);

        respJson.put(true, "korisnički nalog uspješno napravljen");

        response.getWriter().println(respJson);
    }

}
