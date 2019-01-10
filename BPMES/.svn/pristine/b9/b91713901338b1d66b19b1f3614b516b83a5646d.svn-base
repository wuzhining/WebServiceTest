package com.iPlant.mes.biz;

import java.util.Map;

import com.iPlant.frame.biz.podium.basic.CoreFrameDao;
import com.iPlant.frame.biz.podium.exchange.DataExchangeAssembly;
import com.iPlant.frame.config.CoreFrameErrorCode;
import com.iPlant.frame.config.CoreFrameworkConstants;
import com.iPlant.frame.exception.PodiumException;
import com.iPlant.frame.ifs.model.CommonResult;
import com.iPlant.mes.BaseBusiness;

public class UserInfoBusiness extends BaseBusiness{

	@SuppressWarnings({ "rawtypes" })
	@Override
	public CommonResult  execute(DataExchangeAssembly dataExchange) {
		Map parameter = (Map) dataExchange.getBizData("params");
		Map  conmm =(Map) dataExchange.getBizData("common");
		CommonResult userInfoResult = new CommonResult();		
		int returnNum = CoreFrameDao.doEngineCall("queryOpUser", parameter,conmm,userInfoResult);
		if (returnNum != CoreFrameErrorCode.ISUCCESS_CODE) {
			throw new PodiumException(returnNum, userInfoResult.getPrompt(),
					CoreFrameworkConstants.Podium_LVL);
		}
		return userInfoResult;
	}

}
