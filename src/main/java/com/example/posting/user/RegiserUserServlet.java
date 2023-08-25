package com.example.posting.user;

import com.example.posting.database.DbAccess;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.json.simple.JSONObject;

import java.io.IOException;
import java.util.LinkedList;
import java.util.List;

@WebServlet("/register")
public class RegiserUserServlet extends HttpServlet
{

	public void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException
	{
		//TODO: more research on CORS topic; GITHUB isue #11
		response.addHeader("Access-Control-Allow-Origin", "*");
		response.addHeader("Access-Control-Allow-Headers",
				"Origin, X-Requested-With, Content-Type, Accept");

		response.setContentType("application/json");

		JSONObject respJson = new JSONObject();

		String pass = request.getParameter("password");

		if (pass.length() == 0)
		{
			respJson.put("wrongPass", "pogresna lozinka");
			response.getWriter().println(respJson);
			return;
		}

		int hashPass = pass.hashCode();

		int id = (int) (Math.random() * 1800) + 100;

		User user = new User(
				id,
				request.getParameter("name"),
				hashPass,
				request.getParameter("email"),
				request.getParameter("about"),
				request.getParameter("username"),
				request.getParameter("city")
		);

		DbAccess db = new DbAccess();

		db.createUser(user);

		respJson.put("success", new LinkedList<>(List.of(user.getUsername(), user.getId())));

		response.getWriter().println(respJson);
	}

}
