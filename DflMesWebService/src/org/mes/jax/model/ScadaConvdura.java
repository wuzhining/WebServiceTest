package org.mes.jax.model;

import java.io.Serializable;
import java.math.BigDecimal;


/**
 * The persistent class for the SCADA_CONVDURA database table.
 * 
 */
public class ScadaConvdura implements Serializable {
	private static final long serialVersionUID = 1L;

	private String convCd;

	private String convEmp;

	private BigDecimal convId;

	private String convIp;

	private BigDecimal convLong;

	private String convSn;

	private String convTime;
	
	private String convUnit;

	public ScadaConvdura() {
	}

	public String getConvCd() {
		return this.convCd;
	}

	public void setConvCd(String convCd) {
		this.convCd = convCd;
	}

	public String getConvEmp() {
		return this.convEmp;
	}

	public void setConvEmp(String convEmp) {
		this.convEmp = convEmp;
	}

	public BigDecimal getConvId() {
		return this.convId;
	}

	public void setConvId(BigDecimal convId) {
		this.convId = convId;
	}

	public String getConvIp() {
		return this.convIp;
	}

	public void setConvIp(String convIp) {
		this.convIp = convIp;
	}

	public BigDecimal getConvLong() {
		return this.convLong;
	}

	public void setConvLong(BigDecimal convLong) {
		this.convLong = convLong;
	}

	public String getConvSn() {
		return this.convSn;
	}

	public void setConvSn(String convSn) {
		this.convSn = convSn;
	}

	public String getConvTime() {
		return this.convTime;
	}

	public void setConvTime(String convTime) {
		this.convTime = convTime;
	}

	public String getConvUnit() {
		return this.convUnit;
	}

	public void setConvUnit(String convUnit) {
		this.convUnit = convUnit;
	}

}