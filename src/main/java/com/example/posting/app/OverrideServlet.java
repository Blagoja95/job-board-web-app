package com.example.posting.app;

import jakarta.servlet.http.HttpServlet;
import org.json.simple.JSONObject;

public class OverrideServlet extends HttpServlet
{
	protected String requestName = "request";

	protected JSONObject getErrorJSON(String info)
	{
		JSONObject innerJSON = new JSONObject();
		JSONObject response = new JSONObject();

		innerJSON.put("status", 0);
		innerJSON.put("info", info.isEmpty() ? "Generic Error!" : info);

		response.put(this.requestName, innerJSON);

		return response;
	}
}
