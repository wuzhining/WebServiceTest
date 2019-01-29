package org.mes.jax.test;

import java.net.URL;

import javax.xml.namespace.QName;
import javax.xml.ws.Service;

import org.junit.Assert;
import org.junit.Test;
import org.mes.jax.test.config.ScadaPressService;
import org.mes.jax.test.config.ScadaPressServiceService;

/**
 * @Author wuzhining
 * @create in 2019-1-11
 **/
public class TestScadaPressService {

	@Test
	public void test() throws Exception {

		Object jsonData = "{\"pressId\":245,\"pressCd\":\"INSERT\",\"pressIp\":\"192.168.0.108\",\"pressMany\":360,\"pressSn\":\"AAAA\",\"pressTime\":\"2019-01-07\",\"pressEmp\":\"2019-01-07\"}";
		String result = null;
		// 方法一
		String address = "http://localhost:8091/DflMesWebService/ScadaPressService?wsdl";
		URL url = new URL(address);
		QName qname = new QName("http://impl.service.jax.mes.org/", "ScadaPressServiceService");
		Service service = Service.create(url, qname);
		ScadaPressService port = service.getPort(ScadaPressService.class);

		result = port.addScadaPress(jsonData);
		Assert.assertNotNull("测试接口返回null,测试失败", result);
//		Assert.assertEquals("数据保存成功！", result, "测试成功！");

		// 方法二
		ScadaPressService servicePort = new ScadaPressServiceService().getScadaPressServicePort();
		result = servicePort.addScadaPress(jsonData);
		Assert.assertNotNull("测试接口返回null,测试失败", result);
//        System.out.println(result);
	}
}