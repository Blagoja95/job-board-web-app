package com.example.posting.post;

import com.example.posting.app.OverrideServlet;
import com.example.posting.database.DbAccess;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;

import javax.naming.spi.Resolver;
import java.io.IOException;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.*;

@WebServlet("/posts")
public class PostsServlet extends OverrideServlet
{
	public PostsServlet()
	{
		super();

		requestName = "posts";
	}

	public void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException
	{
		response.setContentType("application/json");

		//TODO: more research on CORS topic; GITHUB isue #11
		response.addHeader("Access-Control-Allow-Origin", "*");
		response.addHeader("Access-Control-Allow-Headers",
				"Origin, X-Requested-With, Content-Type, Accept");

		if (!request.getParameterMap().isEmpty())
		{
			if (this.checkIfEmptyParametersValues(request, response))
			{
				return;
			}
		}

		if (request.getParameterMap().isEmpty())
		{
			response.getWriter().println(returnAllPosts());
		}
		else if (request.getParameterMap().containsKey("title"))
		{
			response.getWriter().println(returnPost("title", request.getParameter("title")));
		}
		else if (request.getParameterMap().containsKey("city"))
		{
			response.getWriter().println(returnPost("city", request.getParameter("city")));
		}
		else if (request.getParameterMap().containsKey("type"))
		{
			response.getWriter().println(returnPost("type", request.getParameter("type")));
		}
		else if (!request.getParameterMap().containsKey("delete") && request.getParameterMap().containsKey("id"))
		{
			// This branch return detailed post by ID
			response.getWriter().println(returnPost("id", request.getParameter("id")));
		}
		else if (!request.getParameterMap().containsKey("delete") && request.getParameterMap().containsKey("companyID"))
		{
			// This branch return detailed post by ID
			response.getWriter().println(returnPost("companyID", request.getParameter("companyID")));
		}
		else
		{
			response.getWriter().println(getEmptyResponse("Wrong request!"));
		}
	}

	private JSONObject returnAllPosts()
	{
		DbAccess db = new DbAccess();

		JSONArray resArr = new JSONArray();

		JSONObject respJson = new JSONObject();

		List<PostModel> posts = db.getAllPosts();

		if (posts == null || posts.isEmpty())
		{
			respJson.put("results", 0);
			respJson.put(this.requestName, new ArrayList<>());

			return respJson;
		}

		for (PostModel post : posts)
		{
			resArr.add(post.getPost());
		}

		respJson.put("results", posts.size());
		respJson.put(this.requestName, resArr);

		return respJson;
	}

	private JSONObject returnPost(String parameter, String value)
	{
		DbAccess db = new DbAccess();

		JSONArray resArr = new JSONArray();

		JSONObject respJson = new JSONObject();
		List<PostModel> posts;

		if (parameter.equals("title"))
		{
			posts = db.searchPost(value);
		}
		else
		{
			posts = db.getPost(parameter, value);
		}

		if (posts == null || posts.isEmpty())
		{
			respJson.put("results", 0);
			respJson.put(this.requestName, new ArrayList<>());

			return respJson;
		}

		for (PostModel post : posts)
		{
			resArr.add(post.getPost());
		}

		respJson.put("results", posts.size());
		respJson.put(this.requestName, resArr);

		return respJson;
	}

	public void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException
	{
		response.setContentType("application/json");

		response.addHeader("Access-Control-Allow-Origin", request.getHeader("Origin"));
		response.addHeader("Access-Control-Allow-Credentials", "true");

		if (this.checkUserCookies(request, response))
		{
			return;
		}

		if (this.checkIfEmptyParameters(request, response))
		{
			return;
		}

		Set<String> requiredParameters = new HashSet<>(List.of("companyID",
				"companyName",
				"title",
				"type",
				"city",
				"about",
				"qual"));

		if (!requiredParameters.equals(request.getParameterMap().keySet()))
		{
			response.getWriter().println(this.getErrorJSON("Some required parameters are missing! Please check documentation!"));

			return;
		}

		if (this.checkIfEmptyParametersValues(request, response))
		{
			return;
		}

		DbAccess db = new DbAccess();

		String companyID = this.getCookieValue(request, "userID");

		try
		{
			ResultSet results = db.checkIfExist(List.of("users", "id", companyID));

			if (results == null || !results.next())
			{
				response.getWriter().println(this.getErrorJSON("Company with id " + companyID + " does not exist!"));

				return;
			}
		} catch (SQLException e)
		{
			throw new RuntimeException(e);
		}

		JSONObject respJson = new JSONObject();

		int id = (int) (Math.random() * 10000) + 100;

		PostModel post = new PostModel(
				id,
				request.getParameter("companyID"),
				request.getParameter("companyName"),
				request.getParameter("title"),
				request.getParameter("type"),
				request.getParameter("city"),
				request.getParameter("about"),
				request.getParameter("qual"),
				new Date()
		);

		int i = db.createPost(post);

		JSONObject resjson = new JSONObject();

		resjson.put("status", 1);
		resjson.put("id", post.getId());
		respJson.put(this.requestName, resjson);

		response.getWriter().println(respJson);
	}

	public JSONObject getEmptyResponse(String input)
	{
		JSONObject returnObj = new JSONObject();

		returnObj.put("results", 0);

		if (input == null || input.isEmpty())
		{
			returnObj.put(this.requestName, new ArrayList<>());
		}
		else
		{
			returnObj.put("info", input);
		}

		return returnObj;
	}

	public void doDelete(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException
	{
		response.setContentType("application/json");

		response.setHeader("Access-Control-Allow-Methods", "DELETE");
		response.addHeader("Access-Control-Allow-Origin", request.getHeader("Origin"));
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
