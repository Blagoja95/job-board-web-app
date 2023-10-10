package com.example.posting.user;

import com.example.posting.app.OverrideServlet;
import com.example.posting.database.DbAccess;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import org.json.simple.JSONObject;
import org.mindrot.jbcrypt.BCrypt;

import java.io.IOException;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.*;

@WebServlet("/register")
public class RegiserUserServlet extends OverrideServlet
{

	public RegiserUserServlet()
	{
		super();

		requestName = "register";
	}

	public void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException
	{
		response.addHeader("Access-Control-Allow-Origin", request.getHeader("Origin"));
		response.addHeader("Access-Control-Allow-Credentials", "true");

		response.setContentType("application/json");

		JSONObject respJson = new JSONObject();
		HttpSession session = request.getSession(false);

		if (session != null && session.getId().equals(this.getCookieValue(request, "JSESSIONID")))
		{
			String user = this.getCookieValue(request, "username");

			response.getWriter().println((!user.isEmpty() ? user + " y" : "Y") + "ou are already logged in!");

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

		DbAccess db = new DbAccess();

		try
		{
			ResultSet res1 = db.checkIfExist(new ArrayList<>(List.of("users", "username", request.getParameter("username"))));

			if (res1 == null || res1.next())
			{
				response.getWriter().println(this.getErrorJSON("Username already exist!"));

				return;
			}

			ResultSet res2 = db.checkIfExist(new ArrayList<>(List.of("users", "email", request.getParameter("email"))));

			if (res2 == null || res2.next())
			{
				response.getWriter().println(this.getErrorJSON("Email address already exist!"));

				return;
			}

		} catch (SQLException e)
		{
			throw new RuntimeException(e);
		}

		int id = (int) (Math.random() * 1800) + 100;

		String hashPass = BCrypt.hashpw(request.getParameter("password"), BCrypt.gensalt(12));

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
		JSONObject innerJson = new JSONObject();

		innerJson.put("status", 1);
		innerJson.put("info", "Wellcome " + user.getName());

		if(session == null)
		{
			session = request.getSession();
		}

		session.setAttribute("userID", user.getId() + "");
		session.setAttribute("username", user.getUsername());

		Cookie cookie1 = new Cookie("userID", user.getId() + "");
		Cookie cookie2 = new Cookie("username", user.getUsername());

		cookie1.setMaxAge(this.EXPIRATION_TIME);
		cookie2.setMaxAge(this.EXPIRATION_TIME);

		response.addCookie(cookie1);
		response.addCookie(cookie2);

		resjson.put(this.requestName, innerJson);

		response.getWriter().println(resjson);
	}
}
