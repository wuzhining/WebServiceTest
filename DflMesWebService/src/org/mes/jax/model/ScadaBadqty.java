package org.mes.jax.model;

import java.io.Serializable;
import java.math.BigDecimal;


/**
 * The persistent class for the SCADA_BADQTY database table.
 * 
 */
public class ScadaBadqty implements Serializable {
	private static final long serialVersionUID = 1L;

	private String badCd;

	private String badEmp;

	private BigDecimal badId;

	private String badIp;

	private BigDecimal badQty;

	private String badSn;

	private String badTime;

	public ScadaBadqty() {
	}

	public String getBadCd() {
		return this.badCd;
	}

	public void setBadCd(String badCd) {
		this.badCd = badCd;
	}

	public String getBadEmp() {
		return this.badEmp;
	}

	public void setBadEmp(String badEmp) {
		this.badEmp = badEmp;
	}

	public BigDecimal getBadId() {
		return this.badId;
	}

	public void setBadId(BigDecimal badId) {
		this.badId = badId;
	}

	public String getBadIp() {
		return this.badIp;
	}

	public void setBadIp(String badIp) {
		this.badIp = badIp;
	}

	public BigDecimal getBadQty() {
		return this.badQty;
	}

	public void setBadQty(BigDecimal badQty) {
		this.badQty = badQty;
	}

	public String getBadSn() {
		return this.badSn;
	}

	public void setBadSn(String badSn) {
		this.badSn = badSn;
	}

	public String getBadTime() {
		return this.badTime;
	}

	public void setBadTime(String badTime) {
		this.badTime = badTime;
	}

}