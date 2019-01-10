package com.iPlant.mes.biz.framework;

import java.util.Map;

import com.iPlant.frame.biz.podium.basic.CoreFrameDao;
import com.iPlant.frame.biz.podium.exchange.DataExchangeAssembly;
import com.iPlant.frame.config.CoreFrameErrorCode;
import com.iPlant.frame.config.CoreFrameworkConstants;
import com.iPlant.frame.exception.PodiumException;
import com.iPlant.frame.ifs.model.CommonResult;
import com.iPlant.mes.BaseBusiness;


public class FrameWorkManage extends BaseBusiness {
	
	@SuppressWarnings({ "rawtypes", "unchecked" })
	@Override
	public CommonResult execute(DataExchangeAssembly dataExchange) {
		Map parameter = (Map) dataExchange.getBizData("params");
		CommonResult result = new CommonResult();	
		int returnNum=0;
		returnNum = CoreFrameDao.doEngineCall("deleteDptInfo", parameter,result);
		if (returnNum != CoreFrameErrorCode.ISUCCESS_CODE) {			
			throw new PodiumException(returnNum, result.getPrompt(),
					CoreFrameworkConstants.Podium_LVL);
		}
		String DPT_CD=(String)parameter.get("DPT_CD");
		parameter.put("ST_C_CD",DPT_CD);
		returnNum=CoreFrameDao.doEngineCall("deleteSysFrameRn", parameter,result);
		if (returnNum != CoreFrameErrorCode.ISUCCESS_CODE) {			
			throw new PodiumException(returnNum, result.getPrompt(),
					CoreFrameworkConstants.Podium_LVL);
		}
		return result;
}
	
}
		 

