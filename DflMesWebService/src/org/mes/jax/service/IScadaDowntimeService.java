package org.mes.jax.service;

import javax.jws.WebMethod;
import javax.jws.WebService;

@WebService
public interface IScadaDowntimeService {
	@WebMethod
	public String addScadaDowntime(Object data);
}
