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

@WebServlet("/login")
public class LoginServlet extends HttpServlet
{

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

		JSONObject respJson = new JSONObject();

        if (user.getHashPass() == hash)
        {
            respJson.put("success", new LinkedList<>(List.of(user.getUsername(), user.getId())));

            request.getSession().setAttribute(user.getUsername(), user.getId());
        }
        else
        {
            respJson.put("wrongpassword", "pogresna lozinka");
        }

		response.getWriter().println(respJson);

	}

	private JSONObject getErrorJSON (String info)
	{
		JSONObject innerJSON = new JSONObject();
		JSONObject response = new JSONObject();

		innerJSON.put("status", 0);
		innerJSON.put("info", info.isEmpty() ? "Generic Error!" : info);

		response.put("register", innerJSON);

		return response;
	}
}
