package org.mes.jax.service;

import javax.jws.WebMethod;
import javax.jws.WebService;

@WebService
public interface IScadaPressService {
	@WebMethod
	public String scadaPressService(Object data);

	public String addScadaPress(Object data);
}
