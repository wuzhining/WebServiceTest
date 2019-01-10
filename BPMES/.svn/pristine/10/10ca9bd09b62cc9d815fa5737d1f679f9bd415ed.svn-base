package com.iPlant.mes.common.process.mes;

import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;

import com.iPlant.frame.Template.TemplateMethodHandleSteps;
import com.iPlant.frame.biz.podium.basic.CoreFrameDao;
import com.iPlant.frame.biz.podium.exchange.DataExchangeAssembly;
import com.iPlant.frame.config.CoreFrameErrorCode;
import com.iPlant.frame.config.CoreFrameworkConstants;
import com.iPlant.frame.exception.PodiumException;
import com.iPlant.frame.ifs.model.CommonResult;

public class AssemblyInfoSteps implements TemplateMethodHandleSteps{
	
	@SuppressWarnings("rawtypes")
	@Override
	public int Steps(DataExchangeAssembly dataExchange, CommonResult result) {
		Map parameter = (Map) dataExchange.getBizData("params");
		
		int returnNum=0;
		String BAR_CODE = (String)parameter.get("BAR_CODE");
		String MAT_CD = (String)parameter.get("MAT_CD");
		String ROUT_CD = (String)parameter.get("ROUT_CD");
		String MAT_NM = (String)parameter.get("MAT_NM");
		Map<String,String> map =new HashMap<String,String>();
		map.put("BAR_CODE", BAR_CODE);
		map.put("ROUT_CD", ROUT_CD);
		map.put("MAT_CD", MAT_CD);
		map.put("MAT_NM", MAT_NM);
		returnNum = CoreFrameDao.doEngineCall("querySnWorkOrderInformation", map, result);
		if (returnNum != CoreFrameErrorCode.ISUCCESS_CODE) {
			throw new PodiumException(returnNum, result.getPrompt(),
					CoreFrameworkConstants.Podium_LVL);
		}
		if (result.getDataList() != null && result.getDataList().size() > 0) {
			for (Iterator<Map> iter = result.getDataList().iterator(); iter.hasNext();) {
				Map param = (Map) iter.next();
				map.put("FCT_CD", (String)param.get("FCT_CD"));           //工厂编码
				map.put("WC_CD", (String)param.get("WC_CD"));		      //车间编码
				map.put("BAR_CODE", (String)param.get("BAR_CODE"));       //产品条码
				map.put("WO_NO", (String)param.get("WO_NO"));             //作业指示
				map.put("MO_NO", (String)param.get("MO_NO"));             //工单编号
				map.put("PRNT_MAT_CD", (String)param.get("ITEM_CD"));         //产品编号
				map.put("PRNT_MAT_NM", (String)param.get("ITEM_NM"));         //产品名称
				map.put("PRF_CD", (String)param.get("PRF_CD"));           //工序代码
			}
		}
		
		/*装配*/
		returnNum=CoreFrameDao.doEngineCall("insertAssemblyInformation",map,result);	    
		if (returnNum != CoreFrameErrorCode.ISUCCESS_CODE) {
			throw new PodiumException(returnNum, result.getPrompt(),
			  CoreFrameworkConstants.Podium_LVL);
		}
		
		result.setFlag("0");
		result.setPrompt("业务程序运行正常");
		return returnNum;
	}


}
