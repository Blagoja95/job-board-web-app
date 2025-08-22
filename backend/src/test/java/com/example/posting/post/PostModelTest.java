package com.example.posting.post;

import org.json.simple.JSONObject;
import org.junit.Assert;
import org.junit.Test;

import java.util.Date;

public class PostModelTest extends PostModel
{
	private final PostModel p1 = new PostModel(10231, "1231", "Tritol", "Work offer 123", "full time", "Banja Luka", "To do ...", "To do ...", new Date(213342));

	@Test
	public void testGetJSONPost()
	{
		JSONObject post = new JSONObject();

		post.put("id", 10231);
		post.put("companyID", "1231");
		post.put("companyName", "Tritol");
		post.put("title", "Work offer 123");
		post.put("type", "full time");
		post.put("city", "Banja Luka");
		post.put("about", "To do ...");
		post.put("qual", "To do ...");
		post.put("date", new Date(213342).toString());

		Assert.assertEquals(p1.getPost(), post);
	}

	@Test
	public void testToString()
	{
		Assert.assertEquals(p1.toString(), "{\"date\":\"Thu Jan 01 01:03:33 CET 1970\",\"companyID\":\"1231\",\"city\":\"Banja Luka\",\"companyName\":\"Tritol\",\"about\":\"To do ...\",\"qual\":\"To do ...\",\"id\":10231,\"title\":\"Work offer 123\",\"type\":\"full time\"}");
	}
}
