package com.example.posting.app;

import org.junit.Assert;
import org.junit.Test;
import java.util.StringJoiner;

public class OverrideServletTest
{
	@Test
	public void test ()
	{
		OverrideServlet test = new OverrideServlet();

		Assert.assertEquals(test.getErrorJSON(null).toJSONString(), "{\"request\":{\"status\":0,\"info\":\"Generic Error!\"}}");
		Assert.assertEquals(test.getErrorJSON("Access Denied!").toJSONString(), "{\"request\":{\"status\":0,\"info\":\"Access Denied!\"}}");

		test.requestName = "posts";

		Assert.assertEquals(test.getErrorJSON(null).toJSONString(), "{\"posts\":{\"status\":0,\"info\":\"Generic Error!\"}}");
		Assert.assertEquals(test.getErrorJSON("Post with ID 1 is not found!").toJSONString(), "{\"posts\":{\"status\":0,\"info\":\"Post with ID 1 is not found!\"}}");

		test.requestName = "test empty";
		Assert.assertEquals(test.getErrorJSON("").toJSONString(), "{\"test empty\":{\"status\":0,\"info\":\"Generic Error!\"}}");
		Assert.assertEquals(test.getErrorJSON("'").toJSONString(), "{\"test empty\":{\"status\":0,\"info\":\"'\"}}");
		Assert.assertEquals(test.getErrorJSON("1").toJSONString(), "{\"test empty\":{\"status\":0,\"info\":\"1\"}}");
		Assert.assertEquals(test.getErrorJSON(new String()).toJSONString(), "{\"test empty\":{\"status\":0,\"info\":\"Generic Error!\"}}");
		Assert.assertEquals(test.getErrorJSON(String.valueOf(new StringBuffer())).toJSONString(), "{\"test empty\":{\"status\":0,\"info\":\"Generic Error!\"}}");
		Assert.assertEquals(test.getErrorJSON(String.valueOf(new StringBuilder())).toJSONString(), "{\"test empty\":{\"status\":0,\"info\":\"Generic Error!\"}}");
		Assert.assertEquals(test.getErrorJSON(String.valueOf(new StringJoiner(","))).toJSONString(), "{\"test empty\":{\"status\":0,\"info\":\"Generic Error!\"}}");
		Assert.assertEquals(test.getErrorJSON(String.valueOf(new StringJoiner(";"))).toJSONString(), "{\"test empty\":{\"status\":0,\"info\":\"Generic Error!\"}}");
		Assert.assertEquals(test.getErrorJSON(String.valueOf(new StringJoiner("."))).toJSONString(), "{\"test empty\":{\"status\":0,\"info\":\"Generic Error!\"}}");
		Assert.assertEquals(test.getErrorJSON(String.valueOf(new StringJoiner("'"))).toJSONString(), "{\"test empty\":{\"status\":0,\"info\":\"Generic Error!\"}}");
	}
}
