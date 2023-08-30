package com.example.posting.user;

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

@WebServlet("/users/update")
public class UpdateUserServlet extends OverrideServlet
{

	public UpdateUserServlet () {
		super();

		requestName = "update";
	}

	public void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException
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
				"name",
				"email",
				"about",
				"city"));

		if (!requiredParameters.equals(request.getParameterMap().keySet()))
		{
			response.getWriter().println(this.getErrorJSON("Some required parameters are missing! Please check documentation!"));

			return;
		}

		DbAccess db = new DbAccess();

		String id = request.getParameter("id");

		if (db.checkIfExist(List.of("posts", "id", id)) != 1)
		{
			response.getWriter().println(this.getErrorJSON("User with id " + id + " does not exist!"));

			return;
		}

		JSONObject respJson = new JSONObject();

		User user = new User(
				Integer.parseInt(id),
				request.getParameter("name"),
				0,
				request.getParameter("email"),
				request.getParameter("about"),
				"fake",
				request.getParameter("city")
		);


		db.updateUser(user);

		JSONObject resjson = new JSONObject();

		resjson.put("status", 1);
		resjson.put("id", user.getId());
		resjson.put("info", "User profile is successfully updated!");
		respJson.put("update", resjson);

		response.getWriter().println(respJson);
	}
}