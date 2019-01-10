package org.mes.jax.model;

import java.io.Serializable;
import java.math.BigDecimal;

/**
 * The persistent class for the SCADA_PRDSTS database table.
 * 
 */
public class ScadaPrdsts implements Serializable {
	private static final long serialVersionUID = 1L;

	private String stsCd;

	private String stsDesc;

	private String stsEmp;

	private BigDecimal stsId;

	private String stsIp;

	private BigDecimal stsNo;

	private String stsSn;

	private String stsTime;

	public ScadaPrdsts() {
	}

	public String getStsCd() {
		return this.stsCd;
	}

	public void setStsCd(String stsCd) {
		this.stsCd = stsCd;
	}

	public String getStsDesc() {
		return this.stsDesc;
	}

	public void setStsDesc(String stsDesc) {
		this.stsDesc = stsDesc;
	}

	public String getStsEmp() {
		return this.stsEmp;
	}

	public void setStsEmp(String stsEmp) {
		this.stsEmp = stsEmp;
	}

	public BigDecimal getStsId() {
		return this.stsId;
	}

	public void setStsId(BigDecimal stsId) {
		this.stsId = stsId;
	}

	public String getStsIp() {
		return this.stsIp;
	}

	public void setStsIp(String stsIp) {
		this.stsIp = stsIp;
	}

	public BigDecimal getStsNo() {
		return this.stsNo;
	}

	public void setStsNo(BigDecimal stsNo) {
		this.stsNo = stsNo;
	}

	public String getStsSn() {
		return this.stsSn;
	}

	public void setStsSn(String stsSn) {
		this.stsSn = stsSn;
	}

	public String getStsTime() {
		return this.stsTime;
	}

	public void setStsTime(String stsTime) {
		this.stsTime = stsTime;
	}

}