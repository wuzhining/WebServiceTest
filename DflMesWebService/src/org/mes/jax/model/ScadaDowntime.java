package org.mes.jax.model;

import java.io.Serializable;
import java.math.BigDecimal;


/**
 * The persistent class for the SCADA_DOWNTIME database table.
 * 
 */
public class ScadaDowntime implements Serializable {
	private static final long serialVersionUID = 1L;

	private String downCd;

	private String downEmp;

	private BigDecimal downId;

	private String downIp;

	private BigDecimal downLong;

	private String downSn;

	private String downTime;

	private String downUnit;

	public ScadaDowntime() {
	}

	public String getDownCd() {
		return this.downCd;
	}

	public void setDownCd(String downCd) {
		this.downCd = downCd;
	}

	public String getDownEmp() {
		return this.downEmp;
	}

	public void setDownEmp(String downEmp) {
		this.downEmp = downEmp;
	}

	public BigDecimal getDownId() {
		return this.downId;
	}

	public void setDownId(BigDecimal downId) {
		this.downId = downId;
	}

	public String getDownIp() {
		return this.downIp;
	}

	public void setDownIp(String downIp) {
		this.downIp = downIp;
	}

	public BigDecimal getDownLong() {
		return this.downLong;
	}

	public void setDownLong(BigDecimal downLong) {
		this.downLong = downLong;
	}

	public String getDownSn() {
		return this.downSn;
	}

	public void setDownSn(String downSn) {
		this.downSn = downSn;
	}

	public String getDownTime() {
		return this.downTime;
	}

	public void setDownTime(String downTime) {
		this.downTime = downTime;
	}

	public String getDownUnit() {
		return this.downUnit;
	}

	public void setDownUnit(String downUnit) {
		this.downUnit = downUnit;
	}

}