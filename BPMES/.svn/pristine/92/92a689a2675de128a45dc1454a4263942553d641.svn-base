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
/**
 * 
 * @author lipl
 *
 */
public class ImesTreeNode {

	/**
	 * 部门树结构
	 * @param dataExchange
	 * @return
	 */
	@SuppressWarnings({ "rawtypes" })
	public CommonResult  execute(DataExchangeAssembly dataExchange) {
		Map params = (Map) dataExchange.getBizData("params");
		 List<JsonTreeData> treeDataList = new ArrayList<JsonTreeData>();
		CommonResult treeResult = new CommonResult();		
		int returnNum = CoreFrameDao.doEngineCall("querySysDptTree", params, treeResult);
		if (returnNum != CoreFrameErrorCode.ISUCCESS_CODE) {
			throw new PodiumException(returnNum, treeResult.getPrompt(),
					CoreFrameworkConstants.Podium_LVL);
		}
				if (treeResult.getDataList() != null && treeResult.getDataList().size() > 0) {
					
					for (Iterator<Map> iter = treeResult.getDataList().iterator(); iter.hasNext();) {
						Map param = (Map) iter.next();
						 JsonTreeData treeData = new JsonTreeData();
						 treeData.setsT_C_CD((String) param.get("ST_C_CD"));//子节点编码
						 treeData.setsT_P_CD((String) param.get("ST_P_CD"));//父节点编码
						 treeData.setsT_C_NM((String) param.get("ST_C_NM"));//子节点名称
						 treeDataList.add(treeData);
					}
				}
		//最后得到结果集
        List<JsonTreeData> newTreeDataList = TreeNodeUtil.getFatherNode(treeDataList);
        List<Map>  treeList = new ArrayList<Map>();
        for(JsonTreeData treeData:newTreeDataList){
        	Map mapTree = new HashMap();
        	try {
				mapTree=BeanToMapUtil.convertBean(treeData);
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
	
	
	/**
	 * 设备树结构
	 * @param dataExchange
	 * @return
	 */
	@SuppressWarnings({ "rawtypes" })
	public CommonResult  sheBeiExecute(DataExchangeAssembly dataExchange) {
		Map params = (Map) dataExchange.getBizData("params");
		 List<JsonTreeData> treeDataList = new ArrayList<JsonTreeData>();
		CommonResult treeResult = new CommonResult();		
		int returnNum = CoreFrameDao.doEngineCall("querySysSheBeiTree", params, treeResult);
		if (returnNum != CoreFrameErrorCode.ISUCCESS_CODE) {
			throw new PodiumException(returnNum, treeResult.getPrompt(),
					CoreFrameworkConstants.Podium_LVL);
		}
				if (treeResult.getDataList() != null && treeResult.getDataList().size() > 0) {
					
					for (Iterator<Map> iter = treeResult.getDataList().iterator(); iter.hasNext();) {
						Map param = (Map) iter.next();
						 JsonTreeData treeData = new JsonTreeData();
						 treeData.setsT_C_CD((String) param.get("ST_C_CD"));//子节点编码
						 treeData.setsT_P_CD((String) param.get("ST_P_CD"));//父节点编码
						 treeData.setsT_C_NM((String) param.get("ST_C_NM"));//子节点名称
						 treeDataList.add(treeData);
					}
				}
		//最后得到结果集
        List<JsonTreeData> newTreeDataList = TreeNodeUtil.getFatherNode(treeDataList);
        List<Map>  treeList = new ArrayList<Map>();
        for(JsonTreeData treeData:newTreeDataList){
        	Map mapTree = new HashMap();
        	try {
				mapTree=BeanToMapUtil.convertBean(treeData);
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
	
	/**
	 * 报警项树结构
	 * @param dataExchange
	 * @return
	 */
	@SuppressWarnings({ "rawtypes" })
	public CommonResult  alarmTreeExecute(DataExchangeAssembly dataExchange) {
		Map params = (Map) dataExchange.getBizData("params");
		 List<JsonTreeData> treeDataList = new ArrayList<JsonTreeData>();
		CommonResult treeResult = new CommonResult();		
		int returnNum = CoreFrameDao.doEngineCall("querySysAlarmTree", params, treeResult);
		if (returnNum != CoreFrameErrorCode.ISUCCESS_CODE) {
			throw new PodiumException(returnNum, treeResult.getPrompt(),
					CoreFrameworkConstants.Podium_LVL);
		}
				if (treeResult.getDataList() != null && treeResult.getDataList().size() > 0) {
					
					for (Iterator<Map> iter = treeResult.getDataList().iterator(); iter.hasNext();) {
						Map param = (Map) iter.next();
						 JsonTreeData treeData = new JsonTreeData();
						 treeData.setsT_C_CD((String) param.get("ST_C_CD"));//子节点编码
						 treeData.setsT_P_CD((String) param.get("ST_P_CD"));//父节点编码
						 treeData.setsT_C_NM((String) param.get("ST_C_NM"));//子节点名称
						 treeData.setAttr1((String) param.get("ATTR1"));
						 String temp =(String)param.get("ATTR2");
						 if(temp != null){
							 String arry[] = temp.split("_");
							 if(arry.length == 2){
								 treeData.setAttr2(arry[0]); 
								 treeData.setAttr3(arry[1]); 
							 }else if(arry.length == 3){
								 treeData.setAttr2(arry[0]); 
								 treeData.setAttr3(arry[1]); 
								 treeData.setAttr4(arry[2]); 
							 }else if(arry.length == 4){
								 treeData.setAttr2(arry[0]); 
								 treeData.setAttr3(arry[1]); 
								 treeData.setAttr4(arry[2]); 
								 treeData.setAttr5(arry[3]); 
							 }
								 
						 }else{
							 treeData.setAttr2((String) param.get("ATTR2"));
						 }
						 treeDataList.add(treeData);
					}
				}
		//最后得到结果集
        List<JsonTreeData> newTreeDataList = TreeNodeUtil.getFatherNode(treeDataList);
        List<Map>  treeList = new ArrayList<Map>();
        for(JsonTreeData treeData:newTreeDataList){
        	Map mapTree = new HashMap();
        	try {
				mapTree=BeanToMapUtil.convertBean(treeData);
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
	
	
	
	
	
	/**
	 * 维修原因树结构
	 * @param dataExchange
	 * @return
	 */
	@SuppressWarnings({ "rawtypes" })
	public CommonResult maintenanceReason(DataExchangeAssembly dataExchange) {
		Map params = (Map) dataExchange.getBizData("params");
		 List<JsonTreeData> treeDataList = new ArrayList<JsonTreeData>();
		CommonResult treeResult = new CommonResult();		
		int returnNum = CoreFrameDao.doEngineCall("search_MaintenanceReasonFramework", params, treeResult);
		if (returnNum != CoreFrameErrorCode.ISUCCESS_CODE) {
			throw new PodiumException(returnNum, treeResult.getPrompt(),
					CoreFrameworkConstants.Podium_LVL);
		}
				if (treeResult.getDataList() != null && treeResult.getDataList().size() > 0) {
					
					for (Iterator<Map> iter = treeResult.getDataList().iterator(); iter.hasNext();) {
						 Map param = (Map) iter.next();
						 JsonTreeData treeData = new JsonTreeData();
						 treeData.setsT_C_CD((String) param.get("ST_C_CD"));//子节点编码
						 treeData.setsT_P_CD((String) param.get("ST_P_CD"));//父节点编码
						 treeData.setsT_C_NM((String) param.get("ST_C_NM"));//子节点名称
						 treeData.setAttr((String) param.get("ST_P_NM"));
						 treeDataList.add(treeData);
					}
				}
		//最后得到结果集
        List<JsonTreeData> newTreeDataList = TreeNodeUtil.getFatherNode(treeDataList);
        List<Map>  treeList = new ArrayList<Map>();
        for(JsonTreeData treeData:newTreeDataList){
        	Map mapTree = new HashMap();
        	try {
				mapTree=BeanToMapUtil.convertBean(treeData);
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
	
	/**
	 * 维修原因树结构
	 * @param dataExchange
	 * @return
	 */
	@SuppressWarnings({ "rawtypes" })
	public CommonResult faultCodeFramework(DataExchangeAssembly dataExchange) {
		Map params = (Map) dataExchange.getBizData("params");
		 List<JsonTreeData> treeDataList = new ArrayList<JsonTreeData>();
		CommonResult treeResult = new CommonResult();		
		int returnNum = CoreFrameDao.doEngineCall("search_FaultCodeFramework", params, treeResult);
		if (returnNum != CoreFrameErrorCode.ISUCCESS_CODE) {
			throw new PodiumException(returnNum, treeResult.getPrompt(),
					CoreFrameworkConstants.Podium_LVL);
		}
				if (treeResult.getDataList() != null && treeResult.getDataList().size() > 0) {
					
					for (Iterator<Map> iter = treeResult.getDataList().iterator(); iter.hasNext();) {
						 Map param = (Map) iter.next();
						 JsonTreeData treeData = new JsonTreeData();
						 treeData.setsT_C_CD((String) param.get("ST_C_CD"));//子节点编码
						 treeData.setsT_P_CD((String) param.get("ST_P_CD"));//父节点编码
						 treeData.setsT_C_NM((String) param.get("ST_C_NM"));//子节点名称
						 treeData.setAttr((String) param.get("ST_P_NM"));   //父节点名称
						 treeDataList.add(treeData);
					}
				}
		//最后得到结果集
        List<JsonTreeData> newTreeDataList = TreeNodeUtil.getFatherNode(treeDataList);
        List<Map>  treeList = new ArrayList<Map>();
        for(JsonTreeData treeData:newTreeDataList){
        	Map mapTree = new HashMap();
        	try {
				mapTree=BeanToMapUtil.convertBean(treeData);
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
	
	
	
	/**
	 * 维修方法树结构
	 * 
	 * @param dataExchange
	 * @return
	 */
	@SuppressWarnings({ "rawtypes" })
	public CommonResult maintenanceMethodsTreeExecute(DataExchangeAssembly dataExchange) {
		Map params = (Map) dataExchange.getBizData("params");
		List<JsonTreeData> treeDataList = new ArrayList<JsonTreeData>();
		CommonResult treeResult = new CommonResult();
		int returnNum = CoreFrameDao.doEngineCall("queryMaintenanceMethodsTree", params, treeResult);
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
	
	/**
	 * 缺陷代码树结构
	 * 
	 * @param dataExchange
	 * @return
	 */
	@SuppressWarnings({ "rawtypes" })
	public CommonResult DefectcodeTreeTreeExecute(DataExchangeAssembly dataExchange) {
		Map params = (Map) dataExchange.getBizData("params");
		List<JsonTreeData> treeDataList = new ArrayList<JsonTreeData>();
		CommonResult treeResult = new CommonResult();
		int returnNum = CoreFrameDao.doEngineCall("queryDefectcodeTree", params, treeResult);
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
	
	
	/**
	 * 查询抽检项目树结构
	 * @param dataExchange
	 * @return
	 */
	@SuppressWarnings({ "rawtypes" })
	public CommonResult samplingProjectTree(DataExchangeAssembly dataExchange) {
		Map params = (Map) dataExchange.getBizData("params");
		List<JsonTreeData> treeDataList = new ArrayList<JsonTreeData>();
		CommonResult treeResult = new CommonResult();		
		int returnNum = CoreFrameDao.doEngineCall("querySamplingProjectTree", params, treeResult);
		if (returnNum != CoreFrameErrorCode.ISUCCESS_CODE) {
			throw new PodiumException(returnNum, treeResult.getPrompt(),
					CoreFrameworkConstants.Podium_LVL);
		}
				if (treeResult.getDataList() != null && treeResult.getDataList().size() > 0) {
					
					for (Iterator<Map> iter = treeResult.getDataList().iterator(); iter.hasNext();) {
						 Map param = (Map) iter.next();
						 JsonTreeData treeData = new JsonTreeData();
						 treeData.setsT_C_CD((String) param.get("ST_C_CD"));//子节点编码
						 treeData.setsT_P_CD((String) param.get("ST_P_CD"));//父节点编码
						 treeData.setsT_C_NM((String) param.get("ST_C_NM"));//子节点名称
						 treeData.setAttr((String) param.get("ST_P_NM"));
						 treeDataList.add(treeData);
					}
				}
		//最后得到结果集
        List<JsonTreeData> newTreeDataList = TreeNodeUtil.getFatherNode(treeDataList);
        List<Map>  treeList = new ArrayList<Map>();
        for(JsonTreeData treeData:newTreeDataList){
        	Map mapTree = new HashMap();
        	try {
				mapTree=BeanToMapUtil.convertBean(treeData);
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
	
	
	
	
	/**
	 * BOM树状结构
	 * @param dataExchange
	 * @return
	 */
	@SuppressWarnings({ "rawtypes" })
	public CommonResult BOMTree(DataExchangeAssembly dataExchange) {
		Map params = (Map) dataExchange.getBizData("params");
		List<JsonTreeData> treeDataList = new ArrayList<JsonTreeData>();
		CommonResult treeResult = new CommonResult();		
		int returnNum = CoreFrameDao.doEngineCall("search_ProdBomTree", params, treeResult);
		if (returnNum != CoreFrameErrorCode.ISUCCESS_CODE) {
			throw new PodiumException(returnNum, treeResult.getPrompt(),
					CoreFrameworkConstants.Podium_LVL);
		}
				if (treeResult.getDataList() != null && treeResult.getDataList().size() > 0) {
					
					for (Iterator<Map> iter = treeResult.getDataList().iterator(); iter.hasNext();) {
						 Map param = (Map) iter.next();
						 JsonTreeData treeData = new JsonTreeData();
						 treeData.setsT_C_CD((String) param.get("ST_C_CD"));//子节点编码
						 treeData.setsT_P_CD((String) param.get("ST_P_CD"));//父节点编码
						 treeData.setsT_C_NM((String) param.get("ST_C_NM"));//子节点名称
						 treeData.setAttr((String) param.get("ST_P_NM"));
						 treeData.setAttr1((String) param.get("ATTR1"));
						 treeData.setAttr2((String) param.get("ATTR2"));
						 treeData.setAttr3((String) param.get("ATTR3"));
						 treeData.setAttr4((String) param.get("ATTR4"));
						 treeData.setAttr5((String) param.get("ATTR5"));
						 treeData.setAttr6((String) param.get("ATTR6"));
						 treeData.setAttr7((String) param.get("ATTR7"));
						 treeDataList.add(treeData);
					}
				}
		//最后得到结果集
        List<JsonTreeData> newTreeDataList = TreeNodeUtil.getFatherNode(treeDataList);
        List<Map>  treeList = new ArrayList<Map>();
        for(JsonTreeData treeData:newTreeDataList){
        	Map mapTree = new HashMap();
        	try {
				mapTree=BeanToMapUtil.convertBean(treeData);
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
