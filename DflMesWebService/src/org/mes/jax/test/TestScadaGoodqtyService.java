package org.mes.jax.test;

import java.net.URL;

import javax.xml.namespace.QName;
import javax.xml.ws.Service;

import org.junit.Assert;
import org.junit.Test;
import org.mes.jax.test.config.ScadaGoodqtyService;
import org.mes.jax.test.config.ScadaGoodqtyServiceService;

/**
 * @Author wuzhining
 * @create in 2019-1-11
 **/
public class TestScadaGoodqtyService {

	@Test
	public void test() throws Exception {

		Object jsonData = "{\"goodId\":245,\"goodCd\":\"INSERT\",\"goodIp\":\"192.168.0.108\",\"goodQty\":360,\"goodSn\":\"AAAA\",\"goodTime\":\"2019-01-07\",\"goodEmp\":\"2019-01-07\"}";
		String result = null;
		// 方法一
		String address = "http://localhost:8091/DflMesWebService/ScadaGoodqtyService?wsdl";
		URL url = new URL(address);
		QName qname = new QName("http://impl.service.jax.mes.org/", "ScadaGoodqtyServiceService");
		Service service = Service.create(url, qname);
		ScadaGoodqtyService port = service.getPort(ScadaGoodqtyService.class);

		result = port.addScadaGoodqty(jsonData);
		Assert.assertNotNull("测试温度接口返回null,测试失败", result);
//		Assert.assertEquals("数据保存成功！", result, "测试成功！");

		// 方法二
		ScadaGoodqtyService servicePort = new ScadaGoodqtyServiceService().getScadaGoodqtyServicePort();
		result = servicePort.addScadaGoodqty(jsonData);
		Assert.assertNotNull("测试温度接口返回null,测试失败", result);
//        System.out.println(result);
	}
}