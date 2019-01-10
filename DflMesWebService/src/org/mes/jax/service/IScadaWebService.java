package org.mes.jax.service;

import javax.jws.WebMethod;
import javax.jws.WebService;

@WebService
public interface IScadaWebService {
	@WebMethod
	public String doService(Object data);
}
