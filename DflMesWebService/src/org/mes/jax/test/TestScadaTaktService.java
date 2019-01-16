package org.mes.jax.test;

import java.net.URL;

import javax.xml.namespace.QName;
import javax.xml.ws.Service;

import org.junit.Assert;
import org.junit.Test;
import org.mes.jax.test.config.ScadaTaktService;
import org.mes.jax.test.config.ScadaTaktServiceService;

/**
 * @Author wuzhining
 * @create in 2019-1-11
 **/
public class TestScadaTaktService {

	@Test
	public void test() throws Exception {

		Object jsonData = "{\"taktId\":245,\"taktCd\":\"INSERT\",\"taktIp\":\"192.168.0.108\",\"taktMany\":360,\"taktSn\":\"AAAA\",\"taktTime\":\"2019-01-07\",\"taktEmp\":\"2019-01-07\"}";
		String result = null;
		// 方法一
		String address = "http://localhost:8091/DflMesWebService/ScadaTaktService?wsdl";
		URL url = new URL(address);
		QName qname = new QName("http://impl.service.jax.mes.org/", "ScadaTaktServiceService");
		Service service = Service.create(url, qname);
		ScadaTaktService port = service.getPort(ScadaTaktService.class);

		result = port.addScadaTakt(jsonData);
		Assert.assertNotNull("测试温度接口返回null,测试失败", result);
//		Assert.assertEquals("数据保存成功！", result, "测试成功！");

		// 方法二
		ScadaTaktService servicePort = new ScadaTaktServiceService().getScadaTaktServicePort();
		result = servicePort.addScadaTakt(jsonData);
		Assert.assertNotNull("测试温度接口返回null,测试失败", result);
//        System.out.println(result);
	}
}