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

@WebServlet("/posts")
public class PostsServlet extends HttpServlet {

    public void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setContentType("application/json");

        if (request.getParameterMap().size() == 0) {
            response.getWriter().println(returnAllPosts());
        }
    }

private JSONObject returnAllPosts() {
    DbAccess db = new DbAccess();

    JSONArray resArr = new JSONArray();

    JSONObject respJson = new JSONObject();

    List<Post> posts = db.getAllPosts();

    if (posts == null) {
        respJson.put("users", null);
        return respJson;
    }

    for (Post post : posts) {
        resArr.add(post.getPost());
    }

    respJson.put("users", resArr);

    return respJson;
}
}
