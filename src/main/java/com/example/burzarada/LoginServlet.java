package com.example.burzarada;

import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.json.simple.JSONObject;

import java.io.IOException;
import java.util.List;

@WebServlet("/login")
public class LoginServlet extends HelloServlet {

    public void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {
        response.setContentType("application/json");

        JSONObject respJson = new JSONObject();

        if (!request.getParameterMap().containsKey("username") || !request.getParameterMap().containsKey("password")){
            respJson.put(false, "pogresna lozinka / ime");

            response.getWriter().println(respJson);

            return;
        }

        String username = request.getParameter("username");
        int hash = request.getParameter("password").hashCode();

        List<User> users = new DbAccess().getUser("username", username);

        User user;

        if (users != null && users.size() >= 1){
            user = users.get(0);
        }
        else {
            respJson.put(false, "nema korisnika sa ovim imenom");

            response.getWriter().println(respJson);

            return;
        }

        if (user.getHashPass() == hash){
            respJson.put(true, "pogresna lozinka");

            response.getWriter().println(true);
        }
        else {
            respJson.put(true, "pogresna lozinka");

            response.getWriter().println(respJson);
        }

    }
}
