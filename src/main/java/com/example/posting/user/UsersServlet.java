package com.example.posting.user;

import com.example.posting.database.DbAccess;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@WebServlet("/users")
public class UsersServlet extends HttpServlet
{
	public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException
	{
		response.setContentType("application/json");

		response.addHeader("Access-Control-Allow-Origin", "*");
		response.addHeader("Access-Control-Allow-Headers",
				"Origin, X-Requested-With, Content-Type, Accept");

		if (request.getParameterMap().size() == 0)
		{
			response.getWriter().println(returnAllUsers());
		}
		else if (request.getParameterMap().containsKey("name"))
		{
			String name = request.getParameter("name");

			if (name.length() == 0)
			{
				response.getWriter().println(new JSONObject().put("users", "name!"));
				return;
			}

			response.getWriter().println(returnUser("name", name));
		}
		else if (request.getParameterMap().containsKey("email"))
		{
			String email = request.getParameter("email");

			if (email.length() == 0)
			{
				response.getWriter().println(new JSONObject().put("email", "email!"));
				return;
			}

			response.getWriter().println(returnUser("email", email));
		}
		else if (request.getParameterMap().containsKey("city"))
		{
			String city = request.getParameter("city");

			if (city.length() == 0)
			{
				response.getWriter().println(new JSONObject().put("city", "city!"));
				return;
			}

			response.getWriter().println(returnUser("city", city));
		}
		else if (request.getParameterMap().containsKey("username"))
		{
			String username = request.getParameter("username");

			if (username.length() == 0)
			{
				response.getWriter().println(new JSONObject().put("users", "korisnicko ime!"));
				return;
			}

			response.getWriter().println(returnUser("username", username));
		}
		else if (!request.getParameterMap().containsKey("delete") && request.getParameterMap().containsKey("id"))
		{
			String id = request.getParameter("id");

			if (id.length() == 0)
			{
				response.getWriter().println(new JSONObject().put("users", "id!"));
				return;
			}

			response.getWriter().println(returnUser("id", id));
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

	public JSONObject getEmptyResponse (String input)
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

	public void doDelete(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException
	{
		int sqlResInt = new DbAccess().deleteUser(request.getParameter("id"));

		JSONObject jsonRes = new JSONObject();

		jsonRes.put("response", sqlResInt);

		response.getWriter().println(jsonRes);
	}
}
