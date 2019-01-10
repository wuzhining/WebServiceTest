package org.mes.jax.model;

import java.io.Serializable;
import java.math.BigDecimal;


/**
 * The persistent class for the SCADA_PRESS database table.
 * 
 */
public class ScadaPress implements Serializable {
	private static final long serialVersionUID = 1L;

	private String pressCd;

	private String pressEmp;

	private BigDecimal pressId;

	private String pressIp;

	private BigDecimal pressMany;

	private String pressSn;

	private String pressTime;

	public ScadaPress() {
	}

	public String getPressCd() {
		return this.pressCd;
	}

	public void setPressCd(String pressCd) {
		this.pressCd = pressCd;
	}

	public String getPressEmp() {
		return this.pressEmp;
	}

	public void setPressEmp(String pressEmp) {
		this.pressEmp = pressEmp;
	}

	public BigDecimal getPressId() {
		return this.pressId;
	}

	public void setPressId(BigDecimal pressId) {
		this.pressId = pressId;
	}

	public String getPressIp() {
		return this.pressIp;
	}

	public void setPressIp(String pressIp) {
		this.pressIp = pressIp;
	}

	public BigDecimal getPressMany() {
		return this.pressMany;
	}

	public void setPressMany(BigDecimal pressMany) {
		this.pressMany = pressMany;
	}

	public String getPressSn() {
		return this.pressSn;
	}

	public void setPressSn(String pressSn) {
		this.pressSn = pressSn;
	}

	public String getPressTime() {
		return this.pressTime;
	}

	public void setPressTime(String pressTime) {
		this.pressTime = pressTime;
	}

}