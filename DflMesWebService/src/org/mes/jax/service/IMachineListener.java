package org.mes.jax.service;

import javax.jws.WebMethod;

public interface IMachineListener {
	@WebMethod
	public String getMachineParam();
	@WebMethod
	public String StartService();
	@WebMethod
	public String StopService();
	@WebMethod
	public String SetTimeService();
	@WebMethod
	public String SetTaktService();
	@WebMethod
	public String SetID();
	@WebMethod
	public String SetIP();
}
