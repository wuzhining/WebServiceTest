package com.iPlant.mes.biz.alarm;


import java.util.Map;

import com.iPlant.frame.biz.podium.basic.CoreFrameDao;
import com.iPlant.frame.biz.podium.exchange.DataExchangeAssembly;
import com.iPlant.frame.config.CoreFrameErrorCode;
import com.iPlant.frame.config.CoreFrameworkConstants;
import com.iPlant.frame.config.CustomizedPropertyPlaceholderConfigurer;
import com.iPlant.frame.exception.PodiumException;
import com.iPlant.frame.ifs.model.CommonResult;
import com.iPlant.mes.BaseBusiness;
import com.iPlant.mes.common.NameRulesComm;
public class Alarm extends BaseBusiness{

	/**
	 * 报警配置编码
	 */
	@SuppressWarnings({ "rawtypes", "unchecked" })
	@Override
	public CommonResult execute(DataExchangeAssembly dataExchange) {
		
		Map parameter = (Map) dataExchange.getBizData("params");
		CommonResult result = new CommonResult();		
		String Rules=(String) CustomizedPropertyPlaceholderConfigurer.getContextProperty("baojingpeizhi");
		int nameRules=NameRulesComm.createSeq(Rules);
		parameter.put("AD_CD", nameRules);
		int returnNum = CoreFrameDao.doEngineCall("insertAlarmSingleCondition", parameter,result);
		if (returnNum != CoreFrameErrorCode.ISUCCESS_CODE) {
			throw new PodiumException(returnNum, result.getPrompt(),
					CoreFrameworkConstants.Podium_LVL);
		}
		return result;
	}
	@SuppressWarnings({ "rawtypes"})
	public CommonResult deleteAlarmTeam(DataExchangeAssembly dataExchange) {	
		Map parameter = (Map) dataExchange.getBizData("params");
		CommonResult result = new CommonResult();			
		int returnNum = CoreFrameDao.doEngineCall("deleteTeamInfoDetail", parameter,result);
		if (returnNum != CoreFrameErrorCode.ISUCCESS_CODE) {
			throw new PodiumException(returnNum, result.getPrompt(),
					CoreFrameworkConstants.Podium_LVL);
		}
		int returnNum2 = CoreFrameDao.doEngineCall("deleteTeamInfo", parameter,result);
		if (returnNum2 != CoreFrameErrorCode.ISUCCESS_CODE) {
			throw new PodiumException(returnNum2, result.getPrompt(),
					CoreFrameworkConstants.Podium_LVL);
		}
		return result;
	}

	@SuppressWarnings({ "rawtypes"})
	public CommonResult deleteAlarmPeiZhi(DataExchangeAssembly dataExchange) {	
		Map parameter = (Map) dataExchange.getBizData("params");
		CommonResult result = new CommonResult();			
		int returnNum = CoreFrameDao.doEngineCall("deleteAlarmSingleCondition", parameter,result);
		if (returnNum != CoreFrameErrorCode.ISUCCESS_CODE) {
			throw new PodiumException(returnNum, result.getPrompt(),
					CoreFrameworkConstants.Podium_LVL);
		}
		int returnNum3 = CoreFrameDao.doEngineCall("deleteFrequencyPair", parameter,result);
		if (returnNum != CoreFrameErrorCode.ISUCCESS_CODE) {
			throw new PodiumException(returnNum3, result.getPrompt(),
					CoreFrameworkConstants.Podium_LVL);
		}
		int returnNum4 = CoreFrameDao.doEngineCall("deleteMachinePair", parameter,result);
		if (returnNum != CoreFrameErrorCode.ISUCCESS_CODE) {
			throw new PodiumException(returnNum4, result.getPrompt(),
					CoreFrameworkConstants.Podium_LVL);
		}
		return result;
	}

	@SuppressWarnings({ "rawtypes"})
	public CommonResult deleteAlarmPeiZhi2(DataExchangeAssembly dataExchange) {	
		Map parameter = (Map) dataExchange.getBizData("params");
		CommonResult result = new CommonResult();			
		int returnNum = CoreFrameDao.doEngineCall("deleteAlarmDoubleCondition", parameter,result);
		if (returnNum != CoreFrameErrorCode.ISUCCESS_CODE) {
			throw new PodiumException(returnNum, result.getPrompt(),
					CoreFrameworkConstants.Podium_LVL);
		}
		int returnNum3 = CoreFrameDao.doEngineCall("deleteFrequencyPair", parameter,result);
		if (returnNum != CoreFrameErrorCode.ISUCCESS_CODE) {
			throw new PodiumException(returnNum3, result.getPrompt(),
					CoreFrameworkConstants.Podium_LVL);
		}
		int returnNum4 = CoreFrameDao.doEngineCall("deleteMachinePair", parameter,result);
		if (returnNum != CoreFrameErrorCode.ISUCCESS_CODE) {
			throw new PodiumException(returnNum4, result.getPrompt(),
					CoreFrameworkConstants.Podium_LVL);
		}
		return result;
	}

	//班组更新插入
	@SuppressWarnings({ "rawtypes" })
	public CommonResult updateAlarmFrequencyPair(DataExchangeAssembly dataExchange) {	
		Map parameter = (Map) dataExchange.getBizData("params");		
		CommonResult result = new CommonResult();			
		int returnNum = CoreFrameDao.doEngineCall("updateFrequencyPair", parameter,result);//删除班组配对
		if (returnNum != CoreFrameErrorCode.ISUCCESS_CODE) {
			throw new PodiumException(returnNum, result.getPrompt(),
					CoreFrameworkConstants.Podium_LVL);
		}
		int returnNum1 = CoreFrameDao.doEngineCall("insertFrequencyPair", parameter,result);//插入班组配对
		if (returnNum != CoreFrameErrorCode.ISUCCESS_CODE) {
			throw new PodiumException(returnNum1, result.getPrompt(),
					CoreFrameworkConstants.Podium_LVL);
		 
		}
//		List list=(List)parameter.get("list");//批量插入班组配对
//		int returnNum1 = 0;		
//		for(int i=0;i<list.size();i++){			
//			parameter.put("AD_CD", ((Map) list.get(i)).get("AD_CD"));	//报警配置编码
//			parameter.put("AT_CD", ((Map) list.get(i)).get("AT_CD"));	//班组编号
//			parameter.put("AT_NM", ((Map) list.get(i)).get("AT_NM"));	//班组名称
//			parameter.put("AD_HC", ((Map) list.get(i)).get("AD_HC"));	//报警层级
//			returnNum1 = CoreFrameDao.doEngineCall("insertFrequencyPair", parameter,result);
//			if (returnNum != CoreFrameErrorCode.ISUCCESS_CODE) {
//				throw new PodiumException(returnNum1, result.getPrompt(),
//						CoreFrameworkConstants.Podium_LVL);
//			}																
//		}			
		return result;
	}
	
	//设备更新插入
	@SuppressWarnings({ "rawtypes"})
	public CommonResult updateAlarmMachine(DataExchangeAssembly dataExchange) {	
		Map parameter = (Map) dataExchange.getBizData("params");		
		CommonResult result = new CommonResult();			
		int returnNum = CoreFrameDao.doEngineCall("updateMachinePair", parameter,result);//删除设备配对
		if (returnNum != CoreFrameErrorCode.ISUCCESS_CODE) {
			throw new PodiumException(returnNum, result.getPrompt(),
					CoreFrameworkConstants.Podium_LVL);
		}
		int returnNum1 = CoreFrameDao.doEngineCall("insertMachinePair", parameter,result);//插入设备配对
		if (returnNum != CoreFrameErrorCode.ISUCCESS_CODE) {
			throw new PodiumException(returnNum1, result.getPrompt(),
					CoreFrameworkConstants.Podium_LVL);
		 
		}
//		List list=(List)parameter.get("list");//批量插入设备配对
//		int returnNum1 = 0;		
//		for(int i=0;i<list.size();i++){			
//			parameter.put("AD_CD", ((Map) list.get(i)).get("AD_CD"));	//报警配置编码
//			parameter.put("ET_CD", ((Map) list.get(i)).get("ET_CD"));	//设备编号			
//			returnNum1 = CoreFrameDao.doEngineCall("insertMachinePair", parameter,result);
//			if (returnNum != CoreFrameErrorCode.ISUCCESS_CODE) {
//				throw new PodiumException(returnNum1, result.getPrompt(),
//						CoreFrameworkConstants.Podium_LVL);
//			}																
//		}	
		return result;
	}
	
	
	//班组配置员工更新插入
	@SuppressWarnings({ "rawtypes", "unchecked" })
	public CommonResult updateBCCodeEMP(DataExchangeAssembly dataExchange) {	
		Map parameter = (Map) dataExchange.getBizData("params");		
		CommonResult result = new CommonResult();			
		int returnNum = CoreFrameDao.doEngineCall("updateTeamInfoDetail", parameter,result);//删除配置员工
		if (returnNum != CoreFrameErrorCode.ISUCCESS_CODE) {
			throw new PodiumException(returnNum, result.getPrompt(),
					CoreFrameworkConstants.Podium_LVL);
		}
		int returnNum1 = CoreFrameDao.doEngineCall("insertTeamInfoDetail", parameter,result);//插入配置员工
		if (returnNum != CoreFrameErrorCode.ISUCCESS_CODE) {
			throw new PodiumException(returnNum1, result.getPrompt(),
					CoreFrameworkConstants.Podium_LVL);
		 
		}
	
		return result;
	}
	/**
	 * 批量删除班组信息
	 */
//	@SuppressWarnings({ "rawtypes", "unchecked" })
//	public CommonResult qualityDelAlarmTeam(DataExchangeAssembly dataExchange) {	
//		Map parameter = (Map) dataExchange.getBizData("params");
//		List atCdList   =(List) parameter.get("AT_CD");
//		for(int i=0;i<atCdList.size();i++){
		//	CommonResult result = new CommonResult();			
		//	int returnNum = CoreFrameDao.doEngineCall("deleteTeamInfoDetail", parameter,result);
		//	if (returnNum != CoreFrameErrorCode.ISUCCESS_CODE) {
		//		throw new PodiumException(returnNum, result.getPrompt(),
		//				CoreFrameworkConstants.Podium_LVL);
		//	}
		//	int returnNum2 = CoreFrameDao.doEngineCall("deleteTeamInfo", parameter,result);
		//	if (returnNum != CoreFrameErrorCode.ISUCCESS_CODE) {
		//		throw new PodiumException(returnNum2, result.getPrompt(),
		//				CoreFrameworkConstants.Podium_LVL);
		//	}
		//}
//		return result;
//		
//	}



	
}