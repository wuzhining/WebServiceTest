package com.iPlant.mes.common;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;
import com.iPlant.frame.biz.podium.basic.CoreFrameDao;
import com.iPlant.frame.biz.podium.exchange.DataExchangeAssembly;
import com.iPlant.frame.config.CoreFrameErrorCode;
import com.iPlant.frame.config.CoreFrameworkConstants;
import com.iPlant.frame.exception.PodiumException;
import com.iPlant.frame.ifs.model.CommonResult;
import com.iPlant.mes.BaseBusiness;

public class InsertBindSnMany extends BaseBusiness {
	
	@Override
	public CommonResult execute(DataExchangeAssembly dataExchange) {
		Map parameter = (Map) dataExchange.getBizData("params");
		CommonResult result = new CommonResult();
		int returnNum=0;
		String BAR_CODE = (String)parameter.get("BAR_CODE");
		String ROUT_CD = (String)parameter.get("ROUT_CD");
		String WO_NO = (String)parameter.get("WO_NO");
		
		Map<String,String> map =new HashMap<String,String>();
		map.put("BAR_CODE", BAR_CODE);
		map.put("ROUT_CD", ROUT_CD);
		map.put("WO_NO", WO_NO);
		/*CommonResult proResult = new CommonResult();
		returnNum = CoreFrameDao.doEngineCall("queryProductionControl", map, proResult);
		if (returnNum != CoreFrameErrorCode.ISUCCESS_CODE) {
			throw new PodiumException(returnNum, proResult.getPrompt(),
					CoreFrameworkConstants.Podium_LVL);
		}
		if (result.getDataList() != null && result.getDataList().size() > 0) {
			
		}*/
		
		returnNum = CoreFrameDao.doEngineCall("queryInputStation", map, result);
		if (returnNum != CoreFrameErrorCode.ISUCCESS_CODE) {
			throw new PodiumException(returnNum, result.getPrompt(),
					CoreFrameworkConstants.Podium_LVL);
		}
		if (result.getDataList() != null && result.getDataList().size() > 0) {
			for (Iterator<Map> iter = result.getDataList().iterator(); iter.hasNext();) {
				Map param = (Map) iter.next();
				map.put("ITEM_CD", (String)param.get("ITEM_CD"));         //产品编号
				map.put("ITEM_NM", (String)param.get("ITEM_NM"));         //产品名称
				map.put("FCT_CD", (String)param.get("FCT_CD"));           //工厂编码
				map.put("WC_CD", (String)param.get("WC_CD"));		      //车间编码
				map.put("WO_NO", (String)param.get("WO_NO"));             //作业指示
				map.put("MO_NO", (String)param.get("MO_NO"));             //工单编号
				map.put("SHIFT_CD", (String)param.get("SHIFT_CD"));             //班组编码
				map.put("LINE_CD", (String)param.get("LINE_CD"));		      //车间编码
				map.put("PRF_CD", (String)param.get("PRF_CD"));           //工序代码
				map.put("WO_STATE", (String)param.get("WO_STATE"));     //工序代码
				map.put("PROD_TYPE", (String)param.get("PROD_TYPE"));     //工序代码
			}
		}
		
		CommonResult routResult = new CommonResult();
		/*map.put("BRANCH_ROUT", "0");
		String FROM_ROUT_CD ="";
		returnNum = CoreFrameDao.doEngineCall("queryMoRout", map, routResult);
		if (returnNum != CoreFrameErrorCode.ISUCCESS_CODE) {
			throw new PodiumException(returnNum, result.getPrompt(),
					CoreFrameworkConstants.Podium_LVL);
		}
		if (routResult.getDataList() != null && routResult.getDataList().size() > 0) {
			for (Iterator<Map> iter = routResult.getDataList().iterator(); iter.hasNext();) {
				Map params = (Map) iter.next();
				FROM_ROUT_CD=(String)params.get("FROM_ROUT_CD");
			}
		}*/
		
		
		CommonResult SNResult = new CommonResult();
		//找出SN是否有捆绑
		map.put("BIND_ST", "0");
		returnNum = CoreFrameDao.doEngineCall("querySNBindingBySN", map, SNResult);
		if (returnNum != CoreFrameErrorCode.ISUCCESS_CODE) {
			throw new PodiumException(returnNum, SNResult.getPrompt(),
					CoreFrameworkConstants.Podium_LVL);
		}
		if (SNResult.getDataList() != null && SNResult.getDataList().size() > 0) {
			for (Iterator<Map> iters = SNResult.getDataList().iterator(); iters.hasNext();) {
				Map   snMap = new HashMap();
				snMap =(Map)iters.next();
				map.put("BAR_CODE", (String) snMap.get("BAR_CODE"));
				returnNum=CoreFrameDao.doEngineCall("insertProductionInput",map,result);	    
				if (returnNum != CoreFrameErrorCode.ISUCCESS_CODE) {
						throw new PodiumException(returnNum, result.getPrompt(),
							CoreFrameworkConstants.Podium_LVL);
				}
			}
		}else{
			returnNum=CoreFrameDao.doEngineCall("insertProductionInput",map,result);	    
			if (returnNum != CoreFrameErrorCode.ISUCCESS_CODE) {
				throw new PodiumException(returnNum, result.getPrompt(),
						CoreFrameworkConstants.Podium_LVL);
			}
		}
		
		CommonResult ProResult = new CommonResult();
		ProResult.setFlag("0");
		ProResult.setErrorLvl("0");
		ProResult.setPrompt("查询成功！");
		ProResult.setTimes("0");
		return ProResult;
	}

}
