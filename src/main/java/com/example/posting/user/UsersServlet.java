package com.example.posting.user;

import com.example.posting.app.OverrideServlet;
import com.example.posting.database.DbAccess;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@WebServlet("/users")
public class UsersServlet extends OverrideServlet
{
	public UsersServlet()
	{
		super();

		requestName = "users";
	}

	public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException
	{
		response.setContentType("application/json");

		response.addHeader("Access-Control-Allow-Origin", "*");
		response.addHeader("Access-Control-Allow-Headers",
				"Origin, X-Requested-With, Content-Type, Accept");

		if (!request.getParameterMap().isEmpty())
		{
			if (this.checkIfEmptyParametersValues(request, response))
			{
				return;
			}
		}

		if (request.getParameterMap().isEmpty())
		{
			response.getWriter().println(returnAllUsers());
		}
		else if (request.getParameterMap().containsKey("name"))
		{
			response.getWriter().println(returnUser("name", request.getParameter("name")));
		}
		else if (request.getParameterMap().containsKey("email"))
		{
			response.getWriter().println(returnUser("email", request.getParameter("email")));
		}
		else if (request.getParameterMap().containsKey("city"))
		{
			response.getWriter().println(returnUser("city", request.getParameter("city")));
		}
		else if (request.getParameterMap().containsKey("username"))
		{
			response.getWriter().println(returnUser("username", request.getParameter("username")));
		}
		else if (!request.getParameterMap().containsKey("delete") && request.getParameterMap().containsKey("id"))
		{
			response.getWriter().println(returnUser("id", request.getParameter("id")));
		}
		else
		{
			response.getWriter().println(getEmptyResponse("Wrong request!"));
		}
	}

	private JSONObject returnAllUsers()
	{
		DbAccess db = new DbAccess();

		JSONArray resArr = new JSONArray();

		JSONObject respJson = new JSONObject();

		List<User> users = db.getAllUsers();

		if (users == null || users.isEmpty())
		{
			return getEmptyResponse(null);
		}

		for (User user : users)
		{
			resArr.add(user.getUser());
		}

		respJson.put("results", users.size());
		respJson.put("users", resArr);

		return respJson;
	}

	private JSONObject returnUser(String parameter, String value)
	{
		DbAccess db = new DbAccess();

		JSONArray resArr = new JSONArray();

		JSONObject respJson = new JSONObject();

		List<User> users = db.getUser(parameter, value);

		if (users == null || users.isEmpty())
		{
			return getEmptyResponse(null);
		}

		for (User user : users)
		{
			resArr.add(user.getUser());
		}

		respJson.put("results", users.size());
		respJson.put("users", resArr);

		return respJson;
	}

	public JSONObject getEmptyResponse(String input)
	{
		JSONObject returnObj = new JSONObject();

		returnObj.put("results", 0);

		if (input == null || input.isEmpty())
		{
			returnObj.put("users", new ArrayList<>());
		}
		else
		{
			returnObj.put("info", input);
		}

		return returnObj;
	}
}
