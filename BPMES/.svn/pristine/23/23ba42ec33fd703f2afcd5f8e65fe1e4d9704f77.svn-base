package com.iPlant.mes.biz.equipmentManage;

import java.util.List;
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


public class EquipmentManage extends BaseBusiness{

	
	/**
	 * 设备维修编码生产及插入
	 */
	@SuppressWarnings({ "rawtypes", "unchecked" })
	@Override
	public CommonResult execute(DataExchangeAssembly dataExchange) {
		
		Map parameter = (Map) dataExchange.getBizData("params");
		CommonResult result = new CommonResult();		
		String Rules=(String) CustomizedPropertyPlaceholderConfigurer.getContextProperty("sheBeiWeixiu");
		String nameRules=NameRulesComm.createNameRules(Rules);
		parameter.put("RP_CD", nameRules);
		int returnNum = CoreFrameDao.doEngineCall("insertDeviceRepair", parameter,result);
		if (returnNum != CoreFrameErrorCode.ISUCCESS_CODE) {
			throw new PodiumException(returnNum, result.getPrompt(),
					CoreFrameworkConstants.Podium_LVL);
		}
		return result;
	}
	
	/**
	 * 设备保养编码生产及插入
	 */
	@SuppressWarnings({ "rawtypes", "unchecked" })
	public CommonResult  equipmentMaintain(DataExchangeAssembly dataExchange) {
		
		Map parameter = (Map) dataExchange.getBizData("params");
		CommonResult result = new CommonResult();		
		String Rules=(String) CustomizedPropertyPlaceholderConfigurer.getContextProperty("sheBeiBaoYang");
		String nameRules=NameRulesComm.createNameRules(Rules);
		parameter.put("MT_CD", nameRules);
		int iRetCode = CoreFrameDao.doEngineCall("insertDeviceMaintain", parameter, result);

		if (iRetCode != CoreFrameErrorCode.ISUCCESS_CODE) {
			throw new PodiumException(iRetCode, result.getPrompt(),
					CoreFrameworkConstants.Podium_LVL);
		}
		return result;
	}
	
	/**
	 * 设备点检编码生成及插入
	 */
	@SuppressWarnings({ "rawtypes", "unchecked" })
	public CommonResult  equipmentCheck(DataExchangeAssembly dataExchange) {		
		Map parameter = (Map) dataExchange.getBizData("params");
		List list=(List)parameter.get("list");
		CommonResult result = new CommonResult();		
		int returnNum=0;
		String Rules=(String) CustomizedPropertyPlaceholderConfigurer.getContextProperty("sheBeiDianJian");
		String dianJianRules=NameRulesComm.createNameRules(Rules);	
		parameter.put("TT_CD", dianJianRules); 	
		returnNum = CoreFrameDao.doEngineCall("insertDeviceCheck", parameter, result); 	//插入点检主表
		if (returnNum != CoreFrameErrorCode.ISUCCESS_CODE) {
			throw new PodiumException(returnNum, result.getPrompt(),
					CoreFrameworkConstants.Podium_LVL);
		}
		Map parameter2 = (Map) dataExchange.getBizData("params");
		parameter2.put("TT_CD", dianJianRules); 
		for(int i=0;i<list.size();i++){									//批量插入点检明细表	
			parameter2.put("ET_CD", (String)parameter.get("ET_CD")); 
			parameter2.put("CK_DT", (String)parameter.get("TT_DT")); 	
			parameter2.put("CK_CD", ((Map) list.get(i)).get("CK_CD")); 
			parameter2.put("CL_RT", ((Map) list.get(i)).get("CL_RT")); 
			parameter2.put("CL_MT", ((Map) list.get(i)).get("CL_MT")); 
			parameter2.put("CL_MR", ((Map) list.get(i)).get("CL_MR")); 		
			returnNum = CoreFrameDao.doEngineCall("insertDeviceCheckDetail", parameter2, result);
			if (returnNum != CoreFrameErrorCode.ISUCCESS_CODE) {
				throw new PodiumException(returnNum, result.getPrompt(),
						CoreFrameworkConstants.Podium_LVL);
			}
		}
		Map parameter3 = (Map) dataExchange.getBizData("params");
		/*String Rules2=(String) CustomizedPropertyPlaceholderConfigurer.getContextProperty("sheBeiWeixiu");
		  String weiXiuRules=NameRulesComm.createNameRules(Rules2);*/
		//String CL_MT=(String)parameter2.get("CL_MT");
											 //批量自动生成维修单		
		for(int i=0;i<list.size();i++){				
			String CL_MT=(String) ((Map) list.get(i)).get("CL_MT"); 
			if(CL_MT.equals("Y")){	
			String Rules2=(String) CustomizedPropertyPlaceholderConfigurer.getContextProperty("sheBeiWeixiu");
			String weiXiuRules=NameRulesComm.createNameRules(Rules2);			
			parameter3.put("RP_CD",weiXiuRules);  
			parameter3.put("CK_CD", ((Map) list.get(i)).get("CK_CD")); 
			parameter3.put("ET_CD", (String)parameter.get("ET_CD")); 
			parameter3.put("RP_EMP", (String)parameter.get("TT_CP")); 
			parameter3.put("RP_ST", ((Map) list.get(i)).get("CL_MR")); 
			parameter3.put("DICT_IT_NM_01", ((Map) list.get(i)).get("DICT_IT_NM_01")); 
			returnNum = CoreFrameDao.doEngineCall("insertDeviceRepair", parameter3, result);
			if (returnNum != CoreFrameErrorCode.ISUCCESS_CODE) {
				throw new PodiumException(returnNum, result.getPrompt(),
						CoreFrameworkConstants.Podium_LVL);
			}
			}
		 }
		
		return result;
	}
	
	/**
	 * 删除模具与产品映射关系
	 */
	@SuppressWarnings({ "rawtypes"})
	public CommonResult updateMouldDetail(DataExchangeAssembly dataExchange) {	
		Map parameter = (Map) dataExchange.getBizData("params");
		CommonResult result = new CommonResult();			
		int returnNum = CoreFrameDao.doEngineCall("deleteMouldDetailInfo", parameter,result);
		if (returnNum != CoreFrameErrorCode.ISUCCESS_CODE) {
			throw new PodiumException(returnNum, result.getPrompt(),
					CoreFrameworkConstants.Podium_LVL);
		}
		int returnNum2 = CoreFrameDao.doEngineCall("insertMouldDetailInfo", parameter,result);
		if (returnNum2 != CoreFrameErrorCode.ISUCCESS_CODE) {
			throw new PodiumException(returnNum2, result.getPrompt(),
					CoreFrameworkConstants.Podium_LVL);
		}
		return result;
	}

}
