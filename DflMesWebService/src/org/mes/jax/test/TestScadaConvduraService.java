package org.mes.jax.test;

import java.net.URL;

import javax.xml.namespace.QName;
import javax.xml.ws.Service;

import org.junit.Assert;
import org.junit.Test;
import org.mes.jax.test.config.ScadaConvduraService;
import org.mes.jax.test.config.ScadaConvduraServiceService;

/**
 * @Author wuzhining
 * @create in 2019-1-11
 **/
public class TestScadaConvduraService {

	@Test
	public void test() throws Exception {

		Object jsonData = "{\"convUnit\":\"测试\",\"convId\":245,\"convCd\":\"INSERT\",\"convIp\":\"192.168.0.108\",\"convLong\":360,\"convSn\":\"AAAA\",\"convTime\":\"2019-01-07\",\"convEmp\":\"2019-01-07\"}";
		String result = null;
		// 方法一
		String address = "http://localhost:8091/DflMesWebService/ScadaConvduraService?wsdl";
		URL url = new URL(address);
		QName qname = new QName("http://impl.service.jax.mes.org/", "ScadaConvduraServiceService");
		Service service = Service.create(url, qname);
		ScadaConvduraService port = service.getPort(ScadaConvduraService.class);

		result = port.addScadaConvdura(jsonData);
		Assert.assertNotNull("测试接口返回null,测试失败", result);
//		Assert.assertEquals("数据保存成功！", result, "测试成功！");

		// 方法二
		ScadaConvduraService servicePort = new ScadaConvduraServiceService().getScadaConvduraServicePort();
		result = servicePort.addScadaConvdura(jsonData);
		Assert.assertNotNull("测试接口返回null,测试失败", result);
//        System.out.println(result);
	}
}