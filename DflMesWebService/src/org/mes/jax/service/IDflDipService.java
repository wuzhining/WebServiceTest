package org.mes.jax.service;

import javax.jws.WebMethod;
import javax.jws.WebService;

@WebService
public interface IDflDipService {
	@WebMethod
	public String doService(Object data);
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
