package org.mes.jax.test;

import java.net.URL;

import javax.xml.namespace.QName;
import javax.xml.ws.Service;

import org.junit.Assert;
import org.junit.Test;
import org.mes.jax.test.config.ScadaTdowntimeService;
import org.mes.jax.test.config.ScadaTdowntimeServiceService;

/**
 * @Author wuzhining
 * @create in 2019-1-9
 **/
public class TestScadaTdowntimeService {

	@Test
	public void testScadaTemperService() throws Exception {

		Object jsonData = "{\"tdownUnit\":\"测试\",\"tdownId\":245,\"tdownCd\":\"INSERT\",\"tdownIp\":\"192.168.0.108\",\"tdownLong\":360,\"tdownSn\":\"AAAA\",\"tdownTime\":\"2019-01-07\",\"tdownEmp\":\"2019-01-07\"}";
		String result = null;
		// 方法一
		String address = "http://localhost:8091/DflMesWebService/ScadaTdowntimeService?wsdl";
		URL url = new URL(address);
		QName qname = new QName("http://impl.service.jax.mes.org/", "ScadaTdowntimeServiceService");
		Service service = Service.create(url, qname);
		ScadaTdowntimeService port = service.getPort(ScadaTdowntimeService.class);

		result = port.addScadaTdowntime(jsonData);
		Assert.assertNotNull("测试温度接口返回null,测试失败", result);
//		Assert.assertEquals("数据保存成功！", result, "测试成功！");

		// 方法二
		ScadaTdowntimeService servicePort = new ScadaTdowntimeServiceService().getScadaTdowntimeServicePort();
		result = servicePort.addScadaTdowntime(jsonData);
		Assert.assertNotNull("测试温度接口返回null,测试失败", result);
//        System.out.println(result);
	}
}