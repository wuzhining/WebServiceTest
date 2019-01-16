package org.mes.jax.test;

import java.net.URL;

import javax.xml.namespace.QName;
import javax.xml.ws.Service;

import org.junit.Assert;
import org.junit.Test;
import org.mes.jax.test.config.ScadaPrdstsService;
import org.mes.jax.test.config.ScadaPrdstsServiceService;

/**
 * @Author wuzhining
 * @create in 2019-1-11
 **/
public class TestScadaPrdstsService {

	@Test
	public void test() throws Exception {

		Object jsonData = "{\"stsDesc\":\"测试\",\"stsId\":245,\"stsCd\":\"INSERT\",\"stsIp\":\"192.168.0.108\",\"stsNo\":360,\"stsSn\":\"AAAA\",\"stsTime\":\"2019-01-07\",\"stsEmp\":\"2019-01-07\"}";
		String result = null;
		// 方法一
		String address = "http://localhost:8091/DflMesWebService/ScadaPrdstsService?wsdl";
		URL url = new URL(address);
		QName qname = new QName("http://impl.service.jax.mes.org/", "ScadaPrdstsServiceService");
		Service service = Service.create(url, qname);
		ScadaPrdstsService port = service.getPort(ScadaPrdstsService.class);

		result = port.addScadaPrdsts(jsonData);
		Assert.assertNotNull("测试温度接口返回null,测试失败", result);
//		Assert.assertEquals("数据保存成功！", result, "测试成功！");

		// 方法二
		ScadaPrdstsService servicePort = new ScadaPrdstsServiceService().getScadaPrdstsServicePort();
		result = servicePort.addScadaPrdsts(jsonData);
		Assert.assertNotNull("测试温度接口返回null,测试失败", result);
//        System.out.println(result);
	}
}