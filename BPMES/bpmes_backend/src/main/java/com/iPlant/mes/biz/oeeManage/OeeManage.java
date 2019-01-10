package com.iPlant.mes.biz.oeeManage;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Map;
import com.iPlant.frame.biz.podium.basic.CoreFrameDao;
import com.iPlant.frame.biz.podium.exchange.DataExchangeAssembly;
import com.iPlant.frame.config.CoreFrameErrorCode;
import com.iPlant.frame.config.CoreFrameworkConstants;
import com.iPlant.frame.exception.PodiumException;
import com.iPlant.frame.ifs.model.CommonResult;
import com.iPlant.mes.BaseBusiness;


public class OeeManage extends BaseBusiness{

	
	/**
	 * OEE报表明细
	 */
	@SuppressWarnings({ "rawtypes", "unchecked" })
	@Override
	public CommonResult execute(DataExchangeAssembly dataExchange) {
		
		Map parameter = (Map) dataExchange.getBizData("params");
		CommonResult result = new CommonResult();
		//判断是否是当天的时间
		String tempType = (String) parameter.get("xy");
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
		String today = sdf.format(new Date());
		String tempDay = (String) parameter.get("DR_DT");
		
		int returnNum = 0;
		if(tempType.equals("0")){
			if(tempDay.equals(today)){
				returnNum = CoreFrameDao.doEngineCall("queryCountMetricsProductToday", parameter,result);
			}else{
				returnNum = CoreFrameDao.doEngineCall("queryCountMetricsProduct", parameter,result);
			}
		}else if(tempType.equals("1")){
			if(tempDay.equals(today)){
				returnNum = CoreFrameDao.doEngineCall("queryCountMetricsMechineToday", parameter,result);
			}else{
				returnNum = CoreFrameDao.doEngineCall("queryCountMetricsMechine", parameter,result);
			}
		}
		if (returnNum != CoreFrameErrorCode.ISUCCESS_CODE) {
			throw new PodiumException(returnNum, result.getPrompt(),
					CoreFrameworkConstants.Podium_LVL);
		}
		return result;
	}
}
	
