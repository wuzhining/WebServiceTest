package org.mes.jax.test;

import java.net.URL;

import javax.xml.namespace.QName;
import javax.xml.ws.Service;

import org.junit.Assert;
import org.junit.Test;
import org.mes.jax.test.config.MachineListener;
import org.mes.jax.test.config.MachineListenerService;

/**
 * @Author wuzhining
 * @create in 2019-1-11
 **/
public class TestMachineListener {

	@Test
	public void test() throws Exception {

		String result =null;
		// 方法一
//		String address = "http://localhost:8091/DflMesWebService/MachineListener?wsdl";
//		URL url = new URL(address);
//		QName qname = new QName("http://impl.service.jax.mes.org/", "MachineListenerService");
//		Service service = Service.create(url, qname);
//		MachineListener port = service.getPort(MachineListener.class);
//
//		result = port.getMachineParam();
//		Assert.assertNotNull("测试温度接口返回null,测试失败", result);
		
	     // 方法二
        //通过ScadaTemperServiceService的getScadaTemperServicePort()方法的奥addScadaTemper接口
		MachineListener  servicePort= new MachineListenerService().getMachineListenerPort();
        result = servicePort.getMachineParam();
        Assert.assertNotNull("测试接口返回null,测试失败", result);
        System.out.println(result);
	}
}