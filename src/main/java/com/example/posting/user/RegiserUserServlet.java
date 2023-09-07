package com.example.posting.user;

import com.example.posting.app.OverrideServlet;
import com.example.posting.database.DbAccess;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.json.simple.JSONObject;
import org.mindrot.jbcrypt.BCrypt;

import java.io.IOException;
import java.util.*;

@WebServlet("/register")
public class RegiserUserServlet extends OverrideServlet
{

	public RegiserUserServlet () {
		super();

		requestName = "register";
	}

	public void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException
	{
		//TODO: more research on CORS topic; GITHUB isue #11
		response.addHeader("Access-Control-Allow-Origin", "*");
		response.addHeader("Access-Control-Allow-Headers",
				"Origin, X-Requested-With, Content-Type, Accept");

		response.setContentType("application/json");

		JSONObject respJson = new JSONObject();

		if (request.getParameterMap().keySet().isEmpty())
		{
			response.getWriter().println(this.getErrorJSON("Incorrect or missing parameters!"));

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

		Set<String> requiredParameters = new HashSet<>(List.of("name",
				"password",
				"email",
				"about",
				"username",
				"city"));

		if (!requiredParameters.equals(request.getParameterMap().keySet()))
		{
			response.getWriter().println(this.getErrorJSON("Some required parameters are missing! Please check documentation!"));

			return;
		}

		String hashPass = BCrypt.hashpw(request.getParameter("password"), BCrypt.gensalt(12));


		int id = (int) (Math.random() * 1800) + 100;

		DbAccess db = new DbAccess();

		if (db.checkIfExist(new ArrayList<>(List.of("users", "username", request.getParameter("username")))) != 0)
		{
			response.getWriter().println(this.getErrorJSON("Username already exist!"));

			return;
		}

		if (db.checkIfExist(new ArrayList<>(List.of("users", "email", request.getParameter("email")))) != 0)
		{
			response.getWriter().println(this.getErrorJSON("Email address already exist!"));

			return;
		}

		User user = new User(
				id,
				request.getParameter("name"),
				hashPass,
				request.getParameter("email"),
				request.getParameter("about"),
				request.getParameter("username"),
				request.getParameter("city")
		);

		db.createUser(user);

		JSONObject resjson = new JSONObject();

		resjson.put("status", 1);
		resjson.put("success", new LinkedList<>(List.of(user.getUsername(), user.getId())));

		respJson.put("register", resjson);

		response.getWriter().println(respJson);
	}
}
