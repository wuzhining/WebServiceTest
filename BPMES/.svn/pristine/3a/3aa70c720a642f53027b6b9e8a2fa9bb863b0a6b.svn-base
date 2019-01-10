package com.iPlant.mes.common.activiti;
/**
 * 
 * @author lipl  2017-02-11
 *
 */
public enum ActivitiStatus {

	
	ACCEPTANCE("01"),//受理业务
	PREACCEPTANCE ("02"),//预受理业务
	PENDING_CHECK ("03"),//待认领
	CHECKING("04"),//认领中
	REJECT("05"),//驳回
	SUSPEND("06"),//挂起
	DELETE("07");//作废
	
	String statusValue;
	
	ActivitiStatus(final String statusValue) {
		this.statusValue = statusValue;
	}
	
	public String getValue() {
		return statusValue;
	}
}
