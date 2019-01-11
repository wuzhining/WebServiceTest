package org.mes.jax.service;

import javax.jws.WebMethod;

public interface IMachineListener {
	@WebMethod
	public String getMachineParam();
}
