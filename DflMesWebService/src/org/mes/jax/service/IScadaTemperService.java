package org.mes.jax.service;

import javax.jws.WebMethod;
import javax.jws.WebService;

@WebService
public interface IScadaTemperService {
	@WebMethod
	public String addScadaTemper(Object data);
}
