package org.mes.jax.test;

import java.net.URL;

import javax.xml.namespace.QName;
import javax.xml.ws.Service;

import org.junit.Assert;
import org.junit.Test;
import org.mes.jax.test.config.ScadaProdduraService;
import org.mes.jax.test.config.ScadaProdduraServiceService;

/**
 * @Author wuzhining
 * @create in 2019-1-11
 **/
public class TestScadaProdduraService {

	@Test
	public void test() throws Exception {

		Object jsonData = "{\"duraUnit\":\"测试\",\"duraId\":245,\"duraCd\":\"INSERT\",\"duraIp\":\"192.168.0.108\",\"duraLong\":360,\"duraSn\":\"AAAA\",\"duraTime\":\"2019-01-07\",\"duraEmp\":\"2019-01-07\"}";
		String result = null;
		// 方法一
		String address = "http://localhost:8091/DflMesWebService/ScadaProdduraService?wsdl";
		URL url = new URL(address);
		QName qname = new QName("http://impl.service.jax.mes.org/", "ScadaProdduraServiceService");
		Service service = Service.create(url, qname);
		ScadaProdduraService port = service.getPort(ScadaProdduraService.class);

		result = port.addScadaProddura(jsonData);
		Assert.assertNotNull("测试接口返回null,测试失败", result);
//		Assert.assertEquals("数据保存成功！", result, "测试成功！");

		// 方法二
		ScadaProdduraService servicePort = new ScadaProdduraServiceService().getScadaProdduraServicePort();
		result = servicePort.addScadaProddura(jsonData);
		Assert.assertNotNull("测试接口返回null,测试失败", result);
//        System.out.println(result);
	}
}