package com.example.posting.post;

import com.example.posting.app.OverrideServlet;
import com.example.posting.database.DbAccess;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.json.simple.JSONObject;
import java.io.IOException;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@WebServlet("/posts/update")
public class UpdatePostServlet extends OverrideServlet
{
	public UpdatePostServlet () {
		super();

		requestName = "update";
	}

	public void doPost (HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException
	{
		response.setContentType("application/json");

		//TODO: more research on CORS topic; GITHUB isue #11
		response.addHeader("Access-Control-Allow-Origin", "*");
		response.addHeader("Access-Control-Allow-Headers",
				"Origin, X-Requested-With, Content-Type, Accept");

		if (request.getParameterMap().keySet().isEmpty())
		{
			response.getWriter().println(this.getErrorJSON("No parameters provided!"));

			return;
		}

		for (String i : request.getParameterMap().keySet())
		{
			if (request.getParameter(i).isEmpty())
			{
				response.getWriter().println(this.getErrorJSON(i.substring(0, 1).toUpperCase() + i.substring(1) + " is empty!"));

				return;
			}
		}

		Set<String> requiredParameters = new HashSet<>(List.of(
				"id",
				"title",
				"type",
				"city",
				"about",
				"qual"));

		if (!requiredParameters.equals(request.getParameterMap().keySet()))
		{
			response.getWriter().println(this.getErrorJSON("Some required parameters are missing! Please check documentation!"));

			return;
		}

		JSONObject respJson = new JSONObject();

		DbAccess db = new DbAccess();

		String id = request.getParameter("id");

		if (db.checkIfExist(List.of("posts", "id", id)) != 1)
		{
			response.getWriter().println(this.getErrorJSON("Post with id " + id + " does not exist!"));

			return;
		}

		PostModel post = new PostModel(
				Integer.parseInt(id),
				request.getParameter("title"),
				request.getParameter("type"),
				request.getParameter("city"),
				request.getParameter("about"),
				request.getParameter("qual")
		);

		db.updatePost(post);

		JSONObject resjson = new JSONObject();

		resjson.put("status", 1);
		resjson.put("id", post.getId());
		resjson.put("info", "Post is successfully updated!");
		respJson.put("update", resjson);

		response.getWriter().println(respJson);
	}
}