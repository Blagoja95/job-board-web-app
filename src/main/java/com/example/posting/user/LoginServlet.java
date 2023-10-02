package com.example.posting.user;

import jakarta.servlet.http.Cookie;
import org.mindrot.jbcrypt.BCrypt;
import com.example.posting.app.OverrideServlet;
import com.example.posting.database.DbAccess;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.json.simple.JSONObject;

import java.io.IOException;
import java.util.List;

@WebServlet("/login")
public class LoginServlet extends OverrideServlet
{

	public LoginServlet()
	{
		super();

		requestName = "login";
	}

	public void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException
	{
		response.addHeader("Access-Control-Allow-Origin", request.getHeader("Origin"));
		response.addHeader("Access-Control-Allow-Credentials", "true");

		response.setContentType("application/json");

		if (!request.getParameterMap().containsKey("username") || !request.getParameterMap().containsKey("password"))
		{
			response.getWriter().println(this.getErrorJSON("Incorrect or missing parameters!"));

			return;
		}

		if (this.checkIfEmptyParametersValues(request, response))
		{
			return;
		}

		String username = request.getParameter("username");

		List<User> users = new DbAccess().getUser("username", username);

		User user;

		if (users != null && !users.isEmpty())
		{
			user = users.get(0);
		}
		else
		{
			response.getWriter().println(this.getErrorJSON("There is no user with provided credentials!"));

			return;
		}

		JSONObject resjson = new JSONObject();

		if (BCrypt.checkpw(request.getParameter("password"), user.getHashPass()))
		{
			JSONObject innerJson = new JSONObject();

			innerJson.put("status", 1);
			innerJson.put("info", "Welcome " + user.getName());
			resjson.put("login", innerJson);

			request.getSession().setAttribute("userID", user.getId() + "");
			request.getSession().setAttribute("username", user.getUsername());

			Cookie cookie1 = new Cookie("userID", user.getId() + "");
			Cookie cookie2 = new Cookie("username", user.getUsername());

			cookie1.setMaxAge(this.EXPIRATION_TIME);
			cookie2.setMaxAge(this.EXPIRATION_TIME);

			response.addCookie(cookie1);
			response.addCookie(cookie2);
		}
		else
		{
			resjson = this.getErrorJSON("Incorrect password!");
		}

		response.getWriter().println(resjson);
	}
}
