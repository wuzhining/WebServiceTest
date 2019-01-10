package com.iPlant.mes.common;

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

public class ForeachInsertFun extends BaseBusiness{

	/**
	 * 有Sequences的循环新增
	 * @param dataExchange
	 * @return
	 */
	@SuppressWarnings({ "rawtypes", "unchecked" })
	public CommonResult foreachList(DataExchangeAssembly dataExchange)  {
		Map params = (Map) dataExchange.getBizData("params");
		int returnNUm = 0;
		List list=(List)params.get("list");
		String FUN = (String)params.get("FUN");	
		CommonResult result = new CommonResult();
		for (Iterator<Map> iter =list.iterator(); iter.hasNext();) {
			Map param = (Map) iter.next();
			try {
				returnNUm = CoreFrameDao.doEngineCall(FUN, param, result);
				if (returnNUm != CoreFrameErrorCode.ISUCCESS_CODE) {
					throw new PodiumException(returnNUm, result.getPrompt(),
							CoreFrameworkConstants.Podium_LVL);
				}
			} catch (Exception e) {
				e.printStackTrace();
			
			}
		}
		CommonResult boxResult = new CommonResult();
		boxResult.setFlag("0");
		boxResult.setErrorLvl("0");
		boxResult.setPrompt("业务执行成功！");
		boxResult.setTimes("0");
		return boxResult;
	}

	@Override
	public CommonResult execute(DataExchangeAssembly dataExchange) {
		// TODO Auto-generated method stub
		return null;
	}
}
