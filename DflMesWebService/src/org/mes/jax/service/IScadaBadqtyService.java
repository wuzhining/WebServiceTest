package org.mes.jax.service;

import javax.jws.WebMethod;
import javax.jws.WebService;

@WebService
public interface IScadaBadqtyService {
	@WebMethod
	public String scadaBadqtyService(Object data);

	String addScadaBadqty(Object data);
}
