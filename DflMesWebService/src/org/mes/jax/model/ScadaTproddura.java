package org.mes.jax.model;

import java.io.Serializable;
import java.math.BigDecimal;


/**
 * The persistent class for the SCADA_TPRODDURA database table.
 * 
 */
public class ScadaTproddura implements Serializable {
	private static final long serialVersionUID = 1L;

	private String tduraCd;

	private String tduraEmp;

	private BigDecimal tduraId;

	private String tduraIp;

	private BigDecimal tduraLong;

	private String tduraSn;

	private String tduraTime;

	private String tduraUnit;

	public ScadaTproddura() {
	}

	public String getTduraCd() {
		return this.tduraCd;
	}

	public void setTduraCd(String tduraCd) {
		this.tduraCd = tduraCd;
	}

	public String getTduraEmp() {
		return this.tduraEmp;
	}

	public void setTduraEmp(String tduraEmp) {
		this.tduraEmp = tduraEmp;
	}

	public BigDecimal getTduraId() {
		return this.tduraId;
	}

	public void setTduraId(BigDecimal tduraId) {
		this.tduraId = tduraId;
	}

	public String getTduraIp() {
		return this.tduraIp;
	}

	public void setTduraIp(String tduraIp) {
		this.tduraIp = tduraIp;
	}

	public BigDecimal getTduraLong() {
		return this.tduraLong;
	}

	public void setTduraLong(BigDecimal tduraLong) {
		this.tduraLong = tduraLong;
	}

	public String getTduraSn() {
		return this.tduraSn;
	}

	public void setTduraSn(String tduraSn) {
		this.tduraSn = tduraSn;
	}

	public String getTduraTime() {
		return this.tduraTime;
	}

	public void setTduraTime(String tduraTime) {
		this.tduraTime = tduraTime;
	}

	public String getTduraUnit() {
		return this.tduraUnit;
	}

	public void setTduraUnit(String tduraUnit) {
		this.tduraUnit = tduraUnit;
	}

}