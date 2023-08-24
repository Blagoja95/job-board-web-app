package com.example.burzarada;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.json.simple.JSONObject;

import java.io.IOException;

@WebServlet("/update")
public class UpdateServlet extends HelloServlet {
    public void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setContentType("application/json");

        //TODO: more research on CORS topic; GITHUB isue #11
        response.addHeader("Access-Control-Allow-Origin", "*");
        response.addHeader("Access-Control-Allow-Headers",
                "Origin, X-Requested-With, Content-Type, Accept");

        JSONObject respJson = new JSONObject();

        Post post = new Post(
                Integer.parseInt(request.getParameter("id")),
                request.getParameter("title"),
                request.getParameter("type"),
                request.getParameter("city"),
                request.getParameter("about"),
                request.getParameter("qual")
        );

        DbAccess db = new DbAccess();

        db.updatePost(post);

        respJson.put("success", post.getId());

        response.getWriter().println(respJson);
    }
}
