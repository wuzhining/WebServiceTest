package com.iPlant.mes.biz.wms;

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
import com.ibm.icu.impl.LinkedHashMap;

/**
 * 仓库单位计算
 * 由于mybaitis循环list的批量更新不可用，故采用此种方法
 * 
 * @author Peng
 *
 */
public class WmsUnit extends BaseBusiness{

	/**
	 * 计量单位更新方法
	 */
	@Override
	public CommonResult execute(DataExchangeAssembly dataExchange) {
		int returnNum = 0;
		Map parameter = (Map) dataExchange.getBizData("params");
		List paramList = (List) parameter.get("list");
		CommonResult result = new CommonResult();
		Map<String, String> valueMap = new HashMap<String, String>();
		if (paramList != null && paramList.size() > 0) {
			for (int i = 0; i < paramList.size(); i++) {
				Map listMap = (Map) paramList.get(i);
				if (listMap.get("UNIT_NAME") != null)
					valueMap.put("UNIT_NAME", (String)listMap.get("UNIT_NAME"));
				if (listMap.get("GROUP_NAME") != null)
					valueMap.put("GROUP_NAME", (String)listMap.get("GROUP_NAME"));
				if (listMap.get("MAIN_UNIT") != null)
					valueMap.put("MAIN_UNIT", (String)listMap.get("MAIN_UNIT"));
				if (listMap.get("ENABLE") != null)
					valueMap.put("ENABLE", (String)listMap.get("ENABLE"));
				if (listMap.get("CHANGE_RATE") != null)
					valueMap.put("CHANGE_RATE", (String)listMap.get("CHANGE_RATE"));
				if (listMap.get("NOTE") != null)
					valueMap.put("NOTE", (String)listMap.get("NOTE"));
				if (listMap.get("UNIT_ID") != null)
					valueMap.put("UNIT_ID", (String)listMap.get("UNIT_ID"));
				returnNum = CoreFrameDao.doEngineCall("unitInfoUpdate", valueMap, result);
				if (returnNum != CoreFrameErrorCode.ISUCCESS_CODE) {
					throw new PodiumException(returnNum, result.getPrompt(),
							CoreFrameworkConstants.Podium_LVL);
				}
			}
		}
		result.setFlag("0");
		result.setDataList(null);
		result.setErrorLvl("0");
		result.setPrompt("查询成功！");
		result.setTimes("0");
		return result;
	}
	
	
}
