package org.mes.jax.model;

import java.io.Serializable;
import java.math.BigDecimal;


/**
 * The persistent class for the SCADA_TDOWNTIME database table.
 * 
 */
public class ScadaTdowntime implements Serializable {
	private static final long serialVersionUID = 1L;

	private String tdownCd;

	private String tdownEmp;

	private BigDecimal tdownId;

	private String tdownIp;

	private BigDecimal tdownLong;

	private String tdownSn;

	private String tdownTime;

	private String tdownUnit;

	public ScadaTdowntime() {
	}

	public String getTdownCd() {
		return this.tdownCd;
	}

	public void setTdownCd(String tdownCd) {
		this.tdownCd = tdownCd;
	}

	public String getTdownEmp() {
		return this.tdownEmp;
	}

	public void setTdownEmp(String tdownEmp) {
		this.tdownEmp = tdownEmp;
	}

	public BigDecimal getTdownId() {
		return this.tdownId;
	}

	public void setTdownId(BigDecimal tdownId) {
		this.tdownId = tdownId;
	}

	public String getTdownIp() {
		return this.tdownIp;
	}

	public void setTdownIp(String tdownIp) {
		this.tdownIp = tdownIp;
	}

	public BigDecimal getTdownLong() {
		return this.tdownLong;
	}

	public void setTdownLong(BigDecimal tdownLong) {
		this.tdownLong = tdownLong;
	}

	public String getTdownSn() {
		return this.tdownSn;
	}

	public void setTdownSn(String tdownSn) {
		this.tdownSn = tdownSn;
	}

	public String getTdownTime() {
		return this.tdownTime;
	}

	public void setTdownTime(String tdownTime) {
		this.tdownTime = tdownTime;
	}

	public String getTdownUnit() {
		return this.tdownUnit;
	}

	public void setTdownUnit(String tdownUnit) {
		this.tdownUnit = tdownUnit;
	}

}