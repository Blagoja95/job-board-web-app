package com.example.burzarada;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;

import java.io.IOException;
import java.util.LinkedList;
import java.util.List;

@WebServlet("/users")
public class UsersServlet extends HttpServlet {

    public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
        response.setContentType("application/json");

        if (request.getParameterMap().size() == 0) {
            response.getWriter().println(returnAllUsers());
        } else if (request.getParameterMap().containsKey("name")) {
            String name = request.getParameter("name");

            if (name.length() == 0) {
                response.getWriter().println(new JSONObject().put("users", "empty name parameter!"));
                return;
            }

            response.getWriter().println(getUserByName(name));
        } else if (request.getParameterMap().containsKey("username")) {
            String username = request.getParameter("username");

            if (username.length() == 0) {
                response.getWriter().println(new JSONObject().put("users", "empty name parameter!"));
                return;
            }

            response.getWriter().println(getUserByUserName(username));
        } else if (!request.getParameterMap().containsKey("delete") && request.getParameterMap().containsKey("id")) {
            String id = request.getParameter("id");

            if (id.length() == 0) {
                response.getWriter().println(new JSONObject().put("users", "empty name parameter!"));
                return;
            }

            response.getWriter().println(getUserById(id));
        } else if (request.getParameterMap().containsKey("update")) {
            updateUser(request);
            response.setStatus(200);

        } else if (request.getParameterMap().containsKey("delete")) {
            deleteUser(request);
        }
    }

    private JSONObject returnAllUsers() {
        DbAccess db = new DbAccess();

        JSONArray resArr = new JSONArray();

        JSONObject respJson = new JSONObject();

        List<User> users = db.getAllUsers();

        if (users == null) {
            respJson.put("users", null);
            return respJson;
        }

        for (User user : db.getAllUsers()) {
            resArr.add(user.getUser());
        }

        if (resArr.size() == 0)
            respJson.put("users", null);
        else
            respJson.put("users", resArr);

        return respJson;
    }

    private JSONObject getUserByName(String name) {
        DbAccess db = new DbAccess();

        JSONArray resArr = new JSONArray();

        JSONObject respJson = new JSONObject();

        List<User> users = db.getUser("name", name);

        if (users == null) {
            respJson.put("users", null);
            return respJson;
        }

        for (User user : users) {
            resArr.add(user.getUser());
        }

        if (resArr.size() == 0)
            respJson.put("users", null);
        else
            respJson.put("users", resArr);

        return respJson;
    }

    private JSONObject getUserByUserName(String username) {
        DbAccess db = new DbAccess();

        JSONArray resArr = new JSONArray();

        JSONObject respJson = new JSONObject();

        List<User> users = db.getUser("username", username);

        if (users == null) {
            respJson.put("users", null);
            return respJson;
        }

        for (User user : users) {
            resArr.add(user.getUser());
        }

        if (resArr.size() == 0)
            respJson.put("users", null);
        else
            respJson.put("users", resArr);

        return respJson;
    }

    private JSONObject getUserById(String id) {
        DbAccess db = new DbAccess();

        JSONArray resArr = new JSONArray();

        JSONObject respJson = new JSONObject();

        List<User> users = db.getUser("id", id);

        if (users == null) {
            respJson.put("users", null);
            return respJson;
        }

        for (User user : users) {
            resArr.add(user.getUser());
        }

        if (resArr.size() == 0)
            respJson.put("users", null);
        else
            respJson.put("users", resArr);

        return respJson;
    }

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

    }

    public void updateUser(HttpServletRequest request) throws IOException {

        String what = request.getParameter("what");
        String value1 = request.getParameter("value1");
        String where = request.getParameter("where");
        String value2 = request.getParameter("value2");

        new DbAccess().updateUser(what, value1, where, value2);
    }

    public void deleteUser(HttpServletRequest request) throws IOException {
        new DbAccess().deleteUser(request.getParameter("id"));
    }
}
