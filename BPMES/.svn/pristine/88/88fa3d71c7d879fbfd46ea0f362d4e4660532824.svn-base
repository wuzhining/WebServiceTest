package com.iPlant.mes.biz.sparePartManage;

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

public class SparePartManage extends BaseBusiness {

	/**
	 * 备件退还单号生产规则及插入
	 */
	@SuppressWarnings({ "rawtypes", "unchecked" })
	@Override
	public CommonResult execute(DataExchangeAssembly dataExchange) {
		Map parameter = (Map) dataExchange.getBizData("params");
		CommonResult result = new CommonResult();		
		String Rules=(String) CustomizedPropertyPlaceholderConfigurer.getContextProperty("beiJianTuiHuai");
		String nameRules=NameRulesComm.createNameRules(Rules);
		parameter.put("RT_CD", nameRules);
		int returnNum = CoreFrameDao.doEngineCall("insertSpRefund", parameter,result);
		if (returnNum != CoreFrameErrorCode.ISUCCESS_CODE) {			
			throw new PodiumException(returnNum, result.getPrompt(),
					CoreFrameworkConstants.Podium_LVL);
		}
		return result;
	}
	
	/**
	 * 备件报损单号生成规则及插入
	 */
	@SuppressWarnings({ "rawtypes", "unchecked" })
	public CommonResult sparePartsReport(DataExchangeAssembly dataExchange) {
		Map parameter = (Map) dataExchange.getBizData("params");
		CommonResult result = new CommonResult();		
		String Rules=(String) CustomizedPropertyPlaceholderConfigurer.getContextProperty("beiJianBaoSun");
		String nameRules=NameRulesComm.createNameRules(Rules);
		parameter.put("RI_CD", nameRules);															//单据编号
		int returnNum = CoreFrameDao.doEngineCall("insertSpReport", parameter,result);
		if (returnNum != CoreFrameErrorCode.ISUCCESS_CODE) {
			throw new PodiumException(returnNum, result.getPrompt(),
					CoreFrameworkConstants.Podium_LVL);
		}
		Map PartsReport=(Map) dataExchange.getBizData("params");
		int RT_NUM=Integer.parseInt((String) parameter.get("RI_QT"));								//报损数量
		String SP_CD=(String) parameter.get("SP_CD");												//备件编号		
		String RH_CD=(String) parameter.get("RH_CD");        										//库存位置
		PartsReport.put("RT_NUM", RT_NUM);
		PartsReport.put("SP_CD", SP_CD);
		PartsReport.put("RH_CD", RH_CD);
	    returnNum=CoreFrameDao.doEngineCall("updateSpareMainRT2_NUM", PartsReport,result);	    //更新主表库存总数 
		if (returnNum != CoreFrameErrorCode.ISUCCESS_CODE) {
			throw new PodiumException(returnNum, result.getPrompt(),
					CoreFrameworkConstants.Podium_LVL);
		}
		return result;
	}
	
	/**
	 * 备件领用批量插入
	 */
	@SuppressWarnings({ "rawtypes", "unchecked" })
	public CommonResult sparePartsConsume(DataExchangeAssembly dataExchange) {
		Map parameter = (Map) dataExchange.getBizData("params");
		List list=(List)parameter.get("list");
		CommonResult result = new CommonResult();
		int returnNum = 0;
		String Rules=(String) CustomizedPropertyPlaceholderConfigurer.getContextProperty("beiJianLingYong");
		for(int i=0;i<list.size();i++){
			String nameRules=NameRulesComm.createNameRules(Rules);
			parameter.put("RU_CD", nameRules);							//领用单号
			parameter.put("SP_CD", ((Map) list.get(i)).get("SP_CD"));	//备件编码
			parameter.put("US_QT", ((Map) list.get(i)).get("US_QT"));	//领用数量
			parameter.put("RH_CD", ((Map) list.get(i)).get("RH_CD"));	//库存位置
			returnNum = CoreFrameDao.doEngineCall("insertSpUsing", parameter,result);
			if (returnNum != CoreFrameErrorCode.ISUCCESS_CODE) {
				throw new PodiumException(returnNum, result.getPrompt(),
						CoreFrameworkConstants.Podium_LVL);
			}																
		}
		
		for(int i=0;i<list.size();i++){				
			parameter.put("SP_CD", ((Map) list.get(i)).get("SP_CD"));		//备件编码								
			parameter.put("RT_NUM", Integer.parseInt((String) ((Map) list.get(i)).get("US_QT")));		//领用数量
			parameter.put("RH_CD",((Map) list.get(i)).get("RH_CD"));			//库存位置	
			CommonResult  consume = new CommonResult();	
		    returnNum=CoreFrameDao.doEngineCall("updateSpareMainRT2_NUM", parameter,consume);  	//更新主表库存总数 
			if (returnNum != CoreFrameErrorCode.ISUCCESS_CODE) {
				throw new PodiumException(returnNum, consume.getPrompt(),
						CoreFrameworkConstants.Podium_LVL);
			}			
			
		}
		
	/*	for(int i=0;i<list.size();i++){
			parameter.put("RU_CD", ((Map) list.get(i)).get("RU_CD"));		//领用单号
			parameter.put("SP_CD", ((Map) list.get(i)).get("SP_CD"));		//备件编码								
			parameter.put("RT_NUM", Integer.parseInt((String) ((Map) list.get(i)).get("US_QT")));		//领用数量
			parameter.put("RH_CD",((Map) list.get(i)).get("RH_CD"));			//库存位置	
			CommonResult  consume = new CommonResult();	
		    returnNum=CoreFrameDao.doEngineCall("updateSpareMainRT4_NUM", parameter,consume);  	//更新备件领用表领用数量
			if (returnNum != CoreFrameErrorCode.ISUCCESS_CODE) {
				throw new PodiumException(returnNum, consume.getPrompt(),
						CoreFrameworkConstants.Podium_LVL);
			}			
			
		}*/
		return result;
	}
	
	/**
	 * 备件退还批量插入
	 */
	@SuppressWarnings({ "rawtypes", "unchecked"})
	public CommonResult consumesInsert(DataExchangeAssembly dataExchange) {
		   Map parameter = (Map) dataExchange.getBizData("params");	
		   List list=(List)parameter.get("list");
		   int returnNum=0;
		   String Rules=(String) CustomizedPropertyPlaceholderConfigurer.getContextProperty("beiJianTuiHuai");
		   CommonResult consumesResult=new CommonResult();
		   for(int i=0;i<list.size();i++){
			   String nameRules=NameRulesComm.createNameRules(Rules);			  
			   parameter.put("RT_CD", nameRules);                       	//退还单号
			   parameter.put("RT_QT", ((Map) list.get(i)).get("RT_QT"));	//备件退还数量
			   parameter.put("SP_CD", ((Map) list.get(i)).get("SP_CD"));	//备件编码
			   parameter.put("RT_ST", ((Map) list.get(i)).get("RT_ST"));	//使用状态
			   parameter.put("CRT_ID", ((Map) list.get(i)).get("CRT_ID"));	//备件退还人
			   parameter.put("RU_CD", ((Map) list.get(i)).get("RU_CD") ); 	//领用单号
			   parameter.put("RH_CD", ((Map) list.get(i)).get("RH_CD") );   //库位编号
			   returnNum=CoreFrameDao.doEngineCall("insertSpRefund", parameter, consumesResult);
			   if(returnNum!=CoreFrameErrorCode.ISUCCESS_CODE){
				   throw new PodiumException(returnNum, consumesResult.getPrompt(),CoreFrameworkConstants.Podium_LVL);
			   }
		   }
		   for(int i=0;i<list.size();i++){			   
			   parameter.put("SP_CD", ((Map) list.get(i)).get("SP_CD"));
			   parameter.put("RH_CD",((Map) list.get(i)).get("RH_CD"));
			   parameter.put("RT_NUM", Integer.parseInt((String) ((Map) list.get(i)).get("RT_QT")));
			   CommonResult consumes=new CommonResult();
			   returnNum=CoreFrameDao.doEngineCall("updateSpareMainRT_NUM", parameter, consumes);				//更新主表库存总数 
			   if(returnNum!=CoreFrameErrorCode.ISUCCESS_CODE){
				   throw new PodiumException(returnNum, consumes.getPrompt(),CoreFrameworkConstants.Podium_LVL);
			   }
		   }
		   for(int i=0;i<list.size();i++){			   
			   parameter.put("SP_CD", ((Map) list.get(i)).get("SP_CD"));
			   parameter.put("RH_CD",((Map) list.get(i)).get("RH_CD"));
			   parameter.put("RT_NUM", Integer.parseInt((String) ((Map) list.get(i)).get("RT_QT")));
			   parameter.put("RU_CD", ((Map) list.get(i)).get("RU_CD") ); 
			   CommonResult consumes2=new CommonResult();
			   returnNum=CoreFrameDao.doEngineCall("updateSpareMainRT3_NUM", parameter, consumes2);				//更新领用表退还数量
			   if(returnNum!=CoreFrameErrorCode.ISUCCESS_CODE){
				   throw new PodiumException(returnNum, consumes2.getPrompt(),CoreFrameworkConstants.Podium_LVL);
			   }
		   }
		   
		   
		   return consumesResult;
		 
	}
	
	/**
	 * 备件登记单号生成规则及插入
	 */
	@SuppressWarnings({ "rawtypes", "unchecked" })
	public CommonResult spareSpRegistration(DataExchangeAssembly dataExchange) {
		Map parameter = (Map) dataExchange.getBizData("params");
		CommonResult result = new CommonResult();		
		String Rules=(String) CustomizedPropertyPlaceholderConfigurer.getContextProperty("beiJianDengJi");
		String nameRules=NameRulesComm.createNameRules(Rules);
		parameter.put("RS_CD", nameRules); 
		//备件明细表数据插入
		int returnNum = CoreFrameDao.doEngineCall("insertSpRegistration", parameter,result);
		if (returnNum != CoreFrameErrorCode.ISUCCESS_CODE) {
			throw new PodiumException(returnNum, result.getPrompt(),
					CoreFrameworkConstants.Podium_LVL);
		}
		Map SpRegistration = (Map) dataExchange.getBizData("params");
		int RT_NUM=Integer.parseInt((String)parameter.get("RS_QT"));
		String SP_CD=(String)parameter.get("SP_CD");
		String RH_CD=(String)parameter.get("RH_CD");
		SpRegistration.put("RT_NUM",RT_NUM);
		SpRegistration.put("SP_CD",SP_CD);
		SpRegistration.put("RH_CD",RH_CD);
		SpRegistration.put("SP_NM",(String)parameter.get("SP_NM"));
		SpRegistration.put("CRT_ID",(String)parameter.get("RS_EP"));
		CommonResult spResult = new CommonResult();	
		//查询备件主表信息
		returnNum = CoreFrameDao.doEngineCall("querySpareMain", SpRegistration,spResult);			
		if (returnNum != CoreFrameErrorCode.ISUCCESS_CODE) {
			throw new PodiumException(returnNum, spResult.getPrompt(),
					CoreFrameworkConstants.Podium_LVL);
		}
		
		if (spResult.getDataList() != null && spResult.getDataList().size() > 0) {
			returnNum = CoreFrameDao.doEngineCall("updateSpareMainRT_NUM", SpRegistration,result);			//更新主表库存总数 
			if (returnNum != CoreFrameErrorCode.ISUCCESS_CODE) {
				throw new PodiumException(returnNum, result.getPrompt(),
						CoreFrameworkConstants.Podium_LVL);
			}
			
		}else {
			
			returnNum = CoreFrameDao.doEngineCall("insertSpareMain", SpRegistration,result);			//插入备件主表
			if (returnNum != CoreFrameErrorCode.ISUCCESS_CODE) {
				throw new PodiumException(returnNum, result.getPrompt(),
						CoreFrameworkConstants.Podium_LVL);
			}
		}
		return result;
	}
	
}
	

