package org.mes.jax.model;

import java.io.Serializable;
import java.math.BigDecimal;


/**
 * The persistent class for the SCADA_STDCAP database table.
 * 
 */
public class ScadaStdcap implements Serializable {
	private static final long serialVersionUID = 1L;

	private String stdcapCd;

	private String stdcapEmp;

	private BigDecimal stdcapId;

	private String stdcapIp;

	private BigDecimal stdcapMany;

	private String stdcapSn;

	private String stdcapTime;

	public ScadaStdcap() {
	}

	public String getStdcapCd() {
		return this.stdcapCd;
	}

	public void setStdcapCd(String stdcapCd) {
		this.stdcapCd = stdcapCd;
	}

	public String getStdcapEmp() {
		return this.stdcapEmp;
	}

	public void setStdcapEmp(String stdcapEmp) {
		this.stdcapEmp = stdcapEmp;
	}

	public BigDecimal getStdcapId() {
		return this.stdcapId;
	}

	public void setStdcapId(BigDecimal stdcapId) {
		this.stdcapId = stdcapId;
	}

	public String getStdcapIp() {
		return this.stdcapIp;
	}

	public void setStdcapIp(String stdcapIp) {
		this.stdcapIp = stdcapIp;
	}

	public BigDecimal getStdcapMany() {
		return this.stdcapMany;
	}

	public void setStdcapMany(BigDecimal stdcapMany) {
		this.stdcapMany = stdcapMany;
	}

	public String getStdcapSn() {
		return this.stdcapSn;
	}

	public void setStdcapSn(String stdcapSn) {
		this.stdcapSn = stdcapSn;
	}

	public String getStdcapTime() {
		return this.stdcapTime;
	}

	public void setStdcapTime(String stdcapTime) {
		this.stdcapTime = stdcapTime;
	}

}