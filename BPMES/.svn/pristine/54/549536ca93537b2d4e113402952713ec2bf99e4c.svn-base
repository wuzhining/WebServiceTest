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
import com.iPlant.frame.config.CustomizedPropertyPlaceholderConfigurer;
import com.iPlant.frame.exception.PodiumException;
import com.iPlant.frame.ifs.model.CommonResult;
import com.iPlant.mes.BaseBusiness;

public class WMSshelf  extends BaseBusiness{
	
	
	@SuppressWarnings({ "rawtypes", "unchecked" })
	@Override
	//新增货架信息
	public CommonResult execute(DataExchangeAssembly dataExchange) {		
		Map parameter = (Map) dataExchange.getBizData("params");
		List list=(List)parameter.get("list");
		CommonResult result = new CommonResult();
		int returnNum = 0;		
		for(int i=0;i<list.size();i++){			
			parameter.put("SHELF_ID", ((Map) list.get(i)).get("SHELF_ID"));	//货架编号
			parameter.put("SHELF_NAME", ((Map) list.get(i)).get("SHELF_NAME"));	//货架名称
			parameter.put("STORE_ID", ((Map) list.get(i)).get("STORE_ID"));	//储区ID
			parameter.put("STORE_NAME", ((Map) list.get(i)).get("STORE_NAME"));	//储区名称
			parameter.put("LAYER_NUMBER", ((Map) list.get(i)).get("LAYER_NUMBER"));	//货架层数
			parameter.put("COL_NUMBER", ((Map) list.get(i)).get("COL_NUMBER"));	//货架列数
			parameter.put("POSITION_NUMBER", ((Map) list.get(i)).get("POSITION_NUMBER"));	//货位数量
			parameter.put("BARCODE", ((Map) list.get(i)).get("BARCODE"));	//条码
			parameter.put("ENABLE", ((Map) list.get(i)).get("ENABLE"));	//是否启用
			parameter.put("NOTE", ((Map) list.get(i)).get("NOTE"));	//备注
			parameter.put("SHELF_TYPE", ((Map) list.get(i)).get("SHELF_TYPE"));	//货架类型
			returnNum = CoreFrameDao.doEngineCall("GoodsShelfInfoInsert", parameter,result); //新增货架信息
			if (returnNum != CoreFrameErrorCode.ISUCCESS_CODE) {
				throw new PodiumException(returnNum, result.getPrompt(),
						CoreFrameworkConstants.Podium_LVL);
			}																
		}
		for(int i=0;i<list.size();i++){				
			parameter.put("SHELFID", ((Map) list.get(i)).get("SHELF_ID"));			//货架编号
			parameter.put("SHELFNAME", ((Map) list.get(i)).get("SHELF_NAME"));		//货架名称											
			parameter.put("ROWNUM",((Map) list.get(i)).get("LAYER_NUMBER"));			//货架层数
			parameter.put("COLNUM",((Map) list.get(i)).get("COL_NUMBER"));			//货架列数					
			CommonResult  consume = new CommonResult();	
		    returnNum=CoreFrameDao.doEngineCall("initShelfPosition", parameter,consume);  	//初始化货位信息 
			if (returnNum != CoreFrameErrorCode.ISUCCESS_CODE) {
				throw new PodiumException(returnNum, consume.getPrompt(),
						CoreFrameworkConstants.Podium_LVL);
			}			
			
		}
		return result;
	}
	
	
}
