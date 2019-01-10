package org.mes.jax.model;

import java.io.Serializable;
import java.math.BigDecimal;


/**
 * The persistent class for the SCADA_TAKT database table.
 * 
 */
public class ScadaTakt implements Serializable {
	private static final long serialVersionUID = 1L;

	private String taktCd;

	private String taktEmp;

	private BigDecimal taktId;

	private String taktIp;

	private BigDecimal taktMany;

	private String taktSn;

	private String taktTime;

	public ScadaTakt() {
	}

	public String getTaktCd() {
		return this.taktCd;
	}

	public void setTaktCd(String taktCd) {
		this.taktCd = taktCd;
	}

	public String getTaktEmp() {
		return this.taktEmp;
	}

	public void setTaktEmp(String taktEmp) {
		this.taktEmp = taktEmp;
	}

	public BigDecimal getTaktId() {
		return this.taktId;
	}

	public void setTaktId(BigDecimal taktId) {
		this.taktId = taktId;
	}

	public String getTaktIp() {
		return this.taktIp;
	}

	public void setTaktIp(String taktIp) {
		this.taktIp = taktIp;
	}

	public BigDecimal getTaktMany() {
		return this.taktMany;
	}

	public void setTaktMany(BigDecimal taktMany) {
		this.taktMany = taktMany;
	}

	public String getTaktSn() {
		return this.taktSn;
	}

	public void setTaktSn(String taktSn) {
		this.taktSn = taktSn;
	}

	public String getTaktTime() {
		return this.taktTime;
	}

	public void setTaktTime(String taktTime) {
		this.taktTime = taktTime;
	}

}