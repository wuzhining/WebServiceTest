package com.iPlant.mes.biz.workOrderManage;


import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import com.iPlant.frame.biz.podium.PodiumResult;
import com.iPlant.frame.biz.podium.basic.CoreFrameDao;
import com.iPlant.frame.biz.podium.exchange.DataExchangeAssembly;
import com.iPlant.frame.config.CoreFrameErrorCode;
import com.iPlant.frame.config.CoreFrameworkConstants;
import com.iPlant.frame.exception.PodiumException;
import com.iPlant.frame.ifs.model.CommonResult;
import com.iPlant.mes.BaseBusiness;

public class WorkOrderManage extends BaseBusiness{
	
	/**
	 * 派工信息批量新增
	 */
	@SuppressWarnings({ "rawtypes", "unchecked"})
	@Override
	public CommonResult execute(DataExchangeAssembly dataExchange) {
		   Map parameter = (Map) dataExchange.getBizData("params");	
		   List list=(List)parameter.get("list");
		   int returnNum=0;
//		   String Rules=(String) CustomizedPropertyPlaceholderConfigurer.getContextProperty("paiGongDanHao");		   
		   CommonResult wdResult=new CommonResult();	
		   for(int i=0;i<list.size();i++){
//			   int nameRules=NameRulesComm.createSeq(Rules);
			   parameter.put("DO_CD", parameter.get("DO_CD"));                       			//派工单号
			   parameter.put("PT_CD", ((Map) list.get(i)).get("PT_CD"));			//物料编码
			   parameter.put("PT_NM", ((Map) list.get(i)).get("PT_NM"));			//物料编码
			   parameter.put("MO_CD", ((Map) list.get(i)).get("MO_CD"));			//工单号
			   parameter.put("MO_NUM", ((Map)list.get(i)).get("MO_NUM"));			//工单数量	
			   parameter.put("DO_NUM", ((Map) list.get(i)).get("DO_NUM"));			//派工数量	
			   parameter.put("PT_NUM", ((Map)list.get(i)).get("PT_NUM")); 			//产品出数
			   //批量插入工单信息			  
			   returnNum=CoreFrameDao.doEngineCall("insertOdInfo", parameter, wdResult);
			   if(returnNum!=CoreFrameErrorCode.ISUCCESS_CODE){
						 throw new PodiumException(returnNum, wdResult.getPrompt(),CoreFrameworkConstants.Podium_LVL);
			   }
			  
				
		   }
		   

		return wdResult;	

	}
	/**
	 * 删除工单信息
	 * @param yuzq
	 * @return
	 */
	@SuppressWarnings({ "rawtypes", "unchecked"})
	public CommonResult executeDelete(DataExchangeAssembly dataExchange) {
		   Map parameter = (Map) dataExchange.getBizData("params");	
		   CommonResult wdResult=new CommonResult();	
		   PodiumResult podium=new PodiumResult();
		   int returnNum=0;
		   returnNum=CoreFrameDao.doEngineCall("queryCheckOd", parameter, wdResult);
		   if(returnNum!=CoreFrameErrorCode.ISUCCESS_CODE){
				 throw new PodiumException(returnNum, wdResult.getPrompt(),CoreFrameworkConstants.Podium_LVL);
	       }
		   if (wdResult.getDataList()!= null && wdResult.getDataList().size() > 0) {	//判断已审核派工单表是否在生产
			    List list = new ArrayList();
	 			podium.setFlag("0");
	 			podium.setDataList(list);
	 			podium.setErrorLvl("0");
	 			podium.setErrorLvl("0");
	 			podium.setPrompt("派工单已生产，无法删除！");
	 			return podium;  	
			   
         }else{
        	 returnNum=CoreFrameDao.doEngineCall("deleteOdInfo", parameter, wdResult);   //没有则删除     
        	 if(returnNum!=CoreFrameErrorCode.ISUCCESS_CODE){	 			   	
  			   throw new PodiumException(returnNum, wdResult.getPrompt(),CoreFrameworkConstants.Podium_LVL);
  			   
  		   }
        	 	List list = new ArrayList();
	 			podium.setFlag("0");
	 			podium.setDataList(list);
	 			podium.setErrorLvl("0");
	 			podium.setErrorLvl("0");
	 			podium.setPrompt("删除成功！");
        	    		
         } 
		   
		   return podium;  		
	}
}