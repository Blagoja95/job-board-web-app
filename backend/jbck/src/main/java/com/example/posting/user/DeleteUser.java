package com.example.posting.user;

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

@WebServlet("/users/delete")
public class DeleteUser extends OverrideServlet
{
	public DeleteUser()
	{
		super();

		requestName = "users";
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
			response.getWriter().println(this.getErrorJSON("UserID parameter is missing!"));

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
			ResultSet res = db.checkIfExist(List.of("users", "id", id));

			if (res == null || !res.next())
			{
				response.getWriter().println(this.getErrorJSON("User with ID " + id + " is not found!"));

				return;
			}

			if (!res.getString("id").equals(userID))
			{
				response.getWriter().println(this.getErrorJSON("Delete action denied!"));

				return;
			}
		} catch (SQLException e)
		{
			throw new RuntimeException(e);
		}

		int sqlResInt = db.deleteUser(id);

		JSONObject jsonRes = new JSONObject();
		JSONObject jsonInner = new JSONObject();

		if (sqlResInt != 0)
		{
			jsonInner.put("status", 1);
			jsonInner.put("info", "User successfully deleted!");

			request.getSession(false).invalidate();
		}
		else
		{
			jsonInner.put("status", 0);
			jsonInner.put("info", "Error, check user ID!");
		}

		jsonRes.put(this.requestName, jsonInner);

		response.getWriter().println(jsonRes);
	}
}
