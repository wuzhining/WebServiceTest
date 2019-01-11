package org.mes.jax.test;

import java.net.URL;

import javax.xml.namespace.QName;
import javax.xml.ws.Service;

import org.junit.Assert;
import org.junit.Test;
import org.mes.jax.test.config.ScadaDowntimeService;
import org.mes.jax.test.config.ScadaDowntimeServiceService;

/**
 * @Author wuzhining
 * @create in 2019-1-9
 **/
public class TestScadaDowntimeService {

	@Test
	public void testScadaTemperService() throws Exception {

		Object jsonData = "{\"downUnit\":\"测试\",\"downId\":245,\"downCd\":\"INSERT\",\"downIp\":\"192.168.0.108\",\"downLong\":360,\"downSn\":\"AAAA\",\"downTime\":\"2019-01-07\",\"downEmp\":\"2019-01-07\"}";
		String result = null;
		// 方法一
		String address = "http://localhost:8091/DflMesWebService/ScadaDowntimeService?wsdl";
		URL url = new URL(address);
		QName qname = new QName("http://impl.service.jax.mes.org/", "ScadaDowntimeServiceService");
		Service service = Service.create(url, qname);
		ScadaDowntimeService port = service.getPort(ScadaDowntimeService.class);

		result = port.addScadaDowntime(jsonData);
		Assert.assertNotNull("测试温度接口返回null,测试失败", result);
//		Assert.assertEquals("数据保存成功！", result, "测试成功！");

		// 方法二
		ScadaDowntimeService servicePort = new ScadaDowntimeServiceService().getScadaDowntimeServicePort();
		result = servicePort.addScadaDowntime(jsonData);
		Assert.assertNotNull("测试温度接口返回null,测试失败", result);
//        System.out.println(result);
	}
}