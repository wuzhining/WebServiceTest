package org.mes.jax.test;

import java.net.URL;

import javax.xml.namespace.QName;
import javax.xml.ws.Service;

import org.junit.Assert;
import org.junit.Test;
import org.mes.jax.test.config.ScadaStdcapService;
import org.mes.jax.test.config.ScadaStdcapServiceService;

/**
 * @Author wuzhining
 * @create in 2019-1-11
 **/
public class TestScadaStdcapService {

	@Test
	public void test() throws Exception {

		Object jsonData = "{\"stdcapId\":245,\"stdcapCd\":\"INSERT\",\"stdcapIp\":\"192.168.0.108\",\"stdcapMany\":360,\"stdcapSn\":\"AAAA\",\"stdcapTime\":\"2019-01-07\",\"stdcapEmp\":\"2019-01-07\"}";
		String result = null;
		// 方法一
		String address = "http://localhost:8091/DflMesWebService/ScadaStdcapService?wsdl";
		URL url = new URL(address);
		QName qname = new QName("http://impl.service.jax.mes.org/", "ScadaStdcapServiceService");
		Service service = Service.create(url, qname);
		ScadaStdcapService port = service.getPort(ScadaStdcapService.class);

		result = port.addScadaStdcap(jsonData);
		Assert.assertNotNull("测试接口返回null,测试失败", result);
//		Assert.assertEquals("数据保存成功！", result, "测试成功！");

		// 方法二
		ScadaStdcapService servicePort = new ScadaStdcapServiceService().getScadaStdcapServicePort();
		result = servicePort.addScadaStdcap(jsonData);
		Assert.assertNotNull("测试接口返回null,测试失败", result);
//        System.out.println(result);
	}
}