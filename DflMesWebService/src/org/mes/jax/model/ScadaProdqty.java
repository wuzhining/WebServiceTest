package org.mes.jax.model;

import java.io.Serializable;
import java.math.BigDecimal;


/**
 * The persistent class for the SCADA_PRODQTY database table.
 * 
 */
public class ScadaProdqty implements Serializable {
	private static final long serialVersionUID = 1L;

	private String prodCd;

	private String prodEmp;

	private BigDecimal prodId;

	private String prodIp;

	private BigDecimal prodQty;

	private String prodSn;

	private String prodTime;

	public ScadaProdqty() {
	}

	public String getProdCd() {
		return this.prodCd;
	}

	public void setProdCd(String prodCd) {
		this.prodCd = prodCd;
	}

	public String getProdEmp() {
		return this.prodEmp;
	}

	public void setProdEmp(String prodEmp) {
		this.prodEmp = prodEmp;
	}

	public BigDecimal getProdId() {
		return this.prodId;
	}

	public void setProdId(BigDecimal prodId) {
		this.prodId = prodId;
	}

	public String getProdIp() {
		return this.prodIp;
	}

	public void setProdIp(String prodIp) {
		this.prodIp = prodIp;
	}

	public BigDecimal getProdQty() {
		return this.prodQty;
	}

	public void setProdQty(BigDecimal prodQty) {
		this.prodQty = prodQty;
	}

	public String getProdSn() {
		return this.prodSn;
	}

	public void setProdSn(String prodSn) {
		this.prodSn = prodSn;
	}

	public String getProdTime() {
		return this.prodTime;
	}

	public void setProdTime(String prodTime) {
		this.prodTime = prodTime;
	}

}