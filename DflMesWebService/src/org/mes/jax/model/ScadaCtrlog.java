package org.mes.jax.model;

import java.io.Serializable;
import java.math.BigDecimal;

/**
 * The persistent class for the SCADA_CTRLOG database table.
 * 
 */
public class ScadaCtrlog implements Serializable {
	private static final long serialVersionUID = 1L;

	private String CTR_TIME;

	private String CTR_CD;

	private String CTR_CMD;

	private BigDecimal CTR_ID;

	private String CTR_IP;

	private String PRM_EMP;
	
	private String SEND_FLAG;

	public String getSEND_FLAG() {
		return SEND_FLAG;
	}

	public void setSEND_FLAG(String sEND_FLAG) {
		SEND_FLAG = sEND_FLAG;
	}

	public ScadaCtrlog() {
	}

	public BigDecimal getCTR_ID() {
		return CTR_ID;
	}

	public void setCTR_ID(BigDecimal cTR_ID) {
		CTR_ID = cTR_ID;
	}

	public String getCTR_TIME() {
		return CTR_TIME;
	}

	public void setCTR_TIME(String cTR_TIME) {
		CTR_TIME = cTR_TIME;
	}

	public String getCTR_CD() {
		return CTR_CD;
	}

	public void setCTR_CD(String cTR_CD) {
		CTR_CD = cTR_CD;
	}

	public String getCTR_CMD() {
		return CTR_CMD;
	}

	public void setCTR_CMD(String cTR_CMD) {
		CTR_CMD = cTR_CMD;
	}

	public String getCTR_IP() {
		return CTR_IP;
	}

	public void setCTR_IP(String cTR_IP) {
		CTR_IP = cTR_IP;
	}

	public String getPRM_EMP() {
		return PRM_EMP;
	}

	public void setPRM_EMP(String pRM_EMP) {
		PRM_EMP = pRM_EMP;
	}

}