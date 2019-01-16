package org.mes.jax.test;

import java.net.URL;

import javax.xml.namespace.QName;
import javax.xml.ws.Service;

import org.junit.Assert;
import org.junit.Test;
import org.mes.jax.test.config.ScadaBadqtyService;
import org.mes.jax.test.config.ScadaBadqtyServiceService;

/**
 * @Author wuzhining
 * @create in 2019-1-11
 **/
public class TestScadaBadqtyService {

	@Test
	public void test() throws Exception {

		Object jsonData = "{\"badId\":245,\"badCd\":\"INSERT\",\"badIp\":\"192.168.0.108\",\"badQty\":360,\"badSn\":\"AAAA\",\"badTime\":\"2019-01-07\",\"badEmp\":\"2019-01-07\"}";
		String result =null;
		// 方法一
		String address = "http://localhost:8091/DflMesWebService/ScadaBadqtyService?wsdl";
		URL url = new URL(address);
		QName qname = new QName("http://impl.service.jax.mes.org/", "ScadaBadqtyServiceService");
		Service service = Service.create(url, qname);
		ScadaBadqtyService port = service.getPort(ScadaBadqtyService.class);

		result = port.addScadaBadqty(jsonData);
		Assert.assertNotNull("测试温度接口返回null,测试失败", result);
		
	     // 方法二
        //通过ScadaTemperServiceService的getScadaTemperServicePort()方法的奥addScadaTemper接口
		ScadaBadqtyService  servicePort= new ScadaBadqtyServiceService().getScadaBadqtyServicePort();
        result = servicePort.addScadaBadqty(jsonData);
        Assert.assertNotNull("测试温度接口返回null,测试失败", result);
//        System.out.println(result);
	}
}