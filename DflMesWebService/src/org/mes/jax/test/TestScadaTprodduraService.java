package org.mes.jax.test;

import java.net.URL;

import javax.xml.namespace.QName;
import javax.xml.ws.Service;

import org.junit.Assert;
import org.junit.Test;
import org.mes.jax.test.config.ScadaTprodduraService;
import org.mes.jax.test.config.ScadaTprodduraServiceService;

/**
 * @Author wuzhining
 * @create in 2019-1-11
 **/
public class TestScadaTprodduraService {

	@Test
	public void test() throws Exception {

		Object jsonData = "{\"tduraUnit\":\"测试\",\"tduraId\":245,\"tduraCd\":\"INSERT\",\"tduraIp\":\"192.168.0.108\",\"tduraLong\":360,\"tduraSn\":\"AAAA\",\"tduraTime\":\"2019-01-07\",\"tduraEmp\":\"2019-01-07\"}";
		String result = null;
		// 方法一
		String address = "http://localhost:8091/DflMesWebService/ScadaTprodduraService?wsdl";
		URL url = new URL(address);
		QName qname = new QName("http://impl.service.jax.mes.org/", "ScadaTprodduraServiceService");
		Service service = Service.create(url, qname);
		ScadaTprodduraService port = service.getPort(ScadaTprodduraService.class);

		result = port.addScadaTproddura(jsonData);
		Assert.assertNotNull("测试接口返回null,测试失败", result);
//		Assert.assertEquals("数据保存成功！", result, "测试成功！");

		// 方法二
		ScadaTprodduraService servicePort = new ScadaTprodduraServiceService().getScadaTprodduraServicePort();
		result = servicePort.addScadaTproddura(jsonData);
		Assert.assertNotNull("测试接口返回null,测试失败", result);
//        System.out.println(result);
	}
}