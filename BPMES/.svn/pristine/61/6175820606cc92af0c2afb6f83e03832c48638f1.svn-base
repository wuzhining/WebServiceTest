package com.iPlant.mes.biz.basis;

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
import com.iPlant.mes.common.MD5Comm;

public class BasisInfoManage extends BaseBusiness{

	/**
	 * 用户信息插入
	 */
	@SuppressWarnings({ "rawtypes", "unchecked" })
	@Override
	public CommonResult execute(DataExchangeAssembly dataExchange) {
		
		Map parameter = (Map) dataExchange.getBizData("params");
		CommonResult result = new CommonResult();		
			String 	PW = MD5Comm.MD5Encryption((String) parameter.get("PW"));
			parameter.put("PW", PW);
			int returnNum = CoreFrameDao.doEngineCall("insertOpUser", parameter,result);
			if (returnNum != CoreFrameErrorCode.ISUCCESS_CODE) {
				throw new PodiumException(returnNum, result.getPrompt(),
						CoreFrameworkConstants.Podium_LVL);
			}
		return result;
	}

	/**
	 * 用户信息插入
	 */
	@SuppressWarnings({ "rawtypes", "unchecked" })
	public CommonResult executeUpdate(DataExchangeAssembly dataExchange) {
		
		Map parameter = (Map) dataExchange.getBizData("params");
		CommonResult result = new CommonResult();		
			String 	PW = MD5Comm.MD5Encryption((String) parameter.get("PW"));
			parameter.put("PW", PW);
			int returnNum = CoreFrameDao.doEngineCall("updateOpUser", parameter,result);
			if (returnNum != CoreFrameErrorCode.ISUCCESS_CODE) {
				throw new PodiumException(returnNum, result.getPrompt(),
						CoreFrameworkConstants.Podium_LVL);
			}
		return result;

	}
	/**
	 * 派工单类别删除
	 */
	@SuppressWarnings({ "rawtypes", "unchecked" })
	public CommonResult dictionaryItem(DataExchangeAssembly dataExchange) {                 
		Map parameter = (Map) dataExchange.getBizData("params");			  
		   int returnNum=0;	   
		   CommonResult wdResult=new CommonResult();	
		   PodiumResult podium = new PodiumResult();
			   returnNum = CoreFrameDao.doEngineCall("queryOdInfogl", parameter,wdResult);
			   //String DICT_IT=(String)parameter.get("DICT_IT");
			   if (returnNum != CoreFrameErrorCode.ISUCCESS_CODE) {
					throw new PodiumException(returnNum, wdResult.getPrompt(),
							CoreFrameworkConstants.Podium_LVL);
				}
			   if (wdResult.getDataList()!= null && wdResult.getDataList().size() > 0) {		           //判断派工单表是否有此派工单类别编码				    				
				}else {	
					 returnNum=CoreFrameDao.doEngineCall("deleteDictionaryDetail", parameter, wdResult);   //没有则删除
					   if(returnNum!=CoreFrameErrorCode.ISUCCESS_CODE){
						   throw new PodiumException(returnNum, wdResult.getPrompt(),CoreFrameworkConstants.Podium_LVL);
					   }
			  
				
		   }		    
			    List list = new ArrayList();
				podium.setFlag("0");
				podium.setDataList(list);
				podium.setErrorLvl("0");
				podium.setErrorLvl("0");
				podium.setPrompt("派工单表有此编码,无法删除！");	
	
		return podium;	
	}
}
