package com.ssm.test;

import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.UnsupportedEncodingException;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import org.junit.Test;

public class TestInputstream {
	@Test
	public void test() throws IOException {
	    InputStreamReader isr = new InputStreamReader(new FileInputStream("E:\\share\\agv任务列表.txt"),"UTF8") ;
	    char[] buff=new char[1024];
	    int len=0;
	    StringBuffer sBuffer=new StringBuffer();
	    while((len=isr.read(buff))!=-1) {
	    	String x=new String(buff,0,len);
	    	sBuffer.append(x);
//	    	System.out.println(x);
	    }
//	    System.out.println(sBuffer);
	    try {
			JSONArray jsonArray=new JSONArray(sBuffer.toString());
			System.out.println(jsonArray.get(0));
			
			for (int i =0;i<jsonArray.length();i++) {
				JSONObject jsonObject=new JSONObject(jsonArray.get(i).toString());
				if (jsonObject.getString("name").equals("Move")) {
					System.out.println(jsonObject.get("guid"));
				}
			}
			
		} catch (JSONException e) {
			e.printStackTrace();
		}
	    
	}
}
