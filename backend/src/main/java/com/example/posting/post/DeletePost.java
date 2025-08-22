package com.example.posting.post;

import com.example.posting.app.OverrideServlet;
import com.example.posting.database.DbAccess;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.json.simple.JSONObject;

import java.io.IOException;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

@WebServlet("/posts/delete")
public class DeletePost extends OverrideServlet
{
	public DeletePost()
	{
		super();

		requestName = "posts";
	}

	public void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException
	{
		response.setContentType("application/json");

		String origin = request.getHeader("Origin");

		if (origin != null)
		{
			response.setHeader("Access-Control-Allow-Origin", origin);
		}
		else
		{
			response.setStatus(HttpServletResponse.SC_BAD_REQUEST);

			response.getWriter().println(this.getErrorJSON("Missing 'Origin' header"));

			return;
		}

		response.addHeader("Access-Control-Allow-Methods", "*");
		response.addHeader("Access-Control-Allow-Credentials", "true");

		if (this.checkUserCookies(request, response))
		{
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

		String id = request.getParameter("id");

		if (id == null || id.isBlank())
		{
			response.getWriter().println(this.getErrorJSON("PostID parameter is missing!"));

			return;
		}

		DbAccess db = new DbAccess();

		String userID = this.getCookieValue(request, "userID");

		if (userID.isBlank())
		{
			response.getWriter().println(this.getErrorJSON("UserID cookie is missing!"));

			return;
		}

		try
		{
			ResultSet res = db.checkIfExist(List.of("posts", "id", id));

			if (res == null || !res.next())
			{
				response.getWriter().println(this.getErrorJSON("Post with ID " + id + " is not found!"));

				return;
			}

			if (!res.getString("companyID").equals(userID))
			{
				response.getWriter().println(this.getErrorJSON("Delete action denied!"));

				return;
			}
		} catch (SQLException e)
		{
			throw new RuntimeException(e);
		}

		int sqlResInt = db.deletePost(id);

		JSONObject jsonRes = new JSONObject();
		JSONObject jsonInner = new JSONObject();

		if (sqlResInt != 0)
		{
			jsonInner.put("status", 1);
			jsonInner.put("info", "Post successfully deleted!");
		}
		else
		{
			jsonInner.put("status", 0);
			jsonInner.put("info", "Error, check post ID!");
		}

		jsonRes.put(this.requestName, jsonInner);

		response.getWriter().println(jsonRes);
	}
}
