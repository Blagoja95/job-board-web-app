package com.example.posting.user;

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

@WebServlet("/users/update")
public class UpdateUserServlet extends OverrideServlet
{

	public UpdateUserServlet()
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

		String userID = this.getCookieValue(request, "userID");

		if (userID.isBlank())
		{
			response.getWriter().println(this.getErrorJSON("UserID cookie is missing!"));

			return;
		}

		try
		{
			ResultSet res = db.checkIfExist(List.of("users", "id", userID));

			if (res == null || !res.next())
			{
				response.getWriter().println(this.getErrorJSON("User with id " + userID + " does not exist!"));

				return;
			}

		} catch (SQLException e)
		{
			throw new RuntimeException(e);
		}

		JSONObject respJson = new JSONObject();

		User user = new User(
				Integer.parseInt(userID),
				request.getParameter("name"),
				"notthepassword",
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