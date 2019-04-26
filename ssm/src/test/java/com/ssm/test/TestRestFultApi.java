package com.ssm.test;

import java.io.InputStream;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.apache.http.HttpEntity;
import org.apache.http.HttpResponse;
import org.apache.http.NameValuePair;
import org.apache.http.client.HttpClient;
import org.apache.http.client.entity.UrlEncodedFormEntity;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.conn.EofSensorInputStream;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.message.BasicNameValuePair;
import org.junit.Test;

import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;

import cn.bp.scada.modle.ScadaCustomWorkstation;
import net.minidev.json.JSONArray;
import net.minidev.json.JSONObject;

public class TestRestFultApi {
	@Test
	public void test() {

//		ScadaCustomWorkstation user = null;
		// User user = null;
		String param = "post";
		String Authorization = "Basic YWRtaW46OGM2OTc2ZTViNTQxMDQxNWJkZTkwOGJkNGRlZTE1ZGZiMTY3YTljODczZmM0YmI4YTgxZjZmMmFiNDQ4YTkxOA==";
		try {
			HttpClient client = HttpClients.createDefault();

			if ("get".equals(param)) {
				HttpGet request = new HttpGet("http://mir.com/api/v2.0.0/missions");
				request.setHeader("Authorization", Authorization);
				HttpResponse response = client.execute(request);
				// HttpEntity entity = response.getEntity();
				org.apache.http.HttpEntity entity = response.getEntity();
				ObjectMapper mapper = new ObjectMapper();

				// org.apache.http.conn.EofSensorInputStream inputStream
				// =(EofSensorInputStream)entity.getContent();
				InputStream inputStream = entity.getContent();
				System.out.println(inputStream);
				
				InputStreamReader reader = new InputStreamReader(inputStream, "UTF-8");
				char[] buff = new char[1024];
				int length = 0;
				while ((length = reader.read(buff)) != -1) {
					String x = new String(buff, 0, length);
					System.out.println(x);
				}
				
				user = mapper.readValue(entity.getContent(), ScadaCustomWorkstation.class);

			} else if ("post".equals(param)) {
				
//				String guid="2c3dc23a-4077-11e9-ae95-f44d306b77ea";
				String guid="e35fa8af-0018-11e9-a028-f44d306b77ea";
				HttpPost request2 = new HttpPost("http://mir.com/api/v2.0.0/mission_queue");
				
				request2.setHeader("Authorization", Authorization);
				request2.setHeader("Content-Type", "application/json");
				
//				List<NameValuePair> nvps = new ArrayList<NameValuePair>();
//				nvps.add(new BasicNameValuePair("mission_id", guid));
				
				
				JSONObject jsonObject =new JSONObject();
				jsonObject.put("mission_id", guid);
//				jsonObject.put("message", "");
////				jsonObject.put("message", "");
//				jsonObject.put("priority", 0);
//				nvps.add(new BasicNameValuePair("Missiion_queues", jsonObject.toJSONString()));
				
//				nvps.add(new BasicNameValuePair("Missiion_queues", "{\"mission_id\":"+guid+"}"));
//				UrlEncodedFormEntity formEntity = new UrlEncodedFormEntity(nvps, "UTF8");
//				StringEntity formEntity = new StringEntity(jsonObject.toString());
				StringEntity formEntity = new StringEntity(jsonObject.toJSONString());
				request2.setEntity(formEntity);
				
				HttpResponse response2 = client.execute(request2);
				org.apache.http.HttpEntity entity = response2.getEntity();
				// HttpEntity entity = response2.getEntity();
//
				InputStream inputStream = entity.getContent();
				System.out.println(inputStream);
				
				InputStreamReader reader = new InputStreamReader(inputStream, "UTF-8");
				char[] buff = new char[1024];
				int length = 0;
				while ((length = reader.read(buff)) != -1) {
					String x = new String(buff, 0, length);
					System.out.println(x);
				}

			} else if ("delete".equals(param)) {

			} else if ("put".equals(param)) {

			}
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
}
