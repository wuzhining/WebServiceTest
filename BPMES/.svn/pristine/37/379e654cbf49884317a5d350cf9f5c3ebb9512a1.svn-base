package com.iPlant.mes.biz.wms;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import com.iPlant.frame.biz.podium.basic.CoreFrameDao;
import com.iPlant.frame.biz.podium.exchange.DataExchangeAssembly;
import com.iPlant.frame.config.CoreFrameErrorCode;
import com.iPlant.frame.config.CoreFrameworkConstants;
import com.iPlant.frame.exception.PodiumException;
import com.iPlant.frame.ifs.model.CommonResult;
import com.iPlant.mes.BaseBusiness;

public class OrderManage  extends BaseBusiness{
	
	
	@SuppressWarnings({ "rawtypes", "unchecked" })
	@Override
	//新增订单主表
	public CommonResult execute(DataExchangeAssembly dataExchange) {
		//通过主订单编号查找此订单是否已经存在
		Map paraMap = (Map) dataExchange.getBizData("params");
		Object orderId = paraMap.get("ORDER_ID");
		Map mainOrderMap = new HashMap<Object, Object>();
		mainOrderMap.put("ORDER_ID", orderId);
		CommonResult mainOrderResult = new CommonResult();
		int mainOrderNumber = CoreFrameDao.doEngineCall("OrderInfoMainQuery", mainOrderMap, mainOrderResult);
		if (mainOrderNumber != CoreFrameErrorCode.ISUCCESS_CODE) {
			throw new PodiumException(mainOrderNumber, mainOrderResult.getPrompt(),
					CoreFrameworkConstants.Podium_LVL);
		}
		//此主订单没有保存在数据库，可以新增数据
		if (mainOrderResult.getDataList() == null || mainOrderResult.getDataList().size() == 0 || 
				mainOrderResult.getRows() == 0) {
			CoreFrameDao.doEngineCall("OrderInfoMainInsert", paraMap, mainOrderResult);	
		} else { // 否则修改主订单数据
			CoreFrameDao.doEngineCall("OrderInfoMainUpdate", paraMap, mainOrderResult);	
		}
		
		return mainOrderResult;
	}
	
	@SuppressWarnings({ "rawtypes", "unchecked" })
	//删除订单主表与订单详情表
	public CommonResult addOrderDetailInfo(DataExchangeAssembly dataExchange) {
		//通过主订单编号查找此订单是否已经存在
		Map paraMap = (Map) dataExchange.getBizData("params");
		CommonResult mainOrderResult = new CommonResult();
		int mainOrderNumber = -100;
		//保存订单详情数据
		List paramList = (List) paraMap.get("list");
		List updateOrderDetailList = new ArrayList();
		List insertOrderDetailList = new ArrayList();
		Map updateOrderDetailMap = new HashMap();
		Map insertOrderDetailMap = new HashMap();
		if (!paramList.isEmpty()) {
			for(Iterator iter = paramList.iterator(); iter.hasNext(); ) {
				Map orderDetailMap = (Map) iter.next();
				Object detailId = orderDetailMap.get("DETAIL_ID");
				if (detailId == null) {
					insertOrderDetailList.add(orderDetailMap);
				} else {
					updateOrderDetailList.add(orderDetailMap);
				}
			}
		}
		updateOrderDetailMap.put("list", updateOrderDetailList);
		insertOrderDetailMap.put("list", insertOrderDetailList);
		if (!insertOrderDetailList.isEmpty()) {
			CoreFrameDao.doEngineCall("IndentInfoInsert", insertOrderDetailMap, mainOrderResult);
		}
		if (!updateOrderDetailList.isEmpty()) {
			CoreFrameDao.doEngineCall("IndentInfoUpdate", updateOrderDetailMap, mainOrderResult);
		}
		if (mainOrderNumber != CoreFrameErrorCode.ISUCCESS_CODE) {
			throw new PodiumException(mainOrderNumber, mainOrderResult.getPrompt(),
					CoreFrameworkConstants.Podium_LVL);
		}
		return mainOrderResult;
	}
    
	
	@SuppressWarnings({ "rawtypes", "unchecked" })
	//删除订单主表与订单详情表
	public CommonResult deleteOrderInfo(DataExchangeAssembly dataExchange){
		Map parameter = (Map) dataExchange.getBizData("params");  
		CommonResult result = new CommonResult();
		/*parameter.put("ORDER_ID", (String)parameter.get("ORDER_ID"));*/
		int returnNum=CoreFrameDao.doEngineCall("IndentInfoDelete", parameter,result);
		if (returnNum != CoreFrameErrorCode.ISUCCESS_CODE) {
			throw new PodiumException(returnNum, result.getPrompt(),
					CoreFrameworkConstants.Podium_LVL);
		}
		/*Map parameter2 = (Map) dataExchange.getBizData("params");  
		parameter2.put("ORDER_ID", (String)parameter.get("ORDER_ID"));*/
		int returnNum2=CoreFrameDao.doEngineCall("OrderInfoMainDelete", parameter,result);
		if (returnNum2 != CoreFrameErrorCode.ISUCCESS_CODE) {
			throw new PodiumException(returnNum2, result.getPrompt(),
					CoreFrameworkConstants.Podium_LVL);
		}
		return result;
	}
}
