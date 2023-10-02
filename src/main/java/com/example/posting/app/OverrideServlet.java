package com.example.posting.app;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.json.simple.JSONObject;

import java.io.IOException;

public class OverrideServlet extends HttpServlet
{
	protected String requestName = "request";
	protected int EXPIRATION_TIME = 1800; // seconds

	protected JSONObject getErrorJSON(String info)
	{
		JSONObject innerJSON = new JSONObject();
		JSONObject response = new JSONObject();

		innerJSON.put("status", 0);
		innerJSON.put("info", info.isEmpty() ? "Generic Error!" : info);

		response.put(this.requestName, innerJSON);

		return response;
	}

	protected boolean checkSession(HttpServletRequest request, HttpServletResponse response) throws IOException
	{
		Cookie[] allCookies = request.getCookies();

		if (allCookies == null || allCookies.length == 0)
		{
			response.getWriter().println(this.getErrorJSON("Missing Cookie!"));

			return true;
		}

		String username = request.getSession().getAttribute("username") + "";
		String userID = request.getSession().getAttribute("userID") + "";

		if (userID.isEmpty() || username.isEmpty())
		{
			response.getWriter().println(this.getErrorJSON("You must first be logged in!"));

			return true;
		}

		for (Cookie c : allCookies)
		{
			if (c.getName().equals("username"))
			{
				System.out.println(c.getValue());
				if (c.getName().equals(username))
				{
					response.getWriter().println(this.getErrorJSON("Wrong username!"));

					return true;
				}
			}

			if (c.getName().equals("userID"))
			{
				System.out.println(c.getValue());

				if (c.getName().equals(userID))
				{
					response.getWriter().println(this.getErrorJSON("Wrong user ID!"));

					return true;
				}
			}
		}

		return false;
	}

	protected boolean checkIfEmptyParameters(HttpServletRequest request, HttpServletResponse response) throws IOException
	{
		if (request.getParameterMap().keySet().isEmpty())
		{
			response.getWriter().println(this.getErrorJSON("No parameters provided!"));

			return true;
		}

		return false;
	}

	protected boolean checkIfEmptyParametersValues(HttpServletRequest request, HttpServletResponse response) throws IOException
	{
		for (String i : request.getParameterMap().keySet())
		{
			if (request.getParameter(i).isEmpty())
			{
				response.getWriter().println(this.getErrorJSON(i.substring(0, 1).toUpperCase() + i.substring(1) + " is empty!"));

				return true;
			}
		}

		return false;
	}

	protected String getCookieValue(HttpServletRequest request, String name)
	{
		if (name == null || name.isEmpty())
		{
			return "";
		}

		Cookie[] cookies = request.getCookies();

		if (cookies == null || cookies.length < 1) {
			return "";
		}

		for (Cookie c : cookies)
		{
			if (c.getName().equals(name))
			{
				return c.getValue();
			}
		}

		return "";
	}
}
