package org.mes.jax.model;

import java.io.Serializable;
import java.util.Date;


/**
 * The persistent class for the SCADA_PARAM database table.
 * 
 */
public class ScadaParam implements Serializable {
	private static final long serialVersionUID = 1L;

	private long paramId;

	private Date paramCreatdate;

	private String paramCreator;

	private String paramDesc;

	private String paramModifier;

	private Date paramModifydate;

	private String paramName;

	private String paramType;

	private String paramValarea;

	public ScadaParam() {
	}

	public long getParamId() {
		return this.paramId;
	}

	public void setParamId(long paramId) {
		this.paramId = paramId;
	}

	public Date getParamCreatdate() {
		return this.paramCreatdate;
	}

	public void setParamCreatdate(Date paramCreatdate) {
		this.paramCreatdate = paramCreatdate;
	}

	public String getParamCreator() {
		return this.paramCreator;
	}

	public void setParamCreator(String paramCreator) {
		this.paramCreator = paramCreator;
	}

	public String getParamDesc() {
		return this.paramDesc;
	}

	public void setParamDesc(String paramDesc) {
		this.paramDesc = paramDesc;
	}

	public String getParamModifier() {
		return this.paramModifier;
	}

	public void setParamModifier(String paramModifier) {
		this.paramModifier = paramModifier;
	}

	public Date getParamModifydate() {
		return this.paramModifydate;
	}

	public void setParamModifydate(Date paramModifydate) {
		this.paramModifydate = paramModifydate;
	}

	public String getParamName() {
		return this.paramName;
	}

	public void setParamName(String paramName) {
		this.paramName = paramName;
	}

	public String getParamType() {
		return this.paramType;
	}

	public void setParamType(String paramType) {
		this.paramType = paramType;
	}

	public String getParamValarea() {
		return this.paramValarea;
	}

	public void setParamValarea(String paramValarea) {
		this.paramValarea = paramValarea;
	}

}