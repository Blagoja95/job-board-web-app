package com.example.posting.user;

import com.example.posting.app.OverrideServlet;
import com.example.posting.database.DbAccess;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.json.simple.JSONObject;
import java.io.IOException;
import java.util.LinkedList;
import java.util.List;

@WebServlet("/login")
public class LoginServlet extends OverrideServlet
{

	public LoginServlet () {
		super();

		requestName = "login";
	}

	public void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException
	{
//        //TODO: more research on CORS topic; GITHUB isue #11
		response.addHeader("Access-Control-Allow-Origin", "*");
		response.addHeader("Access-Control-Allow-Headers",
				"Origin, X-Requested-With, Content-Type, Accept");

		response.setContentType("application/json");


		if (!request.getParameterMap().containsKey("username") || !request.getParameterMap().containsKey("password"))
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

		String username = request.getParameter("username");
		int hash = request.getParameter("password").hashCode();

		List<User> users = new DbAccess().getUser("username", username);

		User user;

		if (users != null && users.size() >= 1)
		{
			user = users.get(0);
		}
		else
		{
			response.getWriter().println(this.getErrorJSON("There is no user with provided credentials!"));

			return;
		}

		JSONObject resjson = new JSONObject();

        if (user.getHashPass() == hash)
        {
			JSONObject innerJson = new JSONObject();

			innerJson.put("status", 1);
			innerJson.put("success", new LinkedList<>(List.of(user.getUsername(), user.getId())));
			resjson.put("login", innerJson);

            request.getSession().setAttribute(user.getUsername(), user.getId());
        }
        else
        {
            resjson = this.getErrorJSON("Incorrect password!");
        }

		response.getWriter().println(resjson);
	}
}
