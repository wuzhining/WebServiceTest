package org.mes.jax.model;

import java.io.Serializable;
import java.math.BigDecimal;


/**
 * The persistent class for the SCADA_PRODDURA database table.
 * 
 */
public class ScadaProddura implements Serializable {
	private static final long serialVersionUID = 1L;

	private String duraCd;

	private String duraEmp;

	private BigDecimal duraId;

	private String duraIp;

	private BigDecimal duraLong;

	private String duraSn;

	private String duraTime;

	private String duraUnit;

	public ScadaProddura() {
	}

	public String getDuraCd() {
		return this.duraCd;
	}

	public void setDuraCd(String duraCd) {
		this.duraCd = duraCd;
	}

	public String getDuraEmp() {
		return this.duraEmp;
	}

	public void setDuraEmp(String duraEmp) {
		this.duraEmp = duraEmp;
	}

	public BigDecimal getDuraId() {
		return this.duraId;
	}

	public void setDuraId(BigDecimal duraId) {
		this.duraId = duraId;
	}

	public String getDuraIp() {
		return this.duraIp;
	}

	public void setDuraIp(String duraIp) {
		this.duraIp = duraIp;
	}

	public BigDecimal getDuraLong() {
		return this.duraLong;
	}

	public void setDuraLong(BigDecimal duraLong) {
		this.duraLong = duraLong;
	}

	public String getDuraSn() {
		return this.duraSn;
	}

	public void setDuraSn(String duraSn) {
		this.duraSn = duraSn;
	}

	public String getDuraTime() {
		return this.duraTime;
	}

	public void setDuraTime(String duraTime) {
		this.duraTime = duraTime;
	}

	public String getDuraUnit() {
		return this.duraUnit;
	}

	public void setDuraUnit(String duraUnit) {
		this.duraUnit = duraUnit;
	}

}