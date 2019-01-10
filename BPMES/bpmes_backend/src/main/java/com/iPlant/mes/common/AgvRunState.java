package com.iPlant.mes.common;

import java.util.ArrayList;
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

public class AgvRunState extends BaseBusiness {

	@SuppressWarnings({ "unchecked", "rawtypes", "unused" })
	@Override
	public CommonResult execute(DataExchangeAssembly dataExchange) {
		Map params = (Map) dataExchange.getBizData("params");
		int returnNUm = 0;
		List list=(List)params.get("list");
		Map<String,String> map =new HashMap<String,String>();
		String AGV_CD = (String)params.get("AGV_CD");
		String AGV_NM = (String)params.get("AGV_NM");
		String FROM_POINT = (String)params.get("FROM_POINT");
		String CURR_POINT = (String)params.get("CURR_POINT");
		String TO_POINT = (String)params.get("TO_POINT");
		String HADDN_STATE = (String)params.get("HADDN_STATE");
		String RUN_DICT = (String)params.get("RUN_DICT");
		String SPEED = (String)params.get("SPEED");
		String MO = (String)params.get("MO");
		
		
		String SPORT_MIL = (String)params.get("SPORT_MIL");
		String CUR_ELECTR = (String)params.get("CUR_ELECTR");
		String X_ORDIN = (String)params.get("X_ORDIN");
		String Y_ORDIN = (String)params.get("Y_ORDIN");
		
		String IFS   =(String)params.get("IFS");
		map.put("AGV_CD", AGV_CD);
		map.put("AGV_NM", AGV_NM);
		map.put("FROM_POINT", FROM_POINT);
		map.put("CURR_POINT", CURR_POINT);
		map.put("TO_POINT", TO_POINT);
		map.put("HADDN_STATE", HADDN_STATE);
		map.put("RUN_DICT", RUN_DICT);
		map.put("SPEED", SPEED);
		map.put("MO", MO);
		
		map.put("SPORT_MIL", SPORT_MIL);
		map.put("CUR_ELECTR", CUR_ELECTR);
		map.put("X_ORDIN", X_ORDIN);
		map.put("Y_ORDIN", Y_ORDIN);
		
		CommonResult result = new CommonResult();
		returnNUm = CoreFrameDao.doEngineCall("queryAGVRuns", map, result);
		if (returnNUm != CoreFrameErrorCode.ISUCCESS_CODE) {
			throw new PodiumException(returnNUm, result.getPrompt(),
					CoreFrameworkConstants.Podium_LVL);
		}
		if (result.getDataList() != null && result.getDataList().size() > 0) {
			returnNUm = CoreFrameDao.doEngineCall("updateAGVRuns", map, result);
			if (returnNUm != CoreFrameErrorCode.ISUCCESS_CODE) {
				throw new PodiumException(returnNUm, result.getPrompt(),
						CoreFrameworkConstants.Podium_LVL);
			}
			
		}else{
			returnNUm = CoreFrameDao.doEngineCall("insertAGVRuns", map, result);
			if (returnNUm != CoreFrameErrorCode.ISUCCESS_CODE) {
				throw new PodiumException(returnNUm, result.getPrompt(),
						CoreFrameworkConstants.Podium_LVL);
			}
		}
		
		CommonResult boxResult = new CommonResult();
		List  dataList = new ArrayList();
		Map maps = new HashMap();
		maps.put("IFS", IFS);
		dataList.add(maps);
		boxResult.setDataList(dataList);
		boxResult.setFlag("0");
		boxResult.setErrorLvl("0");
		boxResult.setPrompt("查询成功！");
		boxResult.setTimes("0");
		return boxResult;
	}

}
