package com.iPlant.mes.common.activiti;
/**
 * 
 * @author lipl  2017-02-11
 *
 */
public enum ActivitiNodeConstant {

	BIZ_ACCEPT_TASK("bizAcceptTask","01"), //业务受理
	APPROVE_TASK("appvTask","05"), //业务认领
	OTHERS("others","03");//其他节点
	String nodeId;
	String procStatus;
	
	public static ActivitiNodeConstant getNode(String nodeId) {
		for(ActivitiNodeConstant node : ActivitiNodeConstant.values()) {
			if(nodeId!=null && nodeId.startsWith(node.getNodeId())) {
				return node;
			}
		}
		return OTHERS;
	}
	
	ActivitiNodeConstant(final String nodeId,final String procStatus) {
		this.nodeId = nodeId;
		this.procStatus = procStatus;
	}
	
	public String getNodeId() {
		return nodeId;
	}
	
	public String getProcStatus() {
		return procStatus;
	}
}
