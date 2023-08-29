package com.example.posting.post;

import com.example.posting.database.DbAccess;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.json.simple.JSONObject;

import java.io.IOException;

@WebServlet("/posts/update")
public class UpdatePostServlet extends HttpServlet
{
	public void doPost (HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException
	{
		response.setContentType("application/json");

		//TODO: more research on CORS topic; GITHUB isue #11
		response.addHeader("Access-Control-Allow-Origin", "*");
		response.addHeader("Access-Control-Allow-Headers",
				"Origin, X-Requested-With, Content-Type, Accept");

		if (request.getParameterMap().keySet().isEmpty())
		{
			response.getWriter().println(this.getErrorJSON("No parameters provided!"));

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

		JSONObject respJson = new JSONObject();

		PostModel post = new PostModel(
				Integer.parseInt(request.getParameter("id")),
				request.getParameter("title"),
				request.getParameter("type"),
				request.getParameter("city"),
				request.getParameter("about"),
				request.getParameter("qual")
		);

		DbAccess db = new DbAccess();

		db.updatePost(post);

		respJson.put("success", post.getId());

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