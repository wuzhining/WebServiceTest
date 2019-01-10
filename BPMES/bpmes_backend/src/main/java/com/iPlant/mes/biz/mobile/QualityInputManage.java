package com.iPlant.mes.biz.mobile;

import java.util.List;
import java.util.Map;

import com.iPlant.frame.biz.podium.basic.CoreFrameDao;
import com.iPlant.frame.biz.podium.exchange.DataExchangeAssembly;
import com.iPlant.frame.config.CoreFrameErrorCode;
import com.iPlant.frame.config.CoreFrameworkConstants;
import com.iPlant.frame.exception.PodiumException;
import com.iPlant.frame.ifs.model.CommonResult;
import com.iPlant.mes.BaseBusiness;
import com.iPlant.mes.util.PrsIntUtil;
import com.iPlant.mes.util.StringToIntUtil;

public class QualityInputManage extends  BaseBusiness{

	@SuppressWarnings({ "rawtypes", "unchecked" })
	@Override
	public CommonResult execute(DataExchangeAssembly dataExchange) {
		
		Map parameter = (Map) dataExchange.getBizData("params");
		
		List brCdList   =(List) parameter.get("BR_CD");
		List badNumList =(List) parameter.get("BR_NUM");
		List brNmList   =(List) parameter.get("BR_NM");
		int returnNum=0;
	    int BR_NUM = 0;
	for(int i=0;i<brCdList.size();i++){
		CommonResult  qualityResult = new CommonResult();
		try {
			int s = PrsIntUtil.zh((String) badNumList.get(i));
			BR_NUM =BR_NUM+s;
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		parameter.put("BR_CD", brCdList.get(i));
		parameter.put("BR_NUM", badNumList.get(i));
		parameter.put("BR_NM", brNmList.get(i));
		//插入不良明细
		    returnNum = CoreFrameDao.doEngineCall("insertBadRecordDetail",parameter,qualityResult);
		if (returnNum != CoreFrameErrorCode.ISUCCESS_CODE) {
			throw new PodiumException(returnNum, qualityResult.getPrompt(),
					CoreFrameworkConstants.Podium_LVL);
		}
	}
	for(int i=0;i<brCdList.size();i++){
		parameter.put("BR_CD", brCdList.get(i));
		parameter.put("BR_NUM", badNumList.get(i));	
		parameter.put("BR_NM", brNmList.get(i));
			CommonResult  badResult = new CommonResult();	
			//查询不良主表信息
			returnNum = CoreFrameDao.doEngineCall("queryBadRecordMain",parameter,badResult);
			if (returnNum != CoreFrameErrorCode.ISUCCESS_CODE) {
				throw new PodiumException(returnNum, badResult.getPrompt(),
						CoreFrameworkConstants.Podium_LVL);
			}
			if(badResult.getDataList().size()>0 && badResult.getDataList() != null ){
				//更新不良主表
				 returnNum = CoreFrameDao.doEngineCall("updateBadRecordNum",parameter,badResult);
					if (returnNum != CoreFrameErrorCode.ISUCCESS_CODE) {
						throw new PodiumException(returnNum, badResult.getPrompt(),
								CoreFrameworkConstants.Podium_LVL);
					}
			}else{
				//插入不良主表
			 //parameter.put("BR_NM", brNmList.get(i));
			 returnNum = CoreFrameDao.doEngineCall("insertBadRecord", parameter,badResult);
				if (returnNum != CoreFrameErrorCode.ISUCCESS_CODE) {
					throw new PodiumException(returnNum, badResult.getPrompt(),
							CoreFrameworkConstants.Podium_LVL);
				}
			
			}
	}	
		CommonResult  poResult = new CommonResult();	
		parameter.put("BR_NUM",BR_NUM);
		//更新生产主数据表的不良数量
		 returnNum = CoreFrameDao.doEngineCall("updateProductRecordNum", parameter,poResult);
		if (returnNum != CoreFrameErrorCode.ISUCCESS_CODE) {
			throw new PodiumException(returnNum, poResult.getPrompt(),
					CoreFrameworkConstants.Podium_LVL);
		}
		return poResult;
	}
}
