package com.iPlant.mes.biz.mobile;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.iPlant.frame.biz.podium.PodiumResult;
import com.iPlant.frame.biz.podium.basic.CoreFrameDao;
import com.iPlant.frame.biz.podium.exchange.DataExchangeAssembly;
import com.iPlant.frame.config.CoreFrameErrorCode;
import com.iPlant.frame.config.CoreFrameworkConstants;
import com.iPlant.frame.config.CustomizedPropertyPlaceholderConfigurer;
import com.iPlant.frame.exception.PodiumException;
import com.iPlant.frame.ifs.model.CommonResult;
import com.iPlant.mes.BaseBusiness;
import com.iPlant.mes.common.NameRulesComm;

public class CreditManage extends  BaseBusiness{

	@SuppressWarnings({ "rawtypes", "unchecked" })
	@Override
	public CommonResult execute(DataExchangeAssembly dataExchange) {
		
		CommonResult  result = new CommonResult();
		PodiumResult podium = new PodiumResult();
	    String cl_cd = "";
	    String cl_nm = "";
	    //String cl_bgn_date = "";
		int returnNum = 0;
		Map parameter = (Map) dataExchange.getBizData("params");
		String STP_YN = (String) parameter.get("STP_YN");		
		if(!STP_YN.equals("2")){
			 returnNum = CoreFrameDao.doEngineCall("insertEquipmentOp", parameter,result);
				if (returnNum != CoreFrameErrorCode.ISUCCESS_CODE) {
					throw new PodiumException(returnNum, result.getPrompt(),
							CoreFrameworkConstants.Podium_LVL);					
				}				
				//设备状态更新为停机		
				if(!parameter.get("CL_CD").equals("RCL01.05")){	
					Map  opMap = new HashMap();
					opMap.put("DICT_IT", "RDI01.04");
					opMap.put("DICT_IT_NM", "停机");
					opMap.put("ET_CD", parameter.get("ET_CD"));
					opMap.put("DO_CD", parameter.get("DO_CD"));
					 returnNum = CoreFrameDao.doEngineCall("updateEquipmentStatus", opMap,result);
						if (returnNum != CoreFrameErrorCode.ISUCCESS_CODE) {
							throw new PodiumException(returnNum, result.getPrompt(),
									CoreFrameworkConstants.Podium_LVL);					
				       }
					 //更新设备状态明细表
						Map  machineUpdate1  = new  HashMap();
						machineUpdate1.put("END_EMP", parameter.get("BGN_EMP"));
						machineUpdate1.put("ET_CD", parameter.get("ET_CD"));
						returnNum = CoreFrameDao.doEngineCall("updateEquipmentStatusDetail", machineUpdate1,result);
						if (returnNum != CoreFrameErrorCode.ISUCCESS_CODE) {
							throw new PodiumException(returnNum, result.getPrompt(),
											CoreFrameworkConstants.Podium_LVL);					
							}		
					//插入设备状态明细表
					parameter.put("DICT_IT_01", "RDI01.04");
					parameter.put("DICT_IT_NM_01", "停机");
					returnNum = CoreFrameDao.doEngineCall("insertEquipmentStatusDetail", parameter,result);
					if (returnNum != CoreFrameErrorCode.ISUCCESS_CODE) {
						throw new PodiumException(returnNum, result.getPrompt(),
										CoreFrameworkConstants.Podium_LVL);					
						}	
				}
                //设备状态更新为计划停机
				if(parameter.get("CL_CD").equals("RCL01.05")){	
					Map  opMap = new HashMap();
					opMap.put("DICT_IT", "RDI01.06");
					opMap.put("DICT_IT_NM", "计划停机");
					opMap.put("ET_CD", parameter.get("ET_CD"));
					opMap.put("DO_CD", parameter.get("DO_CD"));
					 returnNum = CoreFrameDao.doEngineCall("updateEquipmentStatus", opMap,result);
						if (returnNum != CoreFrameErrorCode.ISUCCESS_CODE) {
							throw new PodiumException(returnNum, result.getPrompt(),
									CoreFrameworkConstants.Podium_LVL);	
				       }
					//更新设备状态明细表
						Map  machineUpdate2  = new  HashMap();
						machineUpdate2.put("END_EMP", parameter.get("BGN_EMP"));
						machineUpdate2.put("ET_CD", parameter.get("ET_CD"));
						returnNum = CoreFrameDao.doEngineCall("updateEquipmentStatusDetail", machineUpdate2,result);
						if (returnNum != CoreFrameErrorCode.ISUCCESS_CODE) {
							throw new PodiumException(returnNum, result.getPrompt(),
											CoreFrameworkConstants.Podium_LVL);					
							}	
				   //插入设备状态明细表
					parameter.put("DICT_IT_01", "RDI01.06");
					parameter.put("DICT_IT_NM_01", "计划停机");
					returnNum = CoreFrameDao.doEngineCall("insertEquipmentStatusDetail", parameter,result);
					if (returnNum != CoreFrameErrorCode.ISUCCESS_CODE) {
						throw new PodiumException(returnNum, result.getPrompt(),
									CoreFrameworkConstants.Podium_LVL);					
						}	
				}	
				//插入停机操作明细记录
				returnNum = CoreFrameDao.doEngineCall("insertEquipmentStopStatus", parameter,result);
				if (returnNum != CoreFrameErrorCode.ISUCCESS_CODE) {
					throw new PodiumException(returnNum, result.getPrompt(),
							CoreFrameworkConstants.Podium_LVL);					
				}				
			return result;
			
		}
		//插入设备操作明细记录
		returnNum = CoreFrameDao.doEngineCall("insertEquipmentOp", parameter,result);
		if (returnNum != CoreFrameErrorCode.ISUCCESS_CODE) {
			throw new PodiumException(returnNum, result.getPrompt(),
					CoreFrameworkConstants.Podium_LVL);					
		}
		
		CommonResult  zhudanResult = new CommonResult();
		//查询主单
		parameter.put("DO_STATUS", "1");
		 returnNum = CoreFrameDao.doEngineCall("queryOdInfo", parameter,zhudanResult);
		if (returnNum != CoreFrameErrorCode.ISUCCESS_CODE) {
			throw new PodiumException(returnNum, zhudanResult.getPrompt(),
					CoreFrameworkConstants.Podium_LVL);
		}
		if (zhudanResult.getDataList() != null && zhudanResult.getDataList().size() > 0) {
		Map map  = zhudanResult.getDataList().get(0);
		cl_cd =(String) map.get("CL_CD");
		cl_nm =(String) map.get("CL_NM");
		//cl_bgn_date =(String) map.get("CL_BGN_DATE");
		//更新主单
		Map   opMap = new HashMap();
		opMap.put("DO_STATUS", "2");
		opMap.put("DO_CD", map.get("DO_CD"));
		opMap.put("CL_CD", map.get("CL_CD"));
		opMap.put("CL_NM", map.get("CL_NM"));
		opMap.put("ET_CD", map.get("ET_CD"));
		//opMap.put("PT_CD", map.get("PT_CD"));
		    returnNum = CoreFrameDao.doEngineCall("updateOdInfoDo", opMap,result);
		if (returnNum != CoreFrameErrorCode.ISUCCESS_CODE) {
			throw new PodiumException(returnNum, result.getPrompt(),
					CoreFrameworkConstants.Podium_LVL);
		}
		
		//更新主单下机刷卡结束时间

		
		Map   NopMap = new HashMap();			
		NopMap.put("DO_CD", map.get("DO_CD"));
		NopMap.put("CL_CD", "RCL01.09");
		NopMap.put("CL_NM", "下机刷卡");
		//NopMap.put("CL_BGN_DATE",cl_bgn_date );
		NopMap.put("ET_CD", map.get("ET_CD"));
		NopMap.put("BGN_EMP", parameter.get("BGN_EMP"));
		NopMap.put("END_EMP", parameter.get("BGN_EMP"));
		    returnNum = CoreFrameDao.doEngineCall("updateEquipmentEndOp", NopMap,result);
		if (returnNum != CoreFrameErrorCode.ISUCCESS_CODE) {
			throw new PodiumException(returnNum, result.getPrompt(),
					CoreFrameworkConstants.Podium_LVL);
		}
	//更新主单设备操作明细表停机结束时间
		//Map map  = result.getDataList().get(0);			
		Map   opMap1 = new HashMap();			
		opMap1.put("DO_CD", map.get("DO_CD"));			
		opMap1.put("ET_CD", map.get("ET_CD"));
		//opMap1.put("CL_BGN_DATE",cl_bgn_date );
		opMap1.put("END_EMP", parameter.get("BGN_EMP"));
		    returnNum = CoreFrameDao.doEngineCall("updateEquipmentOp", opMap1,result);
		if (returnNum != CoreFrameErrorCode.ISUCCESS_CODE) {
			throw new PodiumException(returnNum, result.getPrompt(),
					CoreFrameworkConstants.Podium_LVL);
		}
	//更新主单停机明细表停机结束时间		
		//Map map  = result.getDataList().get(0);			
		Map   opMap2 = new HashMap();			
		opMap2.put("DO_CD", opMap.get("DO_CD"));			
		opMap2.put("ET_CD", map.get("ET_CD"));
		//opMap2.put("CL_BGN_DATE",cl_bgn_date );
		opMap2.put("END_EMP", parameter.get("BGN_EMP"));
		    returnNum = CoreFrameDao.doEngineCall("updateEquipmentStopStatus", opMap2,result);
		if (returnNum != CoreFrameErrorCode.ISUCCESS_CODE) {
			throw new PodiumException(returnNum, result.getPrompt(),
					CoreFrameworkConstants.Podium_LVL);
		   }				
		}		
		//查询次单
		CommonResult  newPoResult = new CommonResult();
		//parameter.put("DO_STATUS", "0");
		 returnNum = CoreFrameDao.doEngineCall("querySimple", parameter,newPoResult);
		if (returnNum != CoreFrameErrorCode.ISUCCESS_CODE) {
			throw new PodiumException(returnNum, result.getPrompt(),
					CoreFrameworkConstants.Podium_LVL);
		}
		if (newPoResult.getDataList() != null && newPoResult.getDataList().size() > 0) {
		Map  newMap = new  HashMap();
		newMap.putAll(newPoResult.getDataList().get(0));
		//更新次单
		//刷卡为换单的需更新主单为暂停，次单位主单 已计划开始时间与计划结束时间来算
		Map   newOpMap = new HashMap();
		newOpMap.put("DO_STATUS", "1");
		newOpMap.put("DO_CD", newMap.get("DO_CD"));
//		newOpMap.put("MO_CD", newMap.get("MO_CD"));
		newOpMap.put("ET_CD", newMap.get("ET_CD"));
//		newOpMap.put("PT_CD", newMap.get("PT_CD"));
		CommonResult  poResult = new CommonResult();
		returnNum = CoreFrameDao.doEngineCall("updateOdInfoDo", newOpMap,poResult);
		if (returnNum != CoreFrameErrorCode.ISUCCESS_CODE) {
			throw new PodiumException(returnNum, poResult.getPrompt(),
					CoreFrameworkConstants.Podium_LVL);
		}


		//插入停机操作明细记录
		Map  stopStatus = new HashMap();
		stopStatus.put("ET_CD", newMap.get("ET_CD"));
		stopStatus.put("DO_CD", newMap.get("DO_CD"));
		stopStatus.put("CL_CD", cl_cd);
		stopStatus.put("CL_NM", cl_nm);	
		stopStatus.put("STP_YN", "1");		
		stopStatus.put("BGN_EMP", parameter.get("BGN_EMP"));
		returnNum = CoreFrameDao.doEngineCall("insertEquipmentOp", stopStatus,result);
		if (returnNum != CoreFrameErrorCode.ISUCCESS_CODE) {
			throw new PodiumException(returnNum, result.getPrompt(),
					CoreFrameworkConstants.Podium_LVL);					
		}
		//插入次单上机操作明细记录
				Map  cidanshStatus = new HashMap();
				cidanshStatus.put("ET_CD", newMap.get("ET_CD"));
				cidanshStatus.put("DO_CD", newMap.get("DO_CD"));
				cidanshStatus.put("CL_CD", "RCL01.08");
				cidanshStatus.put("CL_NM", "上机刷卡");
				cidanshStatus.put("STP_YN", "2");		
				cidanshStatus.put("BGN_EMP", parameter.get("BGN_EMP"));
				returnNum = CoreFrameDao.doEngineCall("insertEquipmentOp", cidanshStatus,result);
				if (returnNum != CoreFrameErrorCode.ISUCCESS_CODE) {
					throw new PodiumException(returnNum, result.getPrompt(),
							CoreFrameworkConstants.Podium_LVL);					
				}
		//插入新次单停机
		Map  cidanMap  = new  HashMap();
		cidanMap.put("ET_CD", newMap.get("ET_CD"));
		cidanMap.put("DO_CD", newMap.get("DO_CD"));
		cidanMap.put("CL_CD", cl_cd);
		cidanMap.put("CL_NM", cl_nm);
		cidanMap.put("STP_YN", "1");
		cidanMap.put("BGN_EMP", parameter.get("BGN_EMP"));
				returnNum = CoreFrameDao.doEngineCall("insertEquipmentStopStatus", cidanMap,poResult);
				if (returnNum != CoreFrameErrorCode.ISUCCESS_CODE) {
					throw new PodiumException(returnNum, poResult.getPrompt(),
							CoreFrameworkConstants.Podium_LVL);
				}

		

		List list = new ArrayList();
		podium.setFlag("0");
		podium.setDataList(list);
		podium.setErrorLvl("0");
		podium.setPrompt("查询成功！");
		
		}else{
			List list = new ArrayList();
			podium.setFlag("0"); 
			podium.setDataList(list);
			podium.setErrorLvl("0");
			podium.setPrompt("没有找到机器次单信息！");
			podium.setTimes("0");
		}
		return podium;
	}
	
	
	/**
	 * 结束刷卡
	 */
	@SuppressWarnings({ "rawtypes", "unchecked" })
	public CommonResult stopCard(DataExchangeAssembly dataExchange) {
		Map parameter = (Map) dataExchange.getBizData("params");
		CommonResult result = new CommonResult();		
		//更新设备操作明细表
		Map  machineUpdateDetail  = new  HashMap();
		machineUpdateDetail.put("ET_CD", parameter.get("ET_CD"));						
		machineUpdateDetail.put("END_EMP", parameter.get("END_EMP"));
		int returnNum = CoreFrameDao.doEngineCall("updateEquipmentOp", machineUpdateDetail,result);
		if (returnNum != CoreFrameErrorCode.ISUCCESS_CODE) {
			throw new PodiumException(returnNum, result.getPrompt(),
					CoreFrameworkConstants.Podium_LVL);					
		}
		//更新停机明细表
		Map  machineUpdateDetail1  = new  HashMap();
		machineUpdateDetail1.put("ET_CD", parameter.get("ET_CD"));						
		machineUpdateDetail1.put("END_EMP", parameter.get("END_EMP"));
		returnNum = CoreFrameDao.doEngineCall("updateEquipmentStopStatus", machineUpdateDetail1,result);
		if (returnNum != CoreFrameErrorCode.ISUCCESS_CODE) {
			throw new PodiumException(returnNum, result.getPrompt(),
					CoreFrameworkConstants.Podium_LVL);					
		}
		//更新设备状态主表
		Map  machineUpdateDetail2  = new  HashMap();
		machineUpdateDetail2.put("ET_CD", parameter.get("ET_CD"));		
		machineUpdateDetail2.put("DICT_IT", "RDI01.02");
		machineUpdateDetail2.put("DICT_IT_NM", "待机空闲");
		machineUpdateDetail2.put("END_EMP", parameter.get("END_EMP"));
		returnNum = CoreFrameDao.doEngineCall("updateEquipmentStatus", machineUpdateDetail2,result);
		if (returnNum != CoreFrameErrorCode.ISUCCESS_CODE) {
			throw new PodiumException(returnNum, result.getPrompt(),
					CoreFrameworkConstants.Podium_LVL);					
		}
		//更新设备状态明细表
		Map  machineUpdateDetail3  = new  HashMap();
		machineUpdateDetail3.put("ET_CD", parameter.get("ET_CD"));				
		machineUpdateDetail3.put("END_EMP", parameter.get("END_EMP"));
		returnNum = CoreFrameDao.doEngineCall("updateEquipmentStatusDetail", machineUpdateDetail3,result);
		if (returnNum != CoreFrameErrorCode.ISUCCESS_CODE) {
			throw new PodiumException(returnNum, result.getPrompt(),
					CoreFrameworkConstants.Podium_LVL);					
		}
        //新增设备状态明细表
		Map  machineUpdate  = new  HashMap();
		machineUpdate.put("ET_CD", parameter.get("ET_CD"));
		machineUpdate.put("DO_CD", parameter.get("DO_CD"));		
		machineUpdate.put("STP_YN", "1");
		machineUpdate.put("DICT_IT_01", "RDI01.02");
		machineUpdate.put("DICT_IT_NM_01", "待机空闲");
		machineUpdate.put("BGN_EMP", parameter.get("END_EMP"));
		returnNum = CoreFrameDao.doEngineCall("insertEquipmentStatusDetail", machineUpdate,result);
		if (returnNum != CoreFrameErrorCode.ISUCCESS_CODE) {
			throw new PodiumException(returnNum, result.getPrompt(),
					CoreFrameworkConstants.Podium_LVL);					
		}
		return result;
	}
}
