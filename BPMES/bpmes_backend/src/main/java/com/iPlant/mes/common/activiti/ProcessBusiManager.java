package com.iPlant.mes.common.activiti;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import org.apache.commons.lang.ObjectUtils;

import com.iPlant.frame.biz.podium.PodiumResult;
import com.iPlant.frame.biz.podium.basic.CoreFrameDao;
import com.iPlant.frame.biz.podium.exchange.DataExchangeAssembly;
import com.iPlant.frame.config.CoreFrameErrorCode;
import com.iPlant.frame.config.CoreFrameworkConstants;
import com.iPlant.frame.exception.PodiumException;
import com.iPlant.frame.ifs.model.CommonResult;
import com.iPlant.frame.util.StringUtils;
import com.iPlant.mes.BaseBusiness;
/**
 * 
 * @author lipl  2017-02-11
 *
 */
public class ProcessBusiManager extends BaseBusiness{

	@Override
	public CommonResult execute(DataExchangeAssembly dataExchange) {
		return null;
	}

	@SuppressWarnings({ "unchecked", "rawtypes", "unused" })
	public CommonResult saveOrUpdateBusiData(DataExchangeAssembly dataExchange) {
		try {
			List<String> attr = new ArrayList<String>(
					(List<String>) dataExchange.getBizData("attr"));
			Map<String, Object> params = new HashMap(
					(Map<String, Object>) dataExchange
							.getBizData("params"));
			CommonResult queryResult = new CommonResult();
			CommonResult result = new CommonResult();
			String[] BusiSeq = new String[1];
			int iRetCode = 0;
			String bSno = ObjectUtils.toString(params.get("BUSI_SEQ"));
			if (!bSno.isEmpty() && !bSno.equals("-1")) {
				iRetCode = CoreFrameDao.doEngineCall("busiDataQueryByBusiSeq",
						params, params, queryResult);
				if (iRetCode != CoreFrameErrorCode.ISUCCESS_CODE) {
					throw new PodiumException(dataExchange, -500051,
							"业务数据查询失败", CoreFrameworkConstants.Podium_LVL);
				}
			}
			if (bSno.isEmpty()
					|| queryResult.getDataList() == null
					|| queryResult.getDataList().size() == 0) {
				iRetCode = CoreFrameDao.doEngineCall("busiDataInsert", params,
						params, result);
				if (iRetCode != CoreFrameErrorCode.ISUCCESS_CODE) {
					throw new PodiumException(dataExchange, -500051,
							"业务数据新增失败", CoreFrameworkConstants.Podium_LVL);
				}
				Map map = new HashMap();
				map.put("BUSI_SEQ", BusiSeq[0]);
				dataExchange.setIfsData("BUSI_SEQ", BusiSeq[0]);
				result.getDataList().clear();
				result.getDataList().add(map);
			} else {
				if (params.get("DEAL_PARAM") != null) {
					params.put("DEAL_PARAM", params.get("DEAL_PARAM")
							.toString());
				}
				iRetCode = CoreFrameDao.doEngineCall("busiDataUpdate", params,
						params, result);
				if (iRetCode != CoreFrameErrorCode.ISUCCESS_CODE) {
					throw new PodiumException(dataExchange, -500051,
							"业务数据更新失败", CoreFrameworkConstants.Podium_LVL);
				}
				result.getDataList().clear();
				String procStatus = ObjectUtils.toString(params
						.get("PROC_STATUS"));
				if (procStatus != null
						) {
					Map reqParams = new HashMap();
					reqParams.putAll(params);
					reqParams.putAll(queryResult.getDataList().get(0));
					reqParams.put("PROC_STATUS", procStatus);
					iRetCode = CoreFrameDao.doEngineCall("busiRemindInfoDelete",
							reqParams, params, result);
					if (iRetCode != CoreFrameErrorCode.ISUCCESS_CODE) {
						throw new PodiumException(dataExchange, -500051,
								"弹框提示信息删除失败",
								CoreFrameworkConstants.Podium_LVL);
					}
					iRetCode = CoreFrameDao.doEngineCall("busiRemindInfoInsert",
							reqParams, params, result);
					if (iRetCode != CoreFrameErrorCode.ISUCCESS_CODE) {
						throw new PodiumException(dataExchange, -500051,
								"弹框提示信息添加失败",
								CoreFrameworkConstants.Podium_LVL);
					}
				}
				// 把BUSI_SEQ返回给前端
				Map map = new HashMap();
				map.put("BUSI_SEQ", params.get("BUSI_SEQ"));
				dataExchange.setIfsData("BUSI_SEQ", params.get("BUSI_SEQ"));
				result.getDataList().add(map);
			}
			return result;
		} catch (PodiumException exception) {
			return new PodiumResult(exception.getErrorCode(),
					exception.getMessage());
		}
	}

	/**
	 * 业务作废
	 * 
	 * @param dataExchange
	 * @return
	 */
	@SuppressWarnings({ "unchecked", "rawtypes" })
	public CommonResult deleteBusiData(DataExchangeAssembly dataExchange) {
		Map<String, Object> params = (Map<String, Object>) dataExchange
				.getBizData("params");
		CommonResult queryResult = new CommonResult();
		CommonResult result = new CommonResult();
		int iRetCode = CoreFrameDao.doEngineCall("busiDataQueryByBusiSeq", params,
				params, queryResult);
		if (iRetCode != CoreFrameErrorCode.ISUCCESS_CODE) {
			throw new PodiumException(iRetCode, queryResult.getPrompt(),
					CoreFrameworkConstants.Podium_LVL);
		}
		// 查找不到数据，或者状态已发生改变
		if (queryResult.getDataList() == null
				|| queryResult.getDataList().size() == 0) {
			result = new PodiumResult();
			result.setFlag("-90010");
			result.setPrompt("数据已不存在，请刷新页面检查");
			return result;
		} else if (queryResult.getDataList().size() > 0) {
			String status = ObjectUtils.toString(queryResult.getDataList()
					.get(0).get("PROC_STATUS"));
			if (!status.equals(ActivitiStatus.ACCEPTANCE.getValue())
					&& !status.equals(ActivitiStatus.REJECT.getValue())
					&& !status.equals(ActivitiStatus.PREACCEPTANCE.getValue())) {
				result = new PodiumResult();
				result.setFlag("-90010");
				result.setPrompt("数据状态已发生改变，请刷新页面检查");
				return result;
			}
		}

		if (queryResult.getDataList().get(0).get("EXECUTION_ID") != null
				&& !"".equals(queryResult.getDataList().get(0)
						.get("EXECUTION_ID"))) {
			CommonResult procResult = new CommonResult();
			Map procParams = new HashMap();
			procParams.put("processInstanceId", queryResult.getDataList()
					.get(0).get("EXECUTION_ID"));
			procParams.put("ACT_TYPE", "deleteProcessInstance");
			iRetCode = CoreFrameDao.doPodiumCall("processDispatch", procParams,
					params, procResult);
			if (iRetCode != CoreFrameErrorCode.ISUCCESS_CODE) {
				throw new PodiumException(iRetCode, procResult.getPrompt(),
						CoreFrameworkConstants.Podium_LVL);
			}
		}

		Map updateParams = new HashMap();
		updateParams
				.put("BUSI_SEQ", queryResult.getDataList().get(0).get("BUSI_SEQ"));
		updateParams.put("PROC_STATUS", ActivitiStatus.DELETE.getValue());
		updateParams.put("IS_DELETED", "1");
		updateParams.put("APP_REMARK", params.get("APP_REMARK"));
		updateParams.put("HANDLE_CODE", params.get("HANDLE_CODE"));
		iRetCode = CoreFrameDao.doEngineCall("busiDataUpdate", updateParams,
				params, result);
		if (iRetCode != CoreFrameErrorCode.ISUCCESS_CODE) {
			throw new PodiumException(iRetCode, result.getPrompt(),
					CoreFrameworkConstants.Podium_LVL);
		}

		CommonResult nodeResult = new CommonResult();
		Map nodeParams = new HashMap();
		nodeParams.put("taskId", UUID.randomUUID());
		nodeParams.put("BUSI_SEQ", params.get("BUSI_SEQ"));
		nodeParams.put("BAR_CODE",
				queryResult.getDataList().get(0).get("BAR_CODE"));
		nodeParams.put("VAR_NAME", "APPROVE_1");
		nodeParams.put("VAR_VALUE", "4");
		nodeParams.put("APP_REMARK", params.get("APP_REMARK"));
		iRetCode = CoreFrameDao.doEngineCall("delNodeInsert", nodeParams,
				params, nodeResult);
		if (iRetCode != CoreFrameErrorCode.ISUCCESS_CODE) {
			throw new PodiumException(iRetCode, nodeResult.getPrompt(),
					CoreFrameworkConstants.Podium_LVL);
		}
		return nodeResult;
	}

	/**
	 * 获取表单配置
	 * 
	 * @param dataExchange
	 * @return
	 */
	@SuppressWarnings({ "unchecked", "rawtypes" })
	public CommonResult getFormKey(DataExchangeAssembly dataExchange) {
		Map<String, Object> params = (Map<String, Object>) dataExchange
				.getBizData("params");
		CommonResult taskResult = new CommonResult();
		Map searchParams = new HashMap();
		searchParams.put("processInstanceId", params.get("processInstanceId"));
		int iRetCode = 0;
		searchTask(iRetCode, searchParams, params, taskResult);
		Map dataMap = new HashMap();
		dataMap.put("taskId", taskResult.getDataList().get(0).get("TASK_ID"));
		dataMap.put("NODE_NAME",
				taskResult.getDataList().get(0).get("NODE_NAME"));
		dataMap.put("NODE_KEY", taskResult.getDataList().get(0).get("NODE_KEY"));
		PodiumResult result = new PodiumResult();
		List<Map> dataList = new ArrayList<Map>();
		dataList.add(dataMap);
		result.setDataList(dataList);
		result.setFlag("0");
		return result;
	}

	/**
	 * 判断是否已受理过，是否还可以再受理
	 * 
	 * @param dataExchange
	 * @return
	 */
	@SuppressWarnings({ "unchecked", "rawtypes" })
	public CommonResult allowAcceptance(DataExchangeAssembly dataExchange) {
		Map<String, Object> params = (Map<String, Object>) dataExchange
				.getBizData("params");
		int iRetCode = 0;
		PodiumResult result = new PodiumResult();
		params.put("ALLOW_DELETED", "2");
		iRetCode = CoreFrameDao.doEngineCall("busiDataQuery", params, params,
				result);
		if (iRetCode != CoreFrameErrorCode.ISUCCESS_CODE) {
			throw new PodiumException(iRetCode, result.getPrompt(),
					CoreFrameworkConstants.Podium_LVL);
		}
		Map resultMap = new HashMap();
		if (result.getDataList() != null && result.getDataList().size() > 0) {
			resultMap.put("allowAccept", "false");
			resultMap
					.put("USE_CD", result.getDataList().get(0).get("USE_CD"));
			resultMap.put("USER_NAME",
					result.getDataList().get(0).get("USER_NAME"));
		} else {
			resultMap.put("allowAccept", "true");
		}

		List list = new ArrayList();
		list.add(resultMap);
		result.setFlag("0");
		result.setPrompt("是否允许受理判断成功！");
		result.setDataList(list);
		return result;
	}

	/**
	 * 业务挂起
	 * 
	 * @param dataExchange
	 * @return
	 */
	@SuppressWarnings({ "unchecked" })
	public CommonResult suspendBiz(DataExchangeAssembly dataExchange) {
		Map<String, Object> params = (Map<String, Object>) dataExchange
				.getBizData("params");
		CommonResult result = new CommonResult();
		params.put("PROC_STATUS", ActivitiStatus.SUSPEND.getValue());
		int iRetCode = CoreFrameDao.doEngineCall("busiDataUpdate", params,
				params, result);
		if (iRetCode != CoreFrameErrorCode.ISUCCESS_CODE) {
			throw new PodiumException(iRetCode, result.getPrompt(),
					CoreFrameworkConstants.Podium_LVL);
		}
		return result;
	}

	/**
	 * 认领
	 * 
	 * @param dataExchange
	 * @return
	 */
	@SuppressWarnings({ "unchecked", "rawtypes" })
	public CommonResult claimTask(DataExchangeAssembly dataExchange) {
		Map<String, Object> params = (Map<String, Object>) dataExchange
				.getBizData("params");

		CommonResult result = new CommonResult();
		String procStatusParam = ObjectUtils
				.toString(params.get("PROC_STATUS"));
		int procStatus = Integer.parseInt(procStatusParam);
		String assignee = ObjectUtils.toString(params.get("ASSIGNEE"));
		CommonResult taskResult = new CommonResult();
		int iRetCode = 0;
		searchTask(iRetCode, params, params, taskResult);
		Map dataMap = new HashMap();
		dataMap.put("taskId", taskResult.getDataList().get(0).get("TASK_ID"));
		dataMap.put("NODE_NAME",
				taskResult.getDataList().get(0).get("NODE_NAME"));
		dataMap.put("NODE_KEY", taskResult.getDataList().get(0).get("NODE_KEY"));
		if (assignee.isEmpty()) {
				// 判断是否已认领过工单
				CommonResult procResult = new CommonResult();
				Map procParams = new HashMap();
				String inProcStatus = "'" + ActivitiStatus.CHECKING.getValue()
						+ "','" + ActivitiStatus.CHECKING.getValue() + "','"
						+ ActivitiStatus.CHECKING.getValue() + "'";
				procParams.put("IN_PROC_STATUS", inProcStatus);
				procParams.put("HANDLE_CODE", params.get("F_USE_CD"));
				procParams.put("IS_DELETED", "0");
				iRetCode = CoreFrameDao.doEngineCall("busiDataQuery", procParams,
						params, procResult);
				if (iRetCode != CoreFrameErrorCode.ISUCCESS_CODE) {
					throw new PodiumException(iRetCode, procResult.getPrompt(),
							CoreFrameworkConstants.Podium_LVL);
				}
				if (procResult.getDataList() != null
						&& procResult.getDataList().size() > 0) {
					StringBuilder sb = new StringBuilder();
					for (Map map : procResult.getDataList()) {
						sb.append("'");
						sb.append(map.get("BUSI_SEQ"));
						sb.append("',");
					}
					PodiumResult PodiumResult = new PodiumResult();
					Map msg = new HashMap();
					List list = new ArrayList();
					msg.put("errMsg",
							"你有正在处理中的业务，业务号为【"
									+ sb.substring(0, sb.length() - 1)
									+ "】，请处理完后再认领");
					list.add(msg);
					PodiumResult.setFlag("0");
					PodiumResult.setDataList(list);
					params.put("BAR_CODE", "-NON-EXISTENT");
					return PodiumResult;
				}

			params.put("PROC_STATUS", String.format("%02d", procStatus + 1));
			CommonResult updateResult = new CommonResult();

			params.put("ACT_TYPE", "claimTask");
			params.put("taskId", taskResult.getDataList().get(0).get("TASK_ID"));
			iRetCode = CoreFrameDao.doPodiumCall("processDispatch", params,
					params, result);
			if (iRetCode != CoreFrameErrorCode.ISUCCESS_CODE) {
				throw new PodiumException(iRetCode, result.getPrompt(),
						CoreFrameworkConstants.Podium_LVL);
			}

			iRetCode = CoreFrameDao.doPodiumCall("saveOrUpdateBusiData", params,
					params, updateResult);
			params.putAll(dataMap);
			busiNodeInsert(params, params);
		}

		List<Map> dataList = new ArrayList<Map>();
		dataList.add(dataMap);
		result.setDataList(dataList);
		result.setFlag("0");
		return result;
	}

	/**
	 * 驳回
	 * 
	 * @param dataExchange
	 * @return
	 */
	@SuppressWarnings({ "unchecked", "rawtypes" })
	public CommonResult rejectTask(DataExchangeAssembly dataExchange) {
		Map<String, Object> params = (Map<String, Object>) dataExchange
				.getBizData("params");
		CommonResult result = new CommonResult();
		Map taskParams = new HashMap();
		taskParams.put("PROC_VAR", params.get("PROC_VAR"));
		parseProcVariable(taskParams);
		taskParams.put("taskId", params.get("taskId"));
		taskParams.put("ACT_TYPE", "completeTask");
		int iRetCode = CoreFrameDao.doPodiumCall("processDispatch", taskParams,
				params, result);
		if (iRetCode != CoreFrameErrorCode.ISUCCESS_CODE) {
			throw new PodiumException(iRetCode, result.getPrompt(),
					CoreFrameworkConstants.Podium_LVL);
		}
		params.put("PROC_STATUS", ActivitiStatus.REJECT.getValue());
		CommonResult updateResult = new CommonResult();
		iRetCode = CoreFrameDao.doPodiumCall("saveOrUpdateBusiData", params,
				params, updateResult);
		params.put("TASK_ID", params.get("taskId"));
		return busiNodeUpdate(params, params);
	}

	/**
	 * 提交任务
	 * 
	 * @param dataExchange
	 * @return
	 */
	@SuppressWarnings({ "unchecked", "rawtypes", "unused" })
	public CommonResult completeTask(DataExchangeAssembly dataExchange) {
		Map<String, Object> params = (Map<String, Object>) dataExchange
				.getBizData("params");
		CommonResult result = new CommonResult();
		parseProcVariable(params);
		int iRetCode = 0;

		Map taskParams = new HashMap();
		convertPostId(params, taskParams);
		taskParams.put("processInstanceId", params.get("processInstanceId"));
		taskParams.putAll(params);
		iRetCode = CoreFrameDao.doEngineCall("taskQueryByOp", taskParams,
				params, result);
		if (iRetCode != CoreFrameErrorCode.ISUCCESS_CODE) {
			throw new PodiumException(iRetCode, result.getPrompt(),
					CoreFrameworkConstants.Podium_LVL);
		}
		if (result.getDataList() == null || result.getDataList().size() == 0) {
			throw new PodiumException(-500051,
					"待办数据为空，没有该权限或已被其他人处理，请刷新页面！",
					CoreFrameworkConstants.Podium_LVL);
		} else if (result.getDataList().size() > 1) {
			throw new PodiumException(-500051, "查出有多条待办数据，不符合业务要求！",
					CoreFrameworkConstants.Podium_LVL);
		}

		params.put("taskId", result.getDataList().get(0).get("TASK_ID"));
		// 判断是否需要认领
		String assignee = ObjectUtils.toString(result.getDataList().get(0)
				.get("TASSIGNEE"));
		if (assignee.equals("null") || assignee.trim().isEmpty()) {
			PodiumResult claimResult = new PodiumResult();
			params.put("ACT_TYPE", "claimTask");
			iRetCode = CoreFrameDao.doPodiumCall("processDispatch", params,
					params, claimResult);
			if (iRetCode != CoreFrameErrorCode.ISUCCESS_CODE) {
				throw new PodiumException(iRetCode, claimResult.getPrompt(),
						CoreFrameworkConstants.Podium_LVL);
			}
		}

		// 判断是否受理端
		Map variableParams = new HashMap();
		variableParams.put("processInstanceId", result.getDataList().get(0)
				.get("PROC_INST_ID"));
		String nodeKey = ObjectUtils.toString(result.getDataList().get(0)
				.get("NODE_KEY"));
		if (ActivitiNodeConstant.getNode(nodeKey).equals(
				ActivitiNodeConstant.BIZ_ACCEPT_TASK)) {
			PodiumResult nodeResult = new PodiumResult();
			Map searchParams = new HashMap();
			searchParams.put("BUSI_SEQ", params.get("BUSI_SEQ"));
			iRetCode = CoreFrameDao.doEngineCall("busiNodeSelect", searchParams,
					params, nodeResult);
			if (iRetCode != CoreFrameErrorCode.ISUCCESS_CODE) {
				throw new PodiumException(iRetCode, nodeResult.getPrompt(),
						CoreFrameworkConstants.Podium_LVL);
			}
			if (nodeResult.getDataList() != null
					&& nodeResult.getDataList().size() > 0) {
				int dateSize = nodeResult.getDataList().size();
				Map nodeData = nodeResult.getDataList().get(dateSize - 1);
				String lastNode = ObjectUtils
						.toString(nodeData.get("NODE_KEY"));
					params.put("APPROVE_1", "1");
			}
		}

		// 提交任务
		PodiumResult completeResult = new PodiumResult();
		params.put("ACT_TYPE", "completeTask");
		iRetCode = CoreFrameDao.doPodiumCall("processDispatch", params,
				params, completeResult);
		if (iRetCode != CoreFrameErrorCode.ISUCCESS_CODE) {
			throw new PodiumException(iRetCode, completeResult.getPrompt(),
					CoreFrameworkConstants.Podium_LVL);
		}

		// 记录节点信息
		String taskKey = ObjectUtils.toString(result.getDataList().get(0)
				.get("taskKey"));
		String procStatus = ActivitiNodeConstant.getNode(taskKey).getProcStatus();
		Map insertParam = new HashMap();
		insertParam.put("PROC_STATUS", procStatus);
		insertParam.put("BUSI_SEQ", params.get("BUSI_SEQ"));
		insertParam.put("BAR_CODE", params.get("BAR_CODE"));
		insertParam.put("APP_REMARK", params.get("APP_REMARK"));
		insertParam.put("PROC_VAR", params.get("PROC_VAR"));
		insertParam.putAll(result.getDataList().get(0));
		result = busiNodeUpdate(insertParam, params);

		Map queryParams = new HashMap();
		queryParams.put("processInstanceId", params.get("processInstanceId"));
		iRetCode = CoreFrameDao.doEngineCall("taskQuery", queryParams, params,
				result);
		if (iRetCode != CoreFrameErrorCode.ISUCCESS_CODE) {
			throw new PodiumException(iRetCode, result.getPrompt(),
					CoreFrameworkConstants.Podium_LVL);
		}
		if (result.getDataList() == null || result.getDataList().size() == 0) {
			params.put("PROC_STATUS", ActivitiStatus.PENDING_CHECK.getValue());
		} else if (result.getDataList().size() > 1) {
			throw new PodiumException(-500051, "查出有多条待办数据，不符合业务要求！",
					CoreFrameworkConstants.Podium_LVL);
		} else {
			taskKey = ObjectUtils.toString(result.getDataList().get(0)
					.get("NODE_KEY"));
			procStatus = ActivitiNodeConstant.getNode(taskKey).getProcStatus();
			params.put("PROC_STATUS", procStatus);
		}

		return result;
	}


	@SuppressWarnings({ "unchecked", "rawtypes" })
	private void searchTask(int iRetCode, Map params, Map params2,
			CommonResult result) {
		Map queryParams = new HashMap();
		queryParams.put("processInstanceId", params.get("processInstanceId"));
		iRetCode = CoreFrameDao.doEngineCall("taskQuery", params, params2,
				result);
		if (iRetCode != CoreFrameErrorCode.ISUCCESS_CODE) {
			throw new PodiumException(iRetCode, result.getPrompt(),
					CoreFrameworkConstants.Podium_LVL);
		}
		if (result.getDataList() == null || result.getDataList().size() == 0) {
			throw new PodiumException(-500051,
					"数据为空，可能已被其他人处理，请刷新页面检查！",
					CoreFrameworkConstants.Podium_LVL);
		} else if (result.getDataList().size() > 1) {
			throw new PodiumException(-500051, "查出有多条待办数据，不符合业务要求！",
					CoreFrameworkConstants.Podium_LVL);
		}
	}

	/**
	 * 根据流程查审核待办
	 * 
	 * @param dataExchange
	 * @return
	 */
	@SuppressWarnings("unchecked")
	public CommonResult appBusiReadyQuery(DataExchangeAssembly dataExchange) {
		Map<String, Object> params = (Map<String, Object>) dataExchange
				.getBizData("params");
		CommonResult result = new CommonResult();
		convertPostId(params, params);
		int iRetCode = CoreFrameDao.doEngineCall("appBusiReadyQuery", params,
				params, result);
		if (iRetCode != CoreFrameErrorCode.ISUCCESS_CODE) {
			throw new PodiumException(iRetCode, result.getPrompt(),
					CoreFrameworkConstants.Podium_LVL);
		}
		return result;
	}

	private void convertPostId(Map<String, Object> params,
			Map<String, Object> params2) {

		String postIdParams = ObjectUtils.toString(params.get("USER_POST"));

		String postArrayParams[] = postIdParams.split(",");
		String postArray[] = new HashSet<String>(Arrays.asList(postArrayParams))
				.toArray(new String[0]);
		Arrays.sort(postArray);
		String postIds = "";
		for (String postId : postArray) {
			postIds = postIds + "'" + postId + "',";
		}
		params.put("POST_IDS", postIds.substring(0, postIds.length() - 1));
	}



	/**
	 * 中间节点代办查询
	 * 
	 * @param dataExchange
	 * @return
	 */
	@SuppressWarnings("unchecked")
	public CommonResult midBusiReadyQuery(DataExchangeAssembly dataExchange) {
		Map<String, Object> params = (Map<String, Object>) dataExchange
				.getBizData("params");
		CommonResult result = new CommonResult();
		String postIds = ObjectUtils.toString(params.get("USER_POST"));
		postIds = "'" + postIds.replace(",", "','") + "'";
		params.put("POST_IDS", postIds);
		int iRetCode = CoreFrameDao.doEngineCall("midBusiReadyQuery", params,
				params, result);
		if (iRetCode != CoreFrameErrorCode.ISUCCESS_CODE) {
			throw new PodiumException(iRetCode, result.getPrompt(),
					CoreFrameworkConstants.Podium_LVL);
		}
		return result;
	}

	/**
	 * 发起流程
	 * 
	 * @param dataExchange
	 * @return
	 */
	@SuppressWarnings({ "unchecked", "rawtypes" })
	public CommonResult startProcessInstance(DataExchangeAssembly dataExchange) {
		Map<String, Object> params = (Map<String, Object>) dataExchange
				.getBizData("params");
		Map<String, String> commParams = new HashMap(
				(Map<String, String>) dataExchange
						.getBizData("commParams"));
		CommonResult processResult = new CommonResult();
		parseProcVariable(params);
		// 直接发起流程
		Map startParams = new HashMap();
		startParams.put("PROCESS_KEY", params.get("PROCESS_KEY"));
		startParams.put("PROCESS_START_TYPE", "codeStartACT");
		startParams.put("ACT_TYPE", "startProcess");
		startParams.put("ACCEPTER", params.get("F_USE_CD"));
		startParams.put("businessKey", params.get("businessKey"));
		startParams.put("F_USE_CD", params.get("F_USE_CD"));
		int iRetCode = CoreFrameDao.doPodiumCall("processDispatch", startParams,
				commParams, processResult);
		if (iRetCode != CoreFrameErrorCode.ISUCCESS_CODE) {
			throw new PodiumException(iRetCode, processResult.getPrompt(),
					CoreFrameworkConstants.Podium_LVL);
		}

		// 设置受理人员
		PodiumResult variableResult = new PodiumResult();
		Map variableParams = new HashMap();
		String processInstanceId = (String) processResult.getDataList().get(0)
				.get("processInstanceId");
		variableParams.put("processInstanceId", processInstanceId);
		Map processInstanceVariables = new HashMap();
		processInstanceVariables.put("ACCEPTER", params.get("F_USE_CD"));
		if (params.get("FLOW_VARS") != null) {
			Map<String, String> flowVars = (Map) params.get("FLOW_VARS");
			Iterator<String> keys = flowVars.keySet().iterator();
			while (keys.hasNext()) {
				String key =keys.next();
				processInstanceVariables.put(key,
						flowVars.get(key));
			}
		}
		variableParams
				.put("processInstanceVariables", processInstanceVariables);
		variableParams.put("ACT_TYPE", "setVariables");
		iRetCode = CoreFrameDao.doPodiumCall("processDispatch", variableParams,
				params, variableResult);
		if (iRetCode != CoreFrameErrorCode.ISUCCESS_CODE) {
			throw new PodiumException(iRetCode, variableResult.getPrompt(),
					CoreFrameworkConstants.Podium_LVL);
		}

		CommonResult result = new CommonResult();
		params.put("processInstanceId", processInstanceId);
		convertPostId(params, params);
		iRetCode = CoreFrameDao.doEngineCall("taskQueryByOp", params, params,
				result);
		if (iRetCode != CoreFrameErrorCode.ISUCCESS_CODE) {
			throw new PodiumException(iRetCode, result.getPrompt(),
					CoreFrameworkConstants.Podium_LVL);
		}
		if (result.getDataList() == null || result.getDataList().size() == 0) {
			throw new PodiumException(dataExchange, -500051,
					"无法查找到下一步任务，请检查操作员是否有权限！",
					CoreFrameworkConstants.Podium_LVL);
		} else if (result.getDataList().size() > 1) {
			throw new PodiumException(dataExchange, -500051,
					"下一步有多条待办任务，不符合业务要求！",
					CoreFrameworkConstants.Podium_LVL);
		}
		params.putAll(result.getDataList().get(0));

		Map queryParams = new HashMap();
		queryParams.put("BAR_CODE", params.get("BAR_CODE"));
		queryParams.put("PROC_STATUS", "01");
		iRetCode = CoreFrameDao.doEngineCall("busiDataQuery", queryParams,
				params, result);
		if (result.getDataList() != null && result.getDataList().size() > 1) {
			String sno = (String) params.get("BUSI_SEQ");
			for (Iterator iterator = result.getDataList().iterator(); iterator
					.hasNext();) {
				Map data = (Map) iterator.next();
				if (!data.get("BUSI_SEQ").toString().equals(sno)) {
					Map updateParams = new HashMap();
					updateParams.put("BUSI_SEQ", data.get("BUSI_SEQ"));
					updateParams
							.put("HANDLE_CODE", params.get("F_USE_CD"));
					updateParams.put("APP_REMARK", "系统自动作废,业务号为【" + sno
							+ "】的业务已受理客户该业务");
					CommonResult deleteBusiResult = new CommonResult();
					iRetCode = CoreFrameDao.doPodiumCall("deleteBusiData",
							updateParams, params, deleteBusiResult);
					if (iRetCode != CoreFrameErrorCode.ISUCCESS_CODE) {
						throw new PodiumException(iRetCode,
								deleteBusiResult.getPrompt(),
								CoreFrameworkConstants.Podium_LVL);
					}
				}
			}
		}

		params.put("EXECUTION_ID", processInstanceId);
		return processResult;
	}

	@SuppressWarnings({ "unchecked", "rawtypes" })
	public CommonResult saveBusiDataNode(DataExchangeAssembly dataExchange) {
		try {
			Map<String, Object> params = new HashMap(
					(Map<String, Object>) dataExchange
							.getBizData("params"));
			CommonResult queryResult = new CommonResult();
			String bSno = ObjectUtils.toString(dataExchange
					.getIfsData("BUSI_SEQ"));
			params.put("BUSI_SEQ", bSno);
			int iRetCode = CoreFrameDao.doEngineCall("busiNodeSelectJudge",
					params, params, queryResult);
			if (iRetCode != CoreFrameErrorCode.ISUCCESS_CODE) {
				throw new PodiumException(dataExchange, -500051,
						"业务数据查询失败", CoreFrameworkConstants.Podium_LVL);
			}

			if (queryResult.getDataList() == null
					|| queryResult.getDataList().size() == 0) {
				if (StringUtils.isEmpty(ObjectUtils.toString(params
						.get("TASK_ID")))) {
					String taskId =bSno;
					params.put("TASK_ID", taskId);
				}
				iRetCode = CoreFrameDao.doEngineCall("busiNodeInsert", params,
						params, queryResult);
				if (iRetCode != CoreFrameErrorCode.ISUCCESS_CODE) {
					throw new PodiumException(dataExchange, -500051,
							"业务数据新增失败", CoreFrameworkConstants.Podium_LVL);
				}
			}
			return queryResult;
		} catch (PodiumException exception) {
			return new PodiumResult(exception.getErrorCode(),
					exception.getMessage());
		}
	}

	/**
	 * 插入业务节点信息
	 * @param params
	 * @param params
	 * @return
	 */
	private CommonResult busiNodeInsert(Map<String, Object> params,
			Map<String, Object> params2) {
		CommonResult result = new CommonResult();
		parseProcVariable(params);
		int iRetCode = CoreFrameDao.doEngineCall("busiNodeInsert", params,
				params2, result);
		if (iRetCode != CoreFrameErrorCode.ISUCCESS_CODE) {
			throw new PodiumException(iRetCode, result.getPrompt(),
					CoreFrameworkConstants.Podium_LVL);
		}
		return result;
	}

	/**
	 * 更新业务节点信息
	 * @param params
	 * @param params
	 * @return
	 */
	private CommonResult busiNodeUpdate(Map<String, Object> params,
			Map<String, Object> params2) {
		CommonResult result = new CommonResult();
		parseProcVariable(params);
		int iRetCode = CoreFrameDao.doEngineCall("busiNodeUpdate", params,
				params2, result);
		if (iRetCode != CoreFrameErrorCode.ISUCCESS_CODE) {
			throw new PodiumException(iRetCode, result.getPrompt(),
					CoreFrameworkConstants.Podium_LVL);
		}
		return result;
	}

	@SuppressWarnings({ "unchecked", "rawtypes" })
	private void parseProcVariable(Map params) {
		if (params.get("PROC_VAR") != null) {
			Map<String, String> procVar = (Map) params.get("PROC_VAR");
			for (String key : procVar.keySet()) {
				params.put(key, procVar.get(key));
				params.put("VAR_NAME", key);
				params.put("VAR_VALUE", procVar.get(key));
			}
		}
	}


	/**
	 * 查询已办理的参数
	 * 
	 * @param dataExchange
	 * @return
	 */
	@SuppressWarnings({ "unchecked", "rawtypes" })
	public CommonResult getBusiAcceptParam(DataExchangeAssembly dataExchange) {
		Map<String, Object> params = (Map<String, Object>) dataExchange
				.getBizData("params");
		CommonResult result = new CommonResult();

		// 查询业务办理到哪一步
		int iRetCode = CoreFrameDao.doEngineCall("getLastBusiSequ", params,
				params, result);
		if (iRetCode != CoreFrameErrorCode.ISUCCESS_CODE) {
			throw new PodiumException(iRetCode, result.getPrompt(),
					CoreFrameworkConstants.Podium_LVL);
		}
		Map paramMap = result.getDataList().get(0);

		Map atomMap = new HashMap();
		atomMap.put("BAR_CODE", paramMap.get("BAR_CODE"));

		// 如果最后一步是成功的，则所有步骤返回。是失败，则返回之前的步骤
		if ("0".equals(ObjectUtils.toString(paramMap.get("ERROR_CODE")))) {
			int sequ = Integer.parseInt(ObjectUtils.toString(paramMap
					.get("SEQU"))) + 1;
			paramMap.put("SEQU", ObjectUtils.toString(sequ));
		}

		// 获取已经办理过的参数
		iRetCode = CoreFrameDao.doEngineCall("acceptParamQuery", paramMap,
				params, result);
		if (iRetCode != CoreFrameErrorCode.ISUCCESS_CODE) {
			throw new PodiumException(iRetCode, result.getPrompt(),
					CoreFrameworkConstants.Podium_LVL);
		}
		List list = new ArrayList();

		String disabledParam = "";
		if (result.getDataList() != null && result.getDataList().size() > 0) {
			for (Iterator iterator = result.getDataList().iterator(); iterator
					.hasNext();) {
				Map map = (Map) iterator.next();
				if (StringUtils.isNotEmpty(ObjectUtils.toString(map
						.get("ACCEPT_PARAM")))) {
					disabledParam += ObjectUtils.toString(map
							.get("ACCEPT_PARAM")) + ",";
				}
			}
			if (StringUtils.isNotEmpty(disabledParam)) {
				disabledParam = disabledParam.substring(0,
						disabledParam.length() - 1);
				atomMap.put("DISABLED_PARAM", disabledParam);
				list.add(atomMap);
			}
		}

		CommonResult PodiumResult = new CommonResult();
		PodiumResult.setFlag("0");
		PodiumResult.setDataList(list);
		return PodiumResult;
	}

	@SuppressWarnings({ "unchecked", "rawtypes" })
	public CommonResult saveOrUpdateBusiMerge(DataExchangeAssembly dataExchange) {
		try {
			Map<String, Object> params = new HashMap(
					(Map<String, Object>) dataExchange
							.getBizData("params"));
			CommonResult result = new CommonResult();
			String mergeSno = ObjectUtils.toString(params.get("MERGE_SNO"));
			if (StringUtils.isEmpty(mergeSno)) {
				int iRetCode = CoreFrameDao.doEngineCall("busiMergeInsert",
						params, params, result);
				if (iRetCode != CoreFrameErrorCode.ISUCCESS_CODE) {
					throw new PodiumException(dataExchange, -500051,
							"业务数据新增失败", CoreFrameworkConstants.Podium_LVL);
				}
				if (result.getDataList() != null
						&& result.getDataList().size() > 0) {
					mergeSno = ObjectUtils.toString(result.getDataList().get(0)
							.get("ID"));
				}
			} else {
				int iRetCode = CoreFrameDao.doEngineCall("busiMergeUpdate",
						params, params, result);
				if (iRetCode != CoreFrameErrorCode.ISUCCESS_CODE) {
					throw new PodiumException(dataExchange, -500051,
							"业务数据修改失败", CoreFrameworkConstants.Podium_LVL);
				}
			}
			dataExchange.setIfsData("MERGE_SNO", mergeSno);

			List<Map> dataList = new ArrayList<Map>();
			Map map = new HashMap();
			map.put("MERGE_SNO", mergeSno);
			dataList.add(map);
			CommonResult PodiumResult = new CommonResult();
			PodiumResult.setFlag("0");
			PodiumResult.setDataList(dataList);
			return PodiumResult;
		} catch (PodiumException exception) {
			return new PodiumResult(exception.getErrorCode(),
					exception.getMessage());
		}
	}

	@SuppressWarnings({ "unchecked", "rawtypes" })
	public CommonResult submitBusiMergeData(DataExchangeAssembly dataExchange) {
		Map<String, Object> params = new HashMap(
				(Map<String, Object>) dataExchange.getBizData("params"));
		CommonResult result = new CommonResult();
		String mergeSno = ObjectUtils.toString(params.get("MERGE_SNO"));
		String bSno = ObjectUtils.toString(params.get("BUSI_SEQ"));

		CommonResult updateMergeResult = saveOrUpdateBusiMerge(dataExchange);
		if (!"0".equals(updateMergeResult.getFlag())) {
			throw new PodiumException(dataExchange, -500051,
					"更新组合业务状态失败", CoreFrameworkConstants.Podium_LVL);
		}
		// TODO 根据MERGE_SNO 查询流程数据
		CommonResult subTaskResult = new CommonResult();
		int iRetCode = -1;
		String[] bSnos = bSno.split(",");
		for (String bno : bSnos) {
			params.put("BUSI_SEQ", bno);
			// 发起流程
			iRetCode = CoreFrameDao.doPodiumCall("startProcessInstance", params,
					params, subTaskResult);
			if (iRetCode != CoreFrameErrorCode.ISUCCESS_CODE) {
				throw new PodiumException(iRetCode, subTaskResult.getPrompt(),
						CoreFrameworkConstants.Podium_LVL);
			}
			// 更新任务状态
			iRetCode = CoreFrameDao.doPodiumCall("saveOrUpdateBusiData", params,
					params, subTaskResult);
			if (iRetCode != CoreFrameErrorCode.ISUCCESS_CODE) {
				throw new PodiumException(iRetCode, subTaskResult.getPrompt(),
						CoreFrameworkConstants.Podium_LVL);
			}

			iRetCode = CoreFrameDao.doPodiumCall("completeTask", params,
					params, subTaskResult);
			if (iRetCode != CoreFrameErrorCode.ISUCCESS_CODE) {
				throw new PodiumException(iRetCode, subTaskResult.getPrompt(),
						CoreFrameworkConstants.Podium_LVL);
			}
		}

		List<Map> dataList = new ArrayList<Map>();
		Map map = new HashMap();
		map.put("MERGE_SNO", mergeSno);
		map.put("BUSI_SEQ", bSnos);
		dataList.add(map);
		result.setFlag("0");
		result.setDataList(dataList);
		return result;
	}
}
