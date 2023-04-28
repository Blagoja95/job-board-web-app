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
//        //TODO: more research on CORS topic; GITHUB isue #11
        response.addHeader("Access-Control-Allow-Origin", "*");
        response.addHeader("Access-Control-Allow-Headers",
                "Origin, X-Requested-With, Content-Type, Accept");

        response.setContentType("application/json");

        JSONObject respJson = new JSONObject();
        System.out.println(request.getParameter("username"));

        if (!request.getParameterMap().containsKey("username") || !request.getParameterMap().containsKey("password")) {
            respJson.put(false, "pogresna lozinka / ime");

            response.getWriter().println(respJson);

            return;
        }

        String username = request.getParameter("username");
        int hash = request.getParameter("password").hashCode();

        List<User> users = new DbAccess().getUser("username", username);

        User user;

        if (users != null && users.size() >= 1) {
            user = users.get(0);
        } else {
            respJson.put(false, "nema korisnika sa ovim imenom");

            response.getWriter().println(respJson);

            return;
        }

        if (user.getHashPass() == hash) {
            respJson.put(true, true);

            request.getSession().setAttribute(user.getUsername(), user.getId());
        } else
            respJson.put(false, "pogresna lozinka");

        response.getWriter().println(respJson);

    }
}
