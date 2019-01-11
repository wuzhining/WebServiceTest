package org.mes.jax.service;

import javax.jws.WebMethod;
import javax.jws.WebService;

@WebService
public interface IScadaDowntimeService {
	@WebMethod
	public String scadaDowntimeService(Object data);

	public String addScadaDowntime(Object data);
}
