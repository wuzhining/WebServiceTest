package com.iPlant.mes.common.process.business;

import java.util.Map;

import com.iPlant.frame.Template.TemplateMethodHandleSteps;
import com.iPlant.frame.biz.podium.exchange.DataExchangeAssembly;
import com.iPlant.frame.ifs.model.CommonResult;

public class InputMESBarCodeInfoSteps implements TemplateMethodHandleSteps{

	@SuppressWarnings({ "rawtypes", "unused" })
	@Override
	public int Steps(DataExchangeAssembly dataExchange, CommonResult result) {
		Map parameter = (Map) dataExchange.getBizData("params");
		int returnNum=0;
		//TODO 
		
		result.setFlag("0");
		result.setPrompt("业务程序运行正常");
		return returnNum;
	}

	
}
