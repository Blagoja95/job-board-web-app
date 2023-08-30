package com.example.posting.post;

import com.example.posting.app.OverrideServlet;
import com.example.posting.database.DbAccess;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import java.io.IOException;
import java.util.*;

@WebServlet("/posts")
public class PostsServlet extends OverrideServlet
{
	public PostsServlet () {
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

		for (String i : request.getParameterMap().keySet())
		{
			if (request.getParameter(i).isEmpty())
			{
				response.getWriter().println(this.getErrorJSON(i.substring(0, 1).toUpperCase() + i.substring(1) + " is empty!"));

				return;
			}
		}

		if (request.getParameterMap().size() == 0)
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
			return getEmptyResponse(null);
		}

		for (PostModel post : posts)
		{
			resArr.add(post.getPost());
		}

		respJson.put("results", posts.size());
		respJson.put("posts", resArr);

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
			return getEmptyResponse(null);
		}

		for (PostModel post : posts)
		{
			resArr.add(post.getPost());
		}

		respJson.put("results", posts.size());
		respJson.put("posts", resArr);

		return respJson;
	}

	public void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException
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

		for (String i : request.getParameterMap().keySet())
		{
			if (request.getParameter(i).isEmpty())
			{
				response.getWriter().println(this.getErrorJSON(i.substring(0, 1).toUpperCase() + i.substring(1) + " is empty!"));

				return;
			}
		}

		DbAccess db = new DbAccess();

		String companyID = request.getParameter("companyID");

		if (db.checkIfExist(List.of("users", "id", companyID)) != 1)
		{
			response.getWriter().println(this.getErrorJSON("Company with id " + companyID + " does not exist!"));

			return;
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

		db.createPost(post);

		JSONObject resjson = new JSONObject();

		resjson.put("status", 1);
		resjson.put("id", post.getId());

		respJson.put("posts", resjson);

		response.getWriter().println(respJson);
	}

	public JSONObject getEmptyResponse(String input)
	{
		JSONObject returnObj = new JSONObject();

		returnObj.put("results", 0);

		if (input == null || input.isEmpty())
		{
			returnObj.put("posts", new ArrayList<>());
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

		//TODO: more research on CORS topic; GITHUB isue #11
		response.addHeader("Access-Control-Allow-Origin", "*");
		response.addHeader("Access-Control-Allow-Headers",
				"Origin, X-Requested-With, Content-Type, Accept");

		int sqlResInt = new DbAccess().deletePost(request.getParameter("id"));

		JSONObject jsonRes = new JSONObject();

		jsonRes.put("response", sqlResInt);

		response.getWriter().println(jsonRes);
	}
}
