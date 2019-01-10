package org.mes.jax.test;

import java.net.URL;

import javax.xml.namespace.QName;
import javax.xml.ws.Service;

import org.junit.Assert;
import org.junit.Test;
import org.mes.jax.test.config.ScadaTemperService;

/**
 * @Author wuzhining
 * @create in 2019-1-9
 **/
public class ScadaTemperServiceTest {

	@Test
	public void testGetPhoneNumber() throws Exception {

		Object jsonData = "{\"temperId\":245,\"temperCd\":\"INSERT\",\"temperIp\":\"192.168.0.108\",\"temperMany\":360,\"temperSn\":\"AAAA\",\"temperTime\":\"2019-01-07\",\"temperEmp\":\"2019-01-07\"}";

		String address = "http://localhost:8091/DflMesWebService/ScadaTemperService?wsdl";
		URL url = new URL(address);
		QName qname = new QName("http://service.jax.mes.org/", "ScadaTemperServiceService");
		Service service = Service.create(url, qname);
		ScadaTemperService sayHello = service.getPort(ScadaTemperService.class);

		String result = sayHello.doService(jsonData);
		Assert.assertNotNull("获取咨询电话接口返回null,测试失败", result);
	}
}