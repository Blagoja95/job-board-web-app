package com.example.posting.user;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.junit.Assert;
import org.junit.Test;

public class UserTest extends User
{

	private final User u1 = new User(123, "My name", "123sadwqed123eerwedgssd23e44t", "mail@at.me", "My name is ...", "user1", "Banja Luka");
	private final User u2 = new User();

	@Test
	public void getUserString()
	{
		Assert.assertEquals(u1.toString(), "{\"city\":\"Banja Luka\",\"name\":\"My name\",\"about\":\"My name is ...\",\"id\":123,\"email\":\"mail@at.me\",\"username\":\"user1\"}");

		Assert.assertEquals(u2.toString(), "{\"city\":null,\"name\":null,\"about\":null,\"id\":0,\"email\":null,\"username\":null}");
	}

	@Test
	public void getUserJSON()
	{
		JSONObject expected = new JSONObject();

		expected.put("id", 123);
		expected.put("name", "My name");
		expected.put("username", "user1");
		expected.put("email", "mail@at.me");
		expected.put("about", "My name is ...");
		expected.put("city", "Banja Luka");

		Assert.assertEquals(u1.getUser(), expected);

		JSONObject expected2 = new JSONObject();

		expected2.put("id", 0);
		expected2.put("name", null);
		expected2.put("username", null);
		expected2.put("email", null);
		expected2.put("about", null);
		expected2.put("city", null);

		Assert.assertEquals(u2.getUser(), expected2);
	}

	@Test
	public void testGetUserLogin()
	{
		JSONArray userLogin = new JSONArray();

		userLogin.add("user1");
		userLogin.add("123sadwqed123eerwedgssd23e44t");

		Assert.assertEquals(u1.getUserLogin(), userLogin);

		JSONArray userLogin2 = new JSONArray();

		userLogin2.add(null);
		userLogin2.add(null);

		Assert.assertEquals(u2.getUserLogin(), userLogin2);
	}
}
