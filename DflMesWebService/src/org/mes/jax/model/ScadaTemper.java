package org.mes.jax.model;

import java.io.Serializable;
import java.math.BigDecimal;


/**
 * The persistent class for the SCADA_TEMPER database table.
 * 
 */
public class ScadaTemper implements Serializable {
	private static final long serialVersionUID = 1L;

	private String temperCd;

	private String temperEmp;

	private BigDecimal temperId;

	private String temperIp;

	private BigDecimal temperMany;

	private String temperSn;

	private String temperTime;

	public ScadaTemper() {
	}

	public String getTemperCd() {
		return this.temperCd;
	}

	public void setTemperCd(String temperCd) {
		this.temperCd = temperCd;
	}

	public String getTemperEmp() {
		return this.temperEmp;
	}

	public void setTemperEmp(String temperEmp) {
		this.temperEmp = temperEmp;
	}

	public BigDecimal getTemperId() {
		return this.temperId;
	}

	public void setTemperId(BigDecimal temperId) {
		this.temperId = temperId;
	}

	public String getTemperIp() {
		return this.temperIp;
	}

	public void setTemperIp(String temperIp) {
		this.temperIp = temperIp;
	}

	public BigDecimal getTemperMany() {
		return this.temperMany;
	}

	public void setTemperMany(BigDecimal temperMany) {
		this.temperMany = temperMany;
	}

	public String getTemperSn() {
		return this.temperSn;
	}

	public void setTemperSn(String temperSn) {
		this.temperSn = temperSn;
	}

	public String getTemperTime() {
		return this.temperTime;
	}

	public void setTemperTime(String temperTime) {
		this.temperTime = temperTime;
	}

}