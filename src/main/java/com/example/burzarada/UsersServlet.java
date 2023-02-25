package com.example.burzarada;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;

import java.io.IOException;
import java.util.List;

@WebServlet("/users")
public class UsersServlet extends HttpServlet {

    public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {

        if (request.getParameterMap().size() == 0) {
            response.setContentType("application/json");
            response.getWriter().println(returnAllUsers());
        }
    }

    private JSONObject returnAllUsers() {
        DbAccess db = new DbAccess();

        JSONArray resArr = new JSONArray();

        for(User user: db.getAllUsers()){
            resArr.add(user.getUser());
        }

        JSONObject respJson = new JSONObject();

        respJson.put("users", resArr);

        return respJson;
    }
}
