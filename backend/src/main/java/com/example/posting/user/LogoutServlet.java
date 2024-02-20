package com.example.posting.user;

import com.example.posting.app.OverrideServlet;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import org.json.simple.JSONObject;

import java.io.IOException;

@WebServlet("/logout")
public class LogoutServlet extends OverrideServlet
{

	public LogoutServlet()
	{
		super();

		requestName = "logout";
	}

	@Override
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException
	{
		response.addHeader("Access-Control-Allow-Origin", request.getHeader("Origin"));
		response.addHeader("Access-Control-Allow-Credentials", "true");

		response.setContentType("application/json");

		HttpSession session = request.getSession(false);

		if (this.checkSession(request, response))
		{
			return;
		}

		JSONObject inner = new JSONObject();
		inner.put("status", 1);
		inner.put("info", "Successfully logout");

		session.invalidate();

		JSONObject retJSON = new JSONObject();
		retJSON.put(this.requestName, inner);

		response.getWriter().println(retJSON);
	}
}
