package org.mes.jax.model;

import java.io.Serializable;
import java.math.BigDecimal;

/**
 * The persistent class for the SCADA_GOODQTY database table.
 * 
 */
public class ScadaGoodqty implements Serializable {
	private static final long serialVersionUID = 1L;

	private String goodCd;

	private String goodEmp;

	private BigDecimal goodId;

	private String goodIp;

	private BigDecimal goodQty;

	private String goodSn;

	private String goodTime;

	public ScadaGoodqty() {
	}

	public String getGoodCd() {
		return this.goodCd;
	}

	public void setGoodCd(String goodCd) {
		this.goodCd = goodCd;
	}

	public String getGoodEmp() {
		return this.goodEmp;
	}

	public void setGoodEmp(String goodEmp) {
		this.goodEmp = goodEmp;
	}

	public BigDecimal getGoodId() {
		return this.goodId;
	}

	public void setGoodId(BigDecimal goodId) {
		this.goodId = goodId;
	}

	public String getGoodIp() {
		return this.goodIp;
	}

	public void setGoodIp(String goodIp) {
		this.goodIp = goodIp;
	}

	public BigDecimal getGoodQty() {
		return this.goodQty;
	}

	public void setGoodQty(BigDecimal goodQty) {
		this.goodQty = goodQty;
	}

	public String getGoodSn() {
		return this.goodSn;
	}

	public void setGoodSn(String goodSn) {
		this.goodSn = goodSn;
	}

	public String getGoodTime() {
		return this.goodTime;
	}

	public void setGoodTime(String goodTime) {
		this.goodTime = goodTime;
	}

}