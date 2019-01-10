package com.iPlant.mes.common.process.mes;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import com.iPlant.frame.Template.TemplateMethodHandleSteps;
import com.iPlant.frame.biz.podium.basic.CoreFrameDao;
import com.iPlant.frame.biz.podium.exchange.DataExchangeAssembly;
import com.iPlant.frame.config.CoreFrameErrorCode;
import com.iPlant.frame.config.CoreFrameworkConstants;
import com.iPlant.frame.exception.PodiumException;
import com.iPlant.frame.ifs.model.CommonResult;

public class AppearanceAndTestingAllIntegrationSteps implements TemplateMethodHandleSteps {


	@SuppressWarnings({ "unused", "rawtypes", "unchecked"})
	public int Steps(DataExchangeAssembly dataExchange, CommonResult result) {
		Map parameter = (Map) dataExchange.getBizData("params");
		int returnNum=0;
		String ObtainRoutcd = "";
		String MAC_ADDRESS = (String)parameter.get("MAC_ADDRESS"); //如果是没有条码传值工单，作业指示  ROUT_CD
		String MO_NO = (String)parameter.get("MO_NO");
		String WO_NO = (String)parameter.get("WO_NO");
		String BAR_CODE = (String)parameter.get("BAR_CODE");
		String ROUT_CD =(String)parameter.get("ROUT_CD");
		
		String IPQC_RSLT = (String)parameter.get("IPQC_RSLT");
		String QC_DFCT_CD = (String)parameter.get("QC_DFCT_CD");
		String TEST_VALUE = (String)parameter.get("TEST_VALUE");
		
		String STATE="";
		String MSG ="";
		String BIND_CODE="";
		if(BAR_CODE.equals("") || BAR_CODE==null){
			Map<String,String> Bar_map =new HashMap<String,String>();
			Bar_map.put("MO_NO", MO_NO);
			Bar_map.put("ROUT_CD", ROUT_CD);
			Bar_map.put("WO_NO", WO_NO);
			returnNum = CoreFrameDao.doEngineCall("queryNotBar", Bar_map, result);
			if (returnNum != CoreFrameErrorCode.ISUCCESS_CODE) {
				throw new PodiumException(returnNum, result.getPrompt(),
						CoreFrameworkConstants.Podium_LVL);
			}
			BAR_CODE = (String)result.getDataList().get(0).get("BAR_CODE");
		}
		
		CommonResult sendResult = new CommonResult();
		List  dataList = new ArrayList();
		Map sendMap = new HashMap();
		Map   proMap = new HashMap();
		proMap.put("MAC_ADDRESS",MAC_ADDRESS);
		proMap.put("BAR_CODE",BAR_CODE);
		returnNum = CoreFrameDao.doEngineCall("queryStoredPprocedureStationMovement", proMap, result);
		if (returnNum != CoreFrameErrorCode.ISUCCESS_CODE) {
			throw new PodiumException(returnNum, result.getPrompt(),
					CoreFrameworkConstants.Podium_LVL);
		}
		if (result.getDataList() != null && result.getDataList().size() > 0) {
			STATE =(String) result.getDataList().get(0).get("STATE");
			MSG =(String) result.getDataList().get(0).get("MSG");
			ROUT_CD =(String) result.getDataList().get(0).get("ROUT_CD");
			BAR_CODE =(String) result.getDataList().get(0).get("BAR_CODE");
			BIND_CODE=(String) result.getDataList().get(0).get("BIND_CODE");
			
		}
		if(STATE.equals("1")){
		   sendMap.put("STATE", STATE);
		   sendMap.put("MSG", MSG);
		   sendMap.put("BIND_CODE", BIND_CODE);
		   dataList.add(sendMap);
		   result.setDataList(dataList);
		   result.setFlag("0");
		   result.setPrompt(MSG);
		   return returnNum;
	   }else if(STATE.equals("0")){
		/*产品测试   START*/
		Map<String,String> mapTest =new HashMap<String,String>();
		mapTest.put("BAR_CODE", BAR_CODE);
		mapTest.put("ROUT_CD", ROUT_CD);
		mapTest.put("IPQC_RSLT", IPQC_RSLT);
		mapTest.put("QC_DFCT_CD", QC_DFCT_CD);
		mapTest.put("TEST_VALUE", TEST_VALUE);
		returnNum = CoreFrameDao.doEngineCall("querySnWorkOrderInformation", mapTest, result);
		if (returnNum != CoreFrameErrorCode.ISUCCESS_CODE) {
			throw new PodiumException(returnNum, result.getPrompt(),
					CoreFrameworkConstants.Podium_LVL);
		}
		if (result.getDataList() != null && result.getDataList().size() > 0) {
			for (Iterator<Map> iter = result.getDataList().iterator(); iter.hasNext();) {
				Map param = (Map) iter.next();
				mapTest.put("FCT_CD", (String)param.get("FCT_CD"));           //工厂编码
				mapTest.put("WC_CD", (String)param.get("WC_CD"));		      //车间编码
				mapTest.put("BAR_CODE", (String)param.get("BAR_CODE"));       //产品条码
				mapTest.put("WO_NO", (String)param.get("WO_NO"));             //作业指示
				mapTest.put("MO_NO", (String)param.get("MO_NO"));             //工单编号
				mapTest.put("ITEM_CD", (String)param.get("ITEM_CD"));         //产品编号
				mapTest.put("ITEM_NM", (String)param.get("ITEM_NM"));         //产品名称
				mapTest.put("PRF_CD", (String)param.get("PRF_CD"));           //工序代码
				mapTest.put("BC_STATUS", (String)param.get("BC_STATUS"));
				mapTest.put("LINE_CD", (String)param.get("LINE_CD"));
			}
		}
		/*外观及测试明细表*/
		returnNum=CoreFrameDao.doEngineCall("insertIpqcSamplingDetails",mapTest,result);	    
		if (returnNum != CoreFrameErrorCode.ISUCCESS_CODE) {
			throw new PodiumException(returnNum, result.getPrompt(),
					CoreFrameworkConstants.Podium_LVL);
		}
		/*产品测试  END*/
		
		
		/*产品 WIP过站    START*/
		Map<String,String> map =new HashMap<String,String>();
		map.put("BAR_CODE", BAR_CODE);
		map.put("ROUT_CD", ROUT_CD);
		returnNum = CoreFrameDao.doEngineCall("querySnWorkOrderInformation", map, result);
		if (returnNum != CoreFrameErrorCode.ISUCCESS_CODE) {
			throw new PodiumException(returnNum, result.getPrompt(),
					CoreFrameworkConstants.Podium_LVL);
		}
		if (result.getDataList() != null && result.getDataList().size() > 0) {
			for (Iterator<Map> iter = result.getDataList().iterator(); iter.hasNext();) {
				Map param = (Map) iter.next();
				map.put("ROUT_CD", ROUT_CD);
				map.put("FCT_CD", (String)param.get("FCT_CD"));           //工厂编码
				map.put("WC_CD", (String)param.get("WC_CD"));		      //车间编码
				map.put("BAR_CODE", (String)param.get("BAR_CODE"));       //产品条码
				map.put("WO_NO", (String)param.get("WO_NO"));             //作业指示
				map.put("MO_NO", (String)param.get("MO_NO"));             //工单编号
				map.put("ITEM_CD", (String)param.get("ITEM_CD"));         //产品编号
				map.put("ITEM_NM", (String)param.get("ITEM_NM"));         //产品名称
				map.put("PRF_CD", (String)param.get("PRF_CD"));           //工序代码
				map.put("SN_NO", (String)param.get("SN_NO"));           //工序代码
				map.put("BC_STATUS", (String)param.get("BC_STATUS"));     //工序代码
				if(param.get("BC_STATUS").equals("0")){
					map.put("BRANCH_ROUT", "0");                          //工序代码
				}else{
					map.put("BRANCH_ROUT", "1");         
				}
			}
		}
		CommonResult routResult = new CommonResult();
		String PREV_ROUT_CD ="";
		String CURR_ROUT_CD ="";
		String NEXT_ROUT_CD ="";
		String FROM_ROUT_CD ="";
		String IS_INPUT ="";
		String IS_OUTPUT ="";
		String IS_BIND = "";
		String BIND_NO = "";
		returnNum = CoreFrameDao.doEngineCall("queryMoRout", map, routResult);
		if (returnNum != CoreFrameErrorCode.ISUCCESS_CODE) {
			throw new PodiumException(returnNum, result.getPrompt(),
					CoreFrameworkConstants.Podium_LVL);
		}
		if (routResult.getDataList() != null && routResult.getDataList().size() > 0) {
			for (Iterator<Map> iter = routResult.getDataList().iterator(); iter.hasNext();) {
				Map params = (Map) iter.next();
				PREV_ROUT_CD =(String)params.get("PREV_ROUT_CD");
				CURR_ROUT_CD=(String)params.get("CURR_ROUT_CD");
				NEXT_ROUT_CD=(String)params.get("NEXT_ROUT_CD");
				FROM_ROUT_CD=(String)params.get("FROM_ROUT_CD");
				IS_INPUT = (String)params.get("IS_INPUT");
				IS_OUTPUT = (String)params.get("IS_OUTPUT");
				IS_BIND = (String)params.get("IS_BIND");
			}
		}
		CommonResult SNResult = new CommonResult();
		//找出SN是否有捆绑
		map.put("BIND_ST", "0");
		returnNum = CoreFrameDao.doEngineCall("querySNBindingBySN", map, SNResult);
		if (returnNum != CoreFrameErrorCode.ISUCCESS_CODE) {
			throw new PodiumException(returnNum, SNResult.getPrompt(),
					CoreFrameworkConstants.Podium_LVL);
		}
		Map<String,String> BINDMAP =new HashMap<String,String>();
		
		if (SNResult.getDataList() != null && SNResult.getDataList().size() > 0) {
			BIND_NO = (String)SNResult.getDataList().get(0).get("BIND_NO");
			
			for (Iterator<Map> iters = SNResult.getDataList().iterator(); iters.hasNext();) {
				Map   snMap = new HashMap();
				snMap =(Map)iters.next();
				map.put("BAR_CODE", (String) snMap.get("BAR_CODE"));
				map.put("IS_INPUT", IS_INPUT);
				map.put("IS_OUTPUT", IS_OUTPUT);
				
				
				if(FROM_ROUT_CD.equals("START")){
					map.put("PREV_ROUT_CD", PREV_ROUT_CD);
					map.put("CURR_ROUT_CD", CURR_ROUT_CD);
					map.put("NEXT_ROUT_CD", NEXT_ROUT_CD);
					returnNum=CoreFrameDao.doEngineCall("insertProductionControl",map,result);	    
					if (returnNum != CoreFrameErrorCode.ISUCCESS_CODE) {
						throw new PodiumException(returnNum, result.getPrompt(),
								CoreFrameworkConstants.Podium_LVL);
					}
					returnNum=CoreFrameDao.doEngineCall("insertProductionControlDetailed",map,result);	    
					if (returnNum != CoreFrameErrorCode.ISUCCESS_CODE) {
						throw new PodiumException(returnNum, result.getPrompt(),
								CoreFrameworkConstants.Podium_LVL);
					}
			    }else{
			    	map.put("PREV_ROUT_CD", PREV_ROUT_CD);
					map.put("CURR_ROUT_CD", CURR_ROUT_CD);
					map.put("NEXT_ROUT_CD", NEXT_ROUT_CD);
			    	returnNum=CoreFrameDao.doEngineCall("updateProductionControl",map,result);	    
					if (returnNum != CoreFrameErrorCode.ISUCCESS_CODE) {
						throw new PodiumException(returnNum, result.getPrompt(),
								CoreFrameworkConstants.Podium_LVL);
					}
					returnNum=CoreFrameDao.doEngineCall("insertProductionControlDetailed",map,result);	    
					if (returnNum != CoreFrameErrorCode.ISUCCESS_CODE) {
						throw new PodiumException(returnNum, result.getPrompt(),
								CoreFrameworkConstants.Podium_LVL);
					}
			    }
				
				if(IS_INPUT.equals("Y")){
		    		returnNum=CoreFrameDao.doEngineCall("updateBarcodeJobInstructionStatus",map,result);	    
					if (returnNum != CoreFrameErrorCode.ISUCCESS_CODE) {
						throw new PodiumException(returnNum, result.getPrompt(),
								CoreFrameworkConstants.Podium_LVL);
					}
		    	}
		    	if(IS_OUTPUT.equals("Y")){
		    		returnNum=CoreFrameDao.doEngineCall("updateBarcodeJobInstructionStatus",map,result);	    
					if (returnNum != CoreFrameErrorCode.ISUCCESS_CODE) {
						throw new PodiumException(returnNum, result.getPrompt(),
								CoreFrameworkConstants.Podium_LVL);
					}
		    	}
		    }
			
			CommonResult BindResult = new CommonResult();
			BINDMAP.put("BIND_NO", BIND_NO);
			if(IS_BIND.equals("Y")){
				returnNum = CoreFrameDao.doEngineCall("deleteStationRelease", BINDMAP, BindResult);
				if (returnNum != CoreFrameErrorCode.ISUCCESS_CODE) {
					throw new PodiumException(returnNum, BindResult.getPrompt(),
					  CoreFrameworkConstants.Podium_LVL);
				}
			}
			
		}else{
			map.put("IS_INPUT", IS_INPUT);
			map.put("IS_OUTPUT", IS_OUTPUT);
			
			if(FROM_ROUT_CD.equals("START")){
				map.put("PREV_ROUT_CD", PREV_ROUT_CD);
				map.put("CURR_ROUT_CD", CURR_ROUT_CD);
				map.put("NEXT_ROUT_CD", NEXT_ROUT_CD);
				returnNum=CoreFrameDao.doEngineCall("insertProductionControl",map,result);	    
				if (returnNum != CoreFrameErrorCode.ISUCCESS_CODE) {
					throw new PodiumException(returnNum, result.getPrompt(),
							CoreFrameworkConstants.Podium_LVL);
				}
				returnNum=CoreFrameDao.doEngineCall("insertProductionControlDetailed",map,result);	    
				if (returnNum != CoreFrameErrorCode.ISUCCESS_CODE) {
					throw new PodiumException(returnNum, result.getPrompt(),
							CoreFrameworkConstants.Podium_LVL);
				}
		    }else{
		    	map.put("PREV_ROUT_CD", PREV_ROUT_CD);
				map.put("CURR_ROUT_CD", CURR_ROUT_CD);
				map.put("NEXT_ROUT_CD", NEXT_ROUT_CD);
		    	returnNum=CoreFrameDao.doEngineCall("updateProductionControl",map,result);	    
				if (returnNum != CoreFrameErrorCode.ISUCCESS_CODE) {
					throw new PodiumException(returnNum, result.getPrompt(),
							CoreFrameworkConstants.Podium_LVL);
				}
				returnNum=CoreFrameDao.doEngineCall("insertProductionControlDetailed",map,result);	    
				if (returnNum != CoreFrameErrorCode.ISUCCESS_CODE) {
					throw new PodiumException(returnNum, result.getPrompt(),
							CoreFrameworkConstants.Podium_LVL);
				}
		    }
			
			if(IS_INPUT.equals("Y")){
	    		returnNum=CoreFrameDao.doEngineCall("updateBarcodeJobInstructionStatus",map,result);	    
				if (returnNum != CoreFrameErrorCode.ISUCCESS_CODE) {
					throw new PodiumException(returnNum, result.getPrompt(),
							CoreFrameworkConstants.Podium_LVL);
				}
	    	}
	    	if(IS_OUTPUT.equals("Y")){
	    		returnNum=CoreFrameDao.doEngineCall("updateBarcodeJobInstructionStatus",map,result);	    
				if (returnNum != CoreFrameErrorCode.ISUCCESS_CODE) {
					throw new PodiumException(returnNum, result.getPrompt(),
							CoreFrameworkConstants.Podium_LVL);
				}
	    	}
			
		}
		/*产品 WIP过站    END*/
		sendMap.put("STATE", STATE);
	    sendMap.put("MSG", MSG);
	    sendMap.put("BIND_CODE", BIND_CODE);
	    dataList.add(sendMap);
	    result.setDataList(dataList);
	    result.setFlag("0");
		result.setPrompt("工位过站成功！");
		return returnNum;
	   }
		result.setFlag("0");
		result.setPrompt("业务运行成功");
		return returnNum;
	}
}
