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

public class AppearanceAndTestingSteps implements TemplateMethodHandleSteps {

	@SuppressWarnings("rawtypes")
	public int Steps(DataExchangeAssembly dataExchange, CommonResult result) {
		Map parameter = (Map) dataExchange.getBizData("params");
		int returnNum=0;
		String BAR_CODE = (String)parameter.get("BAR_CODE");
		String ROUT_CD = (String)parameter.get("ROUT_CD");
		String IPQC_RSLT = (String)parameter.get("IPQC_RSLT");
		String QC_DFCT_CD = (String)parameter.get("QC_DFCT_CD");
		String TEST_VALUE = (String)parameter.get("TEST_VALUE");
		
		Map<String,String> map =new HashMap<String,String>();
		map.put("ROUT_CD", ROUT_CD);
		map.put("BAR_CODE", BAR_CODE);
		map.put("IPQC_RSLT", IPQC_RSLT);
		map.put("QC_DFCT_CD", QC_DFCT_CD);
		map.put("TEST_VALUE", TEST_VALUE);
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
				map.put("ITEM_CD", (String)param.get("ITEM_CD"));         //产品编号
				map.put("ITEM_NM", (String)param.get("ITEM_NM"));         //产品名称
				map.put("PRF_CD", (String)param.get("PRF_CD"));           //工序代码
				map.put("BC_STATUS", (String)param.get("BC_STATUS"));
				map.put("LINE_CD", (String)param.get("LINE_CD"));
			}
		}
		
		/*外观及测试主表*/
		returnNum=CoreFrameDao.doEngineCall("insertIpqcSampling",map,result);	    
		if (returnNum != CoreFrameErrorCode.ISUCCESS_CODE) {
			throw new PodiumException(returnNum, result.getPrompt(),
					CoreFrameworkConstants.Podium_LVL);
		}
		/*外观及测试明细表*/
		returnNum=CoreFrameDao.doEngineCall("insertIpqcSamplingDetails",map,result);	    
		if (returnNum != CoreFrameErrorCode.ISUCCESS_CODE) {
			throw new PodiumException(returnNum, result.getPrompt(),
					CoreFrameworkConstants.Podium_LVL);
		}
		
		result.setFlag("0");
		result.setPrompt("业务程序运行正常");
		return returnNum;
	}


}
