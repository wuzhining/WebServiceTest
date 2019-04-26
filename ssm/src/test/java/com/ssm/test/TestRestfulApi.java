package com.ssm.test;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.net.MalformedURLException;
import java.net.URL;
import java.net.URLEncoder;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

//import org.apache.http.HttpEntity;
import org.apache.http.HttpResponse;
import org.apache.http.NameValuePair;
import org.apache.http.client.HttpClient;
import org.apache.http.client.entity.UrlEncodedFormEntity;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.message.BasicNameValuePair;
import org.codehaus.jackson.map.ObjectMapper;
import org.junit.Test;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

import com.wzn.domain.ScadaCustomWorkstation;
import com.wzn.domain.User;

import sun.net.www.protocol.http.HttpURLConnection;
/**
 * 三种方法实现java调用Restful接口
 * 
 * .		   1.HttpURLConnection实现

　　　　2.HttpClient实现

　　　　3.Spring的RestTemplate 
 * @author wuzhining
 *
 */
public class TestRestfulApi {
	//1、HttpURLConnection实现
//	@Test
	public void test() {
		try {
            String url = "http://localhost:8081/scada/getCustomWorkstation";
//            String param="&data= {hello:'hello'}";
            String param="post";
            url+=param;
            URL restServiceURL = new URL(url);
            HttpURLConnection httpConnection = (HttpURLConnection) restServiceURL
                    .openConnection();
            //param 输入小写，转换成 GET POST DELETE PUT 
            httpConnection.setRequestMethod(param.toUpperCase());
//            httpConnection.setRequestProperty("Accept", "application/json");
            if("post".equals(param)){
                //打开输出开关
                httpConnection.setDoOutput(true);
//                httpConnection.setDoInput(true);

                //传递参数
                String input = "&data="+ URLEncoder.encode("{\"boxSnIn\":\"boxSnIn\",\"conSnIn\":\"conSnIn\",\"deviceSnIn\":\"deviceSnIn\",\"empNoIn\":\"empNoIn\",\"moNumIn\":\"moNumIn\",\"opFlagIn\":\"opFlagIn\",\"proSnIn\":\"proSnIn\",\"workSnIn\":\"workSnIn\"}", "UTF-8");
//                input+="&name="+ URLEncoder.encode("啊啊啊", "UTF-8");
                OutputStream outputStream = httpConnection.getOutputStream();
                outputStream.write(input.getBytes());
                outputStream.flush();
            }
            if (httpConnection.getResponseCode() != 200) {
                throw new RuntimeException(
                        "HTTP GET Request Failed with Error code : "
                                + httpConnection.getResponseCode());
            }
            BufferedReader responseBuffer = new BufferedReader(
                    new InputStreamReader((httpConnection.getInputStream())));
            String output;
            System.out.println("Output from Server:  \n");
            while ((output = responseBuffer.readLine()) != null) {
                System.out.println(output);
            }
            httpConnection.disconnect();
        } catch (MalformedURLException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }
	}
	
	//2、HttpClient实现
	@Test
	public void test2() {
		ScadaCustomWorkstation user = null;
//		User user = null;
		String param="post";
		String Authorization="";
		try {
            HttpClient client = HttpClients.createDefault();
            
            if("get".equals(param)){
                HttpGet request = new HttpGet("http://localhost:8081/scada/getCustomWorkstation");
                request.setHeader("Authorization", Authorization);
                HttpResponse response = client.execute(request);
//                HttpEntity entity = response.getEntity();
                org.apache.http.HttpEntity entity = response.getEntity();
                ObjectMapper mapper = new ObjectMapper();
                user = mapper.readValue(entity.getContent(), ScadaCustomWorkstation.class);
                
            }else if("post".equals(param)){
                HttpPost request2 = new HttpPost("http://localhost:8081/scada/getCustomWorkstation");
//                HttpPost request2 = new HttpPost("http://localhost:8080/tao-manager-web/post/xxx");
                List<NameValuePair> nvps = new ArrayList<NameValuePair>();  
                nvps.add(new BasicNameValuePair("data", "啊啊啊"));  
                UrlEncodedFormEntity formEntity = new UrlEncodedFormEntity(nvps, "UTF8");
                request2.setEntity(formEntity);
                HttpResponse response2 = client.execute(request2);
                org.apache.http.HttpEntity entity = response2.getEntity();
//                HttpEntity entity = response2.getEntity();
                
                ObjectMapper mapper = new ObjectMapper();
                user = mapper.readValue(entity.getContent(), ScadaCustomWorkstation.class);
                
            }else if("delete".equals(param)){

            }else if("put".equals(param)){

            }
        } catch (Exception e) {
            e.printStackTrace();
        }
	}
	//3、Spring的RestTemplate
//	@Test
	public void text3() {
		ScadaCustomWorkstation user = null;
		String method="post";
		RestTemplate template=new RestTemplate();
        //查找
        if ("get".equals(method)) {
            user = template.getForObject(
                    "http://localhost:8080/tao-manager-web/get/{id}",
                    ScadaCustomWorkstation.class, "呜呜呜呜");

            //getForEntity与getForObject的区别是可以获取返回值和状态、头等信息
            ResponseEntity<User> re = template.
                    getForEntity("http://localhost:8080/tao-manager-web/get/{id}",
                    User.class, "呜呜呜呜");
            System.out.println(re.getStatusCode());
            System.out.println(re.getBody().getUsername());

        //新增
        } else if ("post".equals(method)) {
        	
            HttpHeaders headers = new HttpHeaders();
            headers.add("X-Auth-Token", UUID.randomUUID().toString());
            MultiValueMap<String, String> postParameters = new LinkedMultiValueMap<String, String>();
            postParameters.add("data", "hello");
//            postParameters.add("name", "部版本");
            HttpEntity<MultiValueMap<String, String>> requestEntity = new HttpEntity<MultiValueMap<String, String>>(
                    postParameters, headers);
            user = template.postForObject(
                    "http://localhost:8081/scada/getCustomWorkstation", requestEntity,
                    ScadaCustomWorkstation.class);
        //删除
            
        } else if ("delete".equals(method)) {
            template.delete("http://localhost:8080/tao-manager-web/delete/{id}","aaa");
        //修改
        } else if ("put".equals(method)) {
            template.put("http://localhost:8080/tao-manager-web/put/{id}",null,"bbb");
        }
	}
}
