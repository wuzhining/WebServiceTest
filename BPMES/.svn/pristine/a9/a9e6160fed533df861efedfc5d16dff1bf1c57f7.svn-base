package com.iPlant.mes.common;

import java.util.HashMap;
import java.util.Map;

import com.iPlant.frame.biz.podium.basic.CoreFrameDao;
import com.iPlant.frame.config.CoreFrameErrorCode;
import com.iPlant.frame.config.CoreFrameworkConstants;
import com.iPlant.frame.exception.PodiumException;
import com.iPlant.frame.ifs.model.CommonResult;

public class NameRulesComm {

	/**
	 * lipl  智慧版单据命名规则生成器
	 * @param nameRules
	 * @return
	 */
	@SuppressWarnings({ "unchecked", "rawtypes" })
	public static String createNameRules(String nameRules){
		String nameRule="";
		Map  requestMap = new HashMap();
		requestMap.put("NAME_RULES", nameRules);
		requestMap.put("SEQ_NAME", nameRules+"_SEQ.NEXTVAL");
		CommonResult nameRulesResult = new CommonResult();		
		int returnNum = CoreFrameDao.doEngineCall("CREATE_NAME_RULES",requestMap,nameRulesResult);
		if (returnNum != CoreFrameErrorCode.ISUCCESS_CODE) {
			throw new PodiumException(returnNum, nameRulesResult.getPrompt(),
					CoreFrameworkConstants.Podium_LVL);
		}
		if (nameRulesResult.getDataList() != null && nameRulesResult.getDataList().size() > 0) {
			nameRule=(String) nameRulesResult.getDataList().get(0).get("C_RESULT");
		}
		return nameRule;
	}
	
	
	/**
	 * lipl  序列执行器
	 * @param nameRules
	 * @return
	 */
	@SuppressWarnings({ "unchecked", "rawtypes" })
	public static int createSeq(String nameRules){
		int nameRule=0;
		Map  requestMap = new HashMap();
		requestMap.put("SEQ_NAME", nameRules+"_SEQ");
		CommonResult nameRulesResult = new CommonResult();		
		int returnNum = CoreFrameDao.doEngineCall("CREATE_SEQ",requestMap,nameRulesResult);
		if (returnNum != CoreFrameErrorCode.ISUCCESS_CODE) {
			throw new PodiumException(returnNum, nameRulesResult.getPrompt(),
					CoreFrameworkConstants.Podium_LVL);
		}
		
		if (nameRulesResult.getDataList() != null && nameRulesResult.getDataList().size() > 0) {
			Map map = new HashMap();
			map.putAll(nameRulesResult.getDataList().get(0));
			Object ob = map.get("SEQ");
			nameRule=Integer.parseInt(ob.toString());
		}
		return nameRule;
	}
}
