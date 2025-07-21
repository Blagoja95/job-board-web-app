package com.example.posting.post;

import com.example.posting.app.OverrideServlet;
import com.example.posting.database.DbAccess;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.json.simple.JSONObject;

import java.io.IOException;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@WebServlet("/posts/update")
public class UpdatePostServlet extends OverrideServlet
{
	public UpdatePostServlet()
	{
		super();

		requestName = "update";
	}

	public void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException
	{
		response.setContentType("application/json");

		response.addHeader("Access-Control-Allow-Origin", request.getHeader("Origin"));
		response.addHeader("Access-Control-Allow-Credentials", "true");

		if (this.checkUserCookies(request, response))
		{
			return;
		}

		if (this.checkIfEmptyParameters(request, response))
		{
			return;
		}

		if (this.checkIfEmptyParametersValues(request, response))
		{
			return;
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

		if (id == null || id.isBlank())
		{
			response.getWriter().println(this.getErrorJSON("PostID parameter is missing!"));

			return;
		}

		String userID = this.getCookieValue(request, "userID");

		if (userID == null || userID.isEmpty())
		{
			response.getWriter().println(this.getErrorJSON("UserID cookie is missing!"));

			return;
		}

		try
		{
			ResultSet results = db.checkIfExist(List.of("posts", "id", id));

			if (results == null || !results.next())
			{
				response.getWriter().println(this.getErrorJSON("Post with id " + id + " does not exist!"));

				return;
			}

			if (!results.getString("companyID").equals(userID))
			{
				response.getWriter().println(this.getErrorJSON("Update action denied!"));

				return;
			}

		} catch (SQLException e)
		{
			throw new RuntimeException(e);
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
		respJson.put(this.requestName, resjson);

		response.getWriter().println(respJson);
	}
}