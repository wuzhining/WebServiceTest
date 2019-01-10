package com.iPlant.mes.common;

import java.beans.IntrospectionException;
import java.lang.reflect.InvocationTargetException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import com.iPlant.frame.biz.podium.basic.CoreFrameDao;
import com.iPlant.frame.biz.podium.exchange.DataExchangeAssembly;
import com.iPlant.frame.biz.podium.pojo.JsonTreeData;
import com.iPlant.frame.config.CoreFrameErrorCode;
import com.iPlant.frame.config.CoreFrameworkConstants;
import com.iPlant.frame.exception.PodiumException;
import com.iPlant.frame.ifs.model.CommonResult;
import com.iPlant.frame.util.BeanToMapUtil;
import com.iPlant.frame.util.TreeNodeUtil;
import com.iPlant.mes.BaseBusiness;

/**
 * 仓库相关的配置
 * @author Peng
 *
 */
public class WmsStoreTree extends BaseBusiness{

	/**
	 * 查询储区的树形结构
	 * @param dataExchange
	 * @return
	 */
	public CommonResult execute(DataExchangeAssembly dataExchange) {
		Map params = (Map) dataExchange.getBizData("params");
		List<JsonTreeData> treeDataList = new ArrayList<JsonTreeData>();
		CommonResult treeResult = new CommonResult();
		int returnNum = CoreFrameDao.doEngineCall("StoreMenuInfoQuery", params, treeResult);
		if (returnNum != CoreFrameErrorCode.ISUCCESS_CODE) {
			throw new PodiumException(returnNum, treeResult.getPrompt(), CoreFrameworkConstants.Podium_LVL);
		}
		if (treeResult.getDataList() != null && treeResult.getDataList().size() > 0) {

			for (Iterator<Map> iter = treeResult.getDataList().iterator(); iter.hasNext();) {
				Map param = (Map) iter.next();
				JsonTreeData treeData = new JsonTreeData();
				treeData.setsT_C_CD((String) param.get("ST_C_CD"));// 子节点编码
				treeData.setsT_P_CD((String) param.get("ST_P_CD"));// 父节点编码
				treeData.setsT_C_NM((String) param.get("ST_C_NM"));// 子节点名称
				treeDataList.add(treeData);
			}
		}
		// 最后得到结果集
		List<JsonTreeData> newTreeDataList = TreeNodeUtil.getFatherNode(treeDataList);
		List<Map> treeList = new ArrayList<Map>();
		for (JsonTreeData treeData : newTreeDataList) {
			Map mapTree = new HashMap();
			try {
				mapTree = BeanToMapUtil.convertBean(treeData);
			} catch (IntrospectionException e) {
				e.printStackTrace();
			} catch (IllegalAccessException e) {
				e.printStackTrace();
			} catch (InvocationTargetException e) {
				e.printStackTrace();
			}
			treeList.add(mapTree);
		}
		CommonResult result = new CommonResult();
		result.setFlag("0");
		result.setDataList(treeList);
		result.setErrorLvl("0");
		result.setPrompt("查询成功！");
		result.setTimes("0");
		return result;
	}
	
	

}
