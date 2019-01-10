package com.iPlant.mes.biz.mobile;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import com.iPlant.frame.biz.podium.PodiumResult;
import com.iPlant.frame.biz.podium.basic.CoreFrameDao;
import com.iPlant.frame.biz.podium.exchange.DataExchangeAssembly;
import com.iPlant.frame.config.CoreFrameErrorCode;
import com.iPlant.frame.config.CoreFrameworkConstants;
import com.iPlant.frame.exception.PodiumException;
import com.iPlant.frame.ifs.model.CommonResult;
import com.iPlant.mes.BaseBusiness;



public class AlarmPush extends  BaseBusiness{
	
	@SuppressWarnings({ "rawtypes", "unchecked" })
	@Override
	public CommonResult execute(DataExchangeAssembly dataExchange) {
		
		CommonResult  result = new CommonResult();
		PodiumResult podium = new PodiumResult();
		int returnNum = 0;
		Map parameter = (Map) dataExchange.getBizData("params");
		//String USE_CD = (String) parameter.get("USE_CD");
		//查询推送信息	
		 parameter.put("USE_CD", (String) parameter.get("USE_CD"));
		 returnNum = CoreFrameDao.doEngineCall("alarmPushList", parameter,result);
		if (returnNum != CoreFrameErrorCode.ISUCCESS_CODE) {
			throw new PodiumException(returnNum, result.getPrompt(),
					CoreFrameworkConstants.Podium_LVL);
		}
		if (result.getDataList() != null && result.getDataList().size() > 0) {
		Map map  = result.getDataList().get(0);
		//更新推送状态
		for (Iterator<Map> iter = result.getDataList().iterator(); iter.hasNext();) {
			Map param = (Map) iter.next();
			param.put("AI_ST", "1");
		    returnNum = CoreFrameDao.doEngineCall("updateAlarmPushStatus", param,result);
		if (returnNum != CoreFrameErrorCode.ISUCCESS_CODE) {
			throw new PodiumException(returnNum, result.getPrompt(),
					CoreFrameworkConstants.Podium_LVL);
		        }
		    }
		}
		int returnNum3 = CoreFrameDao.doEngineCall("alarmPushList", parameter,result);
		if (returnNum != CoreFrameErrorCode.ISUCCESS_CODE) {
			throw new PodiumException(returnNum3, result.getPrompt(),
					CoreFrameworkConstants.Podium_LVL);
		}
		return result;
	}	
}

