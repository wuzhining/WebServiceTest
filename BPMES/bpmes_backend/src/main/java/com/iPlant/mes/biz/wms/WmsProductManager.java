package com.iPlant.mes.biz.wms;

import java.util.ArrayList;
import java.util.HashMap;
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

public class WmsProductManager  extends BaseBusiness{
	
	
	@SuppressWarnings({ "unchecked", "rawtypes", "unused" })
	@Override
	//新增货架信息
	public CommonResult execute(DataExchangeAssembly dataExchange) {		
		Map parameter = (Map) dataExchange.getBizData("params");
		Map parameterrow = (Map) dataExchange.getBizData("params");
		CommonResult result = new CommonResult(),resultcolumn = new CommonResult(),resultrow = new CommonResult();
		List<Map> shtList = null,colList = null,rowList = null;
		int returnNum = 0,colNum = 0,rowNum = 0,shtSize=0,colSize=0,rowSize=0,rowId = 0,columnId = 0;
		
		Map shtMap = null,colMap=null,rowMap=null,resultMap = new HashMap();
		String shtId = null,shtName = null,status = null;
		
		StringBuffer resStr = new StringBuffer();
		returnNum = CoreFrameDao.doEngineCall("wms_shelf_List", parameter,result); //成品仓初始化信息
		shtSize = result.getDataList().size();
		if(shtSize>0){
			shtList = result.getDataList();
			resStr.append("{'GoodShelf':[");
			for(int n=0;n<shtSize;n++){
				shtMap = shtList.get(n);
				shtId = shtMap.get("SHELF_ID").toString();
				shtName = shtMap.get("SHELF_NAME").toString();
				parameter.put("shelf_id", shtId);
				colNum = CoreFrameDao.doEngineCall("wms_columns_List", parameter,resultcolumn); //成品仓初始化信息
				colSize = resultcolumn.getDataList().size();
				resStr.append("{'GoodTrack': [");
				if(colSize>0){
					colList = resultcolumn.getDataList();
					for(int c=0;c<colSize;c++){
						colMap = colList.get(c);
						parameterrow.put("shelf_id", shtId);
						columnId = Integer.parseInt(colMap.get("COLUMN_ID").toString());
						parameterrow.put("column_id", columnId);
						rowNum = CoreFrameDao.doEngineCall("wms_rows_List", parameterrow,resultrow); //成品仓初始化信息
						rowSize = resultrow.getDataList().size();
						rowList = resultrow.getDataList();
						resStr.append("{'GoodLocation': [");
						if(rowSize>0){
							for(int r=0;r<rowSize;r++){
								rowMap = rowList.get(r);
								rowId = Integer.parseInt(rowMap.get("ROW_ID").toString());
								status = this.getPositionColor(rowMap.get("STATUS").toString());
								if(r==(rowSize-1)){
									resStr.append("{'LocationName': '层"+rowId+"','LocationStatusColor': '"+status+"'}");
								}else{
									resStr.append("{'LocationName': '层"+rowId+"','LocationStatusColor': '"+status+"'},");
								}
							}
						}
						if(c==(colSize-1)){
							resStr.append("],'TrackName': '"+columnId+"位'}");
						}else{
							resStr.append("],'TrackName': '"+columnId+"位'},");
						}
					}
				}
				if(n==(shtSize-1)){
					resStr.append("],'ShelfName': '"+shtName+"货架'}");
				}else{
					resStr.append("],'ShelfName': '"+shtName+"货架'},");
				}
			}
			resStr.append("]}"); 
			System.err.println("resultStr=="+resStr.toString());
			resultMap.put("resultStr", resStr.toString());
			if (returnNum != CoreFrameErrorCode.ISUCCESS_CODE) {
				throw new PodiumException(returnNum, result.getPrompt(),CoreFrameworkConstants.Podium_LVL);
			}
			if (colNum != CoreFrameErrorCode.ISUCCESS_CODE) {
				throw new PodiumException(colNum, resultcolumn.getPrompt(),CoreFrameworkConstants.Podium_LVL);
			}
			if (rowNum != CoreFrameErrorCode.ISUCCESS_CODE) {
				throw new PodiumException(rowNum, resultrow.getPrompt(),CoreFrameworkConstants.Podium_LVL);
			}
			
		}
		
		PodiumResult podium=new PodiumResult();
		List  dataList = new ArrayList();
		dataList.add(resultMap);
		podium.setDataList(dataList);
		podium.setFlag("0");
		podium.setErrorLvl("0");
		podium.setPrompt("查询成功！");
		podium.setTimes("0");
		return podium;
	}
	
	public String getPositionColor(String status) {
		String color = null;
		if(status!=null && status.length()>0){
			if(status.equals("PST01.00")){
				color = "#FFFFFF";
			}else if(status.equals("PST01.01")){
				color = "#00ff00";
			}else if(status.equals("PST01.02")){
				color = "#DD5044";
			}else if(status.equals("PST01.03")){
				color = "#B766AD";
			}
		}else{
			color = "#FFFFFF";
		}
		return color;
	}
}
