package com.example.posting.post;

import com.example.posting.database.DbAccess;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@WebServlet("/posts")
public class PostsServlet extends HttpServlet
{
	public void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException
	{
		response.setContentType("application/json");

		//TODO: more research on CORS topic; GITHUB isue #11
		response.addHeader("Access-Control-Allow-Origin", "*");
		response.addHeader("Access-Control-Allow-Headers",
				"Origin, X-Requested-With, Content-Type, Accept");

		if (request.getParameterMap().size() == 0)
		{
			response.getWriter().println(returnAllPosts());

		}
		else if (request.getParameterMap().containsKey("title"))
		{
			String title = request.getParameter("title");

			if (title.length() == 0)
			{
				response.getWriter().println(new JSONObject().put("title", "title!"));
				return;
			}

			response.getWriter().println(returnPost("title", title));

		}
		else if (request.getParameterMap().containsKey("city"))
		{
			String city = request.getParameter("city");

			if (city.length() == 0)
			{
				response.getWriter().println(new JSONObject().put("city", "city!"));
				return;
			}

			response.getWriter().println(returnPost("city", city));

		}
		else if (request.getParameterMap().containsKey("type"))
		{
			String type = request.getParameter("type");

			if (type.length() == 0)
			{
				response.getWriter().println(new JSONObject().put("type", "type!"));
				return;
			}

			response.getWriter().println(returnPost("type", type));

		}
		else if (!request.getParameterMap().containsKey("delete") && request.getParameterMap().containsKey("id"))
		{
			// This branch return detailed post by ID
			String id = request.getParameter("id");

			if (id.length() == 0)
			{
				response.getWriter().println(new JSONObject().put("posts", "id!"));
				return;
			}

			response.getWriter().println(returnPost("id", id));

		}
		else if (request.getParameterMap().containsKey("delete"))
		{
			deletePost(request);
			response.sendRedirect(request.getHeader("origin"));
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

	@WebServlet("/update")
	public class UpdateServlet extends HttpServlet
	{
		public void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException
		{
			response.setContentType("application/json");

			//TODO: more research on CORS topic; GITHUB isue #11
			response.addHeader("Access-Control-Allow-Origin", "*");
			response.addHeader("Access-Control-Allow-Headers",
					"Origin, X-Requested-With, Content-Type, Accept");

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
	}


	public void deletePost(HttpServletRequest request) throws IOException
	{
		new DbAccess().deletePost(request.getParameter("id"));
	}

	public void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException
	{
		response.setContentType("application/json");

		//TODO: more research on CORS topic; GITHUB isue #11
		response.addHeader("Access-Control-Allow-Origin", "*");
		response.addHeader("Access-Control-Allow-Headers",
				"Origin, X-Requested-With, Content-Type, Accept");

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

		DbAccess db = new DbAccess();

		db.createPost(post);

		respJson.put("success", post.getId());

		response.getWriter().println(respJson);
	}

	public JSONObject getEmptyResponse (String input)
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
}
