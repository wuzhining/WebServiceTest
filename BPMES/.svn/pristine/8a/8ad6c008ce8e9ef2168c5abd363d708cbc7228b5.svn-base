package com.iPlant.mes.biz.wms;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.iPlant.frame.biz.podium.PodiumResult;
import com.iPlant.frame.biz.podium.basic.CoreFrameDao;
import com.iPlant.frame.biz.podium.exchange.DataExchangeAssembly;
import com.iPlant.frame.ifs.model.CommonResult;
import com.iPlant.mes.BaseBusiness;

public class WmsOfMsr extends BaseBusiness{

	@SuppressWarnings({ "rawtypes", "unchecked" })
	@Override
	//MSR入库
	public CommonResult execute(DataExchangeAssembly dataExchange) {
		Map paraMap = (Map) dataExchange.getBizData("params");
		Object Did = paraMap.get("DID");
		Object TowerNo = paraMap.get("TowerNo");
		Object PositionCode = paraMap.get("PositionCode");
		Map mainOrderMap = new HashMap<Object, Object>();
		mainOrderMap.put("DID", Did);
		mainOrderMap.put("TowerNo", TowerNo);
		mainOrderMap.put("PositionCode", PositionCode);
		PodiumResult mainOrderResult = new PodiumResult();
		int mainOrderNumber = CoreFrameDao.doEngineCall("CheckinByMSR", mainOrderMap, mainOrderResult);
		List<Map> shtList = null;
		Map shtMap = null;
		StringBuffer resStr = new StringBuffer();
		int intSize=mainOrderResult.getDataList().size();
		if(intSize>0){
			shtList = mainOrderResult.getDataList();
			resStr.append("{'Return_Code':");
			for(int n=0;n<intSize;n++){
				shtMap = shtList.get(n);
				resStr.append("'"+shtMap.get("RETURN_CODE")+"',");
				resStr.append("'Return_Msg':");
				resStr.append("'"+shtMap.get("RESULT_MSG")+"',");
				resStr.append("'DELIVERY_IN':[{");
				resStr.append("'DID':");
				resStr.append("'"+shtMap.get("DID")+"',");
				resStr.append("'TowerNo':");
				resStr.append("'"+shtMap.get("TOWERNO")+"',");
				resStr.append("'PositionCode':");
				resStr.append("'"+shtMap.get("POSITIONCODE")+"',");
				resStr.append("'Result_Code':");
				resStr.append("'"+shtMap.get("RESULT_CODE")+"',");
				resStr.append("'Result_Msg':");
				resStr.append("'"+shtMap.get("RESULT_MSG")+"',");
				resStr.append("'isCheckPass':");
				resStr.append("'"+shtMap.get("ISCHECKPASS")+"',");
				resStr.append("'isSaveCommit':");
				resStr.append("'"+shtMap.get("ISSAVECOMMIT")+"',");
				resStr.append("'BYD_PN':");
				resStr.append("'"+shtMap.get("BYD_PN")+"',");
				resStr.append("'WCode':");
				resStr.append("'"+shtMap.get("WCODE")+"',");
				resStr.append("'Qty':");
				resStr.append("'"+shtMap.get("QTY")+"',");
				resStr.append("'Lot_Code':");
				resStr.append("'"+shtMap.get("LOT_CODE")+"',");
				resStr.append("'Date_Code':");
				resStr.append("'"+shtMap.get("DATE_CODE")+"',");
				resStr.append("'PO':");
				resStr.append("'"+shtMap.get("PO")+"'}]}");
			}
			
		}
		Map resultMap = new HashMap();
		resultMap.put("DELIVERY_IN_RETURN", resStr.toString());
		List  dataList = new ArrayList();
		dataList.add(resultMap);
		PodiumResult mainOrderResults=new PodiumResult();
		//CommonResult mainOrderResults = new CommonResult();
		mainOrderResults.setDataList(dataList);
		mainOrderResults.setFlag("0");
		mainOrderResults.setErrorLvl("0");
		mainOrderResults.setPrompt("调用成功！");
		mainOrderResults.setTimes("0");
		return mainOrderResults;
	}
	
	@SuppressWarnings({ "rawtypes", "unchecked" })
	//MSR出库
	public CommonResult checkOut(DataExchangeAssembly dataExchange) {
		Map paraMap = (Map) dataExchange.getBizData("params");
		Object Did = paraMap.get("DID");
		Object workOrderNo = paraMap.get("Work_Order_No");
		Object stationCode = paraMap.get("Station_Code");
		Object deliveryType = paraMap.get("Delivery_Type");
		Object seqID = paraMap.get("Seq_ID");
		Object lineCode = paraMap.get("Line_Code");
		Object bydPn = paraMap.get("BYD_PN");
		Object callQty = paraMap.get("CALL_QTY");
		Map mainOrderMap = new HashMap<Object, Object>();
		mainOrderMap.put("DID", Did);
		PodiumResult mainOrderResult = new PodiumResult();
		int mainOrderNumber = CoreFrameDao.doEngineCall("CheckOutByMSR", mainOrderMap, mainOrderResult);
		List<Map> shtList = null;
		Map shtMap = null;
		StringBuffer resStr = new StringBuffer();
		int intSize=mainOrderResult.getDataList().size();
		if(intSize>0){
			shtList = mainOrderResult.getDataList();
			resStr.append("{'Result_Code':");
			for(int n=0;n<intSize;n++){
				shtMap = shtList.get(n);
				resStr.append("'"+shtMap.get("RESULT_CODE")+"',");
				resStr.append("'Result_Msg':");
				resStr.append("'"+null+"',");
				resStr.append("'DID':");
				resStr.append("'"+Did+"',");
				resStr.append("'Work_Order_No':");
				resStr.append("'"+workOrderNo+"',");
				resStr.append("'Station_Code':");
				resStr.append("'"+stationCode+"',");
				resStr.append("'ContainerNo':");
				resStr.append("'1',");
				resStr.append("'Delivery_Type':");
				resStr.append("'"+deliveryType+"'");
				resStr.append("}");
			}
			
		}
		Map resultMap = new HashMap();
		resultMap.put("Delivery_Out_Result", resStr.toString());
		List  dataList = new ArrayList();
		dataList.add(resultMap);
		PodiumResult mainOrderResults=new PodiumResult();
		mainOrderResults.setDataList(dataList);
		mainOrderResults.setFlag("0");
		mainOrderResults.setErrorLvl("0");
		mainOrderResults.setPrompt("调用成功！");
		mainOrderResults.setTimes("0");	
		return mainOrderResults;
	}

}
