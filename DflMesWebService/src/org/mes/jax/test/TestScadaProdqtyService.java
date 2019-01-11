package org.mes.jax.test;

import java.net.URL;

import javax.xml.namespace.QName;
import javax.xml.ws.Service;

import org.junit.Assert;
import org.junit.Test;
import org.mes.jax.test.config.ScadaProdqtyService;
import org.mes.jax.test.config.ScadaProdqtyServiceService;

/**
 * @Author wuzhining
 * @create in 2019-1-9
 **/
public class TestScadaProdqtyService {

	@Test
	public void testScadaTemperService() throws Exception {

		Object jsonData = "{\"prodId\":245,\"prodCd\":\"INSERT\",\"prodIp\":\"192.168.0.108\",\"prodQty\":360,\"prodSn\":\"AAAA\",\"prodTime\":\"2019-01-07\",\"prodEmp\":\"2019-01-07\"}";
		String result = null;
		// 方法一
		String address = "http://localhost:8091/DflMesWebService/ScadaProdqtyService?wsdl";
		URL url = new URL(address);
		QName qname = new QName("http://impl.service.jax.mes.org/", "ScadaProdqtyServiceService");
		Service service = Service.create(url, qname);
		ScadaProdqtyService port = service.getPort(ScadaProdqtyService.class);

		result = port.addScadaProdqty(jsonData);
		Assert.assertNotNull("测试温度接口返回null,测试失败", result);
//		Assert.assertEquals("数据保存成功！", result, "测试成功！");

		// 方法二
		ScadaProdqtyService servicePort = new ScadaProdqtyServiceService().getScadaProdqtyServicePort();
		result = servicePort.addScadaProdqty(jsonData);
		Assert.assertNotNull("测试温度接口返回null,测试失败", result);
//        System.out.println(result);
	}
}