package org.mes.jax.test;

import java.net.URL;

import javax.xml.namespace.QName;
import javax.xml.ws.Service;
import org.junit.Assert;
import org.junit.Test;
import org.mes.jax.test.config.DflDipService;
import org.mes.jax.test.config.DflDipServiceService;

/**
 * @Author wuzhining
 * @create in 2019-1-12
 **/
public class TestDflDipService {

	@Test
	public void test() throws Exception {

		String result =null;
    	Object jsonData ="{\"machinename\":\"DIP-L52-INSERTsaaa\",\"stationname\":\"INSERT\",\"ipaddress\":\"\",\"machinemodel\":\"M360\",\"supplier\":null,\"skuno\":\"AAAA\",\"data\":[{\"parameternumber\":\"1\",\"parametername\":\"Speed\",\"description\":\"运行速度\",\"parametervalue\":\"高速\",\"parametertype\":\"UP\",\"units\":\"PC\",\"valuetype\":\"string\",\"adjustmentvalue\":\"高速\",\"lowerlimit\":\"\",\"upperlimit\":\"\",\"formulalogguid\":\"\",\"parameterresult\":true,\"resultmessage\":\"exec sucess\"},{\"parameternumber\":\"2\",\"parametername\":\"InsertCell\",\"description\":\"插件数\",\"parametervalue\":\"单孔,988;多孔,987;晶振16,988;晶振24,988;插座,988\",\"parametertype\":\"UP\",\"units\":\"PC\",\"valuetype\":\"string\",\"adjustmentvalue\":\"\",\"lowerlimit\":\"\",\"upperlimit\":\"\",\"formulalogguid\":\"\",\"parameterresult\":true,\"resultmessage\":\"exec sucess\"},{\"parameternumber\":\"3\",\"parametername\":\"TakeCell\",\"description\":\"取料数\",\"parametervalue\":\"单孔,988;多孔,987;晶振16,988;晶振24,988;插座,988\",\"parametertype\":\"UP\",\"units\":\"PC\",\"valuetype\":\"string\",\"adjustmentvalue\":\"\",\"lowerlimit\":\"\",\"upperlimit\":\"\",\"formulalogguid\":\"\",\"parameterresult\":true,\"resultmessage\":\"exec sucess\"},{\"parameternumber\":\"4\",\"parametername\":\"ThrowCell\",\"description\":\"抛料数\",\"parametervalue\":\"单孔,0;多孔,1;晶振16,0;晶振24,0;插座,0\",\"parametertype\":\"UP\",\"units\":\"PC\",\"valuetype\":\"string\",\"adjustmentvalue\":\"\",\"lowerlimit\":\"\",\"upperlimit\":\"\",\"formulalogguid\":\"\",\"parameterresult\":true,\"resultmessage\":\"exec sucess\"},{\"parameternumber\":\"5\",\"parametername\":\"NullCell\",\"description\":\"空取数\",\"parametervalue\":\"单孔,0;多孔,0;晶振16,0;晶振24,2;插座,28\",\"parametertype\":\"UP\",\"units\":\"PC\",\"valuetype\":\"string\",\"adjustmentvalue\":\"\",\"lowerlimit\":\"\",\"upperlimit\":\"\",\"formulalogguid\":\"\",\"parameterresult\":true,\"resultmessage\":\"exec sucess\"},{\"parameternumber\":\"6\",\"parametername\":\"AverageSpeed\",\"description\":\"平均插件速度\",\"parametervalue\":null,\"parametertype\":\"UP\",\"units\":\"PC\",\"valuetype\":\"string\",\"adjustmentvalue\":\"\",\"lowerlimit\":\"\",\"upperlimit\":\"\",\"formulalogguid\":\"\",\"parameterresult\":true,\"resultmessage\":\"exec sucess\"},{\"parameternumber\":\"7\",\"parametername\":\"TotalCount\",\"description\":\"插件个数\",\"parametervalue\":120,\"parametertype\":\"UP\",\"units\":\"PC\",\"valuetype\":\"string\",\"adjustmentvalue\":\"\",\"lowerlimit\":\"\",\"upperlimit\":\"\",\"formulalogguid\":\"\",\"parameterresult\":true,\"resultmessage\":\"exec sucess\"},{\"parameternumber\":\"8\",\"parametername\":\"LineSpeed\",\"description\":\"产线节拍\",\"parametervalue\":null,\"parametertype\":\"UP\",\"units\":\"PC\",\"valuetype\":\"string\",\"adjustmentvalue\":\"\",\"lowerlimit\":\"\",\"upperlimit\":\"\",\"formulalogguid\":\"\",\"parameterresult\":true,\"resultmessage\":\"exec sucess\"},{\"parameternumber\":\"9\",\"parametername\":\"MachineSpeed\",\"description\":\"机器节拍\",\"parametervalue\":\"高速\",\"parametertype\":\"UP\",\"units\":\"PC\",\"valuetype\":\"string\",\"adjustmentvalue\":\"\",\"lowerlimit\":\"\",\"upperlimit\":\"\",\"formulalogguid\":\"\",\"parameterresult\":true,\"resultmessage\":\"exec sucess\"}]}";
    	
    	// 方法一
		String address = "http://139.198.124.208:10164/DflMesWebService/DflDipWebService?wsdl";
//		String address = "http://192.168.0.108:8081/iTaurus/DflDipWebService?wsdl";
		URL url = new URL(address);
		QName qname = new QName("http://impl.service.jax.mes.org/", "DflDipServiceService");
		Service service = Service.create(url, qname);
		DflDipService port = service.getPort(DflDipService.class);

		result = port.doService(jsonData);
		System.out.println(result);
		result = port.startService();
		System.out.println(result);
		result = port.stopService();
		Assert.assertNotNull("测试接口返回null,测试失败", result);
        System.out.println(result);
		
	     // 方法二
//    	DflDipService  servicePort= new DflDipServiceService().getDflDipServicePort();
//        result = servicePort.doService(jsonData);
//        result = servicePort.startService();
//        Assert.assertNotNull("测试接口返回null,测试失败", result);
//        System.out.println(result);
	}
}