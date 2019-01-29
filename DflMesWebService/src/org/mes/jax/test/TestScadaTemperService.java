package org.mes.jax.test;

import java.net.URL;

import javax.xml.namespace.QName;
import javax.xml.ws.Service;

import org.junit.Assert;
import org.junit.Test;
import org.mes.jax.test.config.ScadaTemperService;
import org.mes.jax.test.config.ScadaTemperServiceService;

/**
 * @Author wuzhining
 * @create in 2019-1-11
 **/
public class TestScadaTemperService {

	@Test
	public void test() throws Exception {

		Object jsonData = "{\"temperId\":245,\"temperCd\":\"INSERT\",\"temperIp\":\"192.168.0.108\",\"temperMany\":360,\"temperSn\":\"AAAA\",\"temperTime\":\"2019-01-07\",\"temperEmp\":\"2019-01-07\"}";
		String result=null;
		// 方法一
		String address = "http://localhost:8091/DflMesWebService/ScadaTemperService?wsdl";
		URL url = new URL(address);
		QName qname = new QName("http://impl.service.jax.mes.org/", "ScadaTemperServiceService");
		Service service = Service.create(url, qname);
		ScadaTemperService scadaTemperService = service.getPort(ScadaTemperService.class);

		result = scadaTemperService.addScadaTemper(jsonData);
		Assert.assertNotNull("测试接口返回null,测试失败", result);
//		Assert.assertEquals("数据保存成功！", result, "测试成功！");
		
	     // 方法二
        //通过ScadaTemperServiceService的getScadaTemperServicePort()方法调用ScadaTemperService的addScadaTemper方法
		ScadaTemperService servicePort = new ScadaTemperServiceService().getScadaTemperServicePort();
        result = servicePort.addScadaTemper(jsonData);
        Assert.assertNotNull("测试接口返回null,测试失败", result);
//        Assert.assertEquals("数据保存成功！", result, "测试成功！");
//        System.out.println(result);
	}
}