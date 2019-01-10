package com.iPlant.mes.biz.productionSchedule;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.iPlant.frame.biz.podium.basic.CoreFrameDao;
import com.iPlant.frame.biz.podium.exchange.DataExchangeAssembly;
import com.iPlant.frame.config.CoreFrameErrorCode;
import com.iPlant.frame.config.CoreFrameworkConstants;
import com.iPlant.frame.exception.PodiumException;
import com.iPlant.frame.ifs.model.CommonResult;
import com.iPlant.mes.BaseBusiness;

public class ProductionSchedule extends BaseBusiness{
		
		/**
		 * 新工单排产
		 */
		@SuppressWarnings({ "rawtypes", "unchecked"})
		@Override
		public CommonResult execute(DataExchangeAssembly dataExchange) {
			   Map parameter = (Map) dataExchange.getBizData("params");	
			   List list=(List)parameter.get("list");
			   int returnNum=0;
			   CommonResult WONOResult=new CommonResult();
			   Map moMap  = new HashMap();
			   moMap.put("MO_NO", ((Map)list.get(0)).get("MO_NO"));
			   returnNum=CoreFrameDao.doEngineCall("createWO_NOIfno", moMap, WONOResult);
			   if(returnNum!=CoreFrameErrorCode.ISUCCESS_CODE){
						 throw new PodiumException(returnNum, WONOResult.getPrompt(),CoreFrameworkConstants.Podium_LVL);
			   }
			   String WO_NO="";
			   if(WONOResult.getDataList().size()>0&&WONOResult.getDataList()!=null){
				   WO_NO =(String) WONOResult.getDataList().get(0).get("WO_NO");
			   }
			   
			   CommonResult WOResult=new CommonResult();	
			   for(int i=0;i<list.size();i++){
				   Map woMap = new HashMap();
				   woMap.put("WO_NO",           WO_NO);                                      //作业指示
				   woMap.put("FCT_CD",          ((Map) list.get(i)).get("FCT_CD"));			 //工厂编码
				   woMap.put("MO_NO",           ((Map) list.get(i)).get("MO_NO"));			 //工单
				   woMap.put("PROD_TYPE",       ((Map) list.get(i)).get("PROD_TYPE"));		 //工单类型
				   woMap.put("LINE_CD",         ((Map)list.get(i)).get("LINE_CD"));			 //拉线	
				   woMap.put("SHIFT_CD",        ((Map) list.get(i)).get("SHIFT_CD"));		 //班次	
				   woMap.put("PRF_CD",          ((Map)list.get(i)).get("PRF_CD")); 			 //工序
				   woMap.put("WC_CD",           ((Map)list.get(i)).get("WC_CD")); 			 //车间
				   woMap.put("ITEM_CD",         ((Map)list.get(i)).get("ITEM_CD")); 		 //物料编码
				   woMap.put("ITEM_NM",         ((Map)list.get(i)).get("ITEM_NM")); 		 //物料名称
				   woMap.put("ITEM_TYPE",       ((Map)list.get(i)).get("ITEM_TYPE")); 		 //物料类型
				   woMap.put("MU_CD",           ((Map)list.get(i)).get("MU_CD")); 		     //模具代码
				   woMap.put("MODEL_CD",        ((Map)list.get(i)).get("MODEL_CD")); 		 //机型代码
				   woMap.put("MODEL_NM",        ((Map)list.get(i)).get("MODEL_NM")); 		 //机型名称
				   woMap.put("TOP_ITEM_CD",     ((Map)list.get(i)).get("TOP_ITEM_CD")); 	 //成品物料编码
				   woMap.put("UOM",             ((Map)list.get(i)).get("UOM")); 			 //单位
				   woMap.put("UGT_TYPE",        ((Map)list.get(i)).get("UGT_TYPE")); 		 //紧急程度
				   woMap.put("PLAN_STRT_DT",    ((Map)list.get(i)).get("PLAN_STRT_DT")); 	 //作业指示计划开始日期
				   woMap.put("PLAN_END_DT",     ((Map)list.get(i)).get("PLAN_END_DT")); 	 //作业指示计划结束日期
				   woMap.put("PLAN_WRK_TIME",   ((Map)list.get(i)).get("PLAN_WRK_TIME")); 	 //计划工时
				   woMap.put("PLAN_PO_QTY",     ((Map)list.get(i)).get("PLAN_PO_QTY")); 	 //工单计划数
				   woMap.put("PLAN_WO_QTY",     ((Map)list.get(i)).get("PLAN_WO_QTY")); 	 //作业指示计划数
				   //批量插入工单信息			  
				   returnNum=CoreFrameDao.doEngineCall("insertOperationindication", woMap, WOResult);
				   if(returnNum!=CoreFrameErrorCode.ISUCCESS_CODE){
							 throw new PodiumException(returnNum, WOResult.getPrompt(),CoreFrameworkConstants.Podium_LVL);
				   }
				  
					
			   }
			   

			return WOResult;	

		}
}
