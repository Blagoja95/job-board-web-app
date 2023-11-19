package com.example.posting.app;

import org.junit.Test;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import java.util.StringJoiner;

public class OverrideServletTest
{
	public OverrideServlet test = new OverrideServlet();

	@DisplayName("should return JSON with one property named \"request\"")
	@Test
	public void testGenericResponse()
	{
		Assertions.assertEquals(test.getErrorJSON(null).toJSONString(), "{\"request\":{\"status\":0,\"info\":\"Generic Error!\"}}");
		Assertions.assertEquals(test.getErrorJSON("Access Denied!").toJSONString(), "{\"request\":{\"status\":0,\"info\":\"Access Denied!\"}}");
	}

	@Test
	public void requestNameIsGiven()
	{
		test.requestName = "posts";
		Assertions.assertEquals(test.getErrorJSON(null).toJSONString(), "{\"posts\":{\"status\":0,\"info\":\"Generic Error!\"}}");
		Assertions.assertEquals(test.getErrorJSON("Post with ID 1 is not found!").toJSONString(), "{\"posts\":{\"status\":0,\"info\":\"Post with ID 1 is not found!\"}}");

		test.requestName = "users";
		Assertions.assertEquals(test.getErrorJSON(null).toJSONString(), "{\"users\":{\"status\":0,\"info\":\"Generic Error!\"}}");
		Assertions.assertEquals(test.getErrorJSON("No users!").toJSONString(), "{\"users\":{\"status\":0,\"info\":\"No users!\"}}");
	}

	@Test
	public void testingEmptyStringAllCombinations()
	{
		test.requestName = "test empty";

		Assertions.assertEquals(test.getErrorJSON("").toJSONString(), "{\"test empty\":{\"status\":0,\"info\":\"Generic Error!\"}}");
		Assertions.assertEquals(test.getErrorJSON("'").toJSONString(), "{\"test empty\":{\"status\":0,\"info\":\"'\"}}");
		Assertions.assertEquals(test.getErrorJSON("1").toJSONString(), "{\"test empty\":{\"status\":0,\"info\":\"1\"}}");
		Assertions.assertEquals(test.getErrorJSON(new String()).toJSONString(), "{\"test empty\":{\"status\":0,\"info\":\"Generic Error!\"}}");
		Assertions.assertEquals(test.getErrorJSON(String.valueOf(new StringBuffer())).toJSONString(), "{\"test empty\":{\"status\":0,\"info\":\"Generic Error!\"}}");
		Assertions.assertEquals(test.getErrorJSON(String.valueOf(new StringBuilder())).toJSONString(), "{\"test empty\":{\"status\":0,\"info\":\"Generic Error!\"}}");
		Assertions.assertEquals(test.getErrorJSON(String.valueOf(new StringJoiner(","))).toJSONString(), "{\"test empty\":{\"status\":0,\"info\":\"Generic Error!\"}}");
		Assertions.assertEquals(test.getErrorJSON(String.valueOf(new StringJoiner(";"))).toJSONString(), "{\"test empty\":{\"status\":0,\"info\":\"Generic Error!\"}}");
		Assertions.assertEquals(test.getErrorJSON(String.valueOf(new StringJoiner("."))).toJSONString(), "{\"test empty\":{\"status\":0,\"info\":\"Generic Error!\"}}");
		Assertions.assertEquals(test.getErrorJSON(String.valueOf(new StringJoiner("'"))).toJSONString(), "{\"test empty\":{\"status\":0,\"info\":\"Generic Error!\"}}");

	}
}
