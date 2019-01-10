package com.iPlant.mes.common.process.business;

import java.util.Map;

import com.iPlant.frame.Template.TemplateMethodHandleSteps;
import com.iPlant.frame.biz.podium.exchange.DataExchangeAssembly;
import com.iPlant.frame.ifs.model.CommonResult;

/**
 * 测试方法
 * 模板方法基类实现，请开发人员按在定义的方式，方法的类名以 功能+系统+Steps ,
 * 所有的方法类名必须以Steps结尾，以进行区分
 * @author lipl  2017-03-25
 *
 */
public class InputMESBoxInfoSteps implements TemplateMethodHandleSteps{

	@SuppressWarnings({ "unused", "rawtypes" })
	@Override
	public int Steps(DataExchangeAssembly dataExchange, CommonResult result) {
		Map parameter = (Map) dataExchange.getBizData("params");
		int returnNum=0;
		
		
		
		result.setFlag("0");
		result.setPrompt("业务程序运行正常");
		return returnNum;
	}
	


}
