package org.mes.jax.service;

import javax.jws.WebMethod;
import javax.jws.WebService;

@WebService
public interface IScadaPressService {
	@WebMethod
	public String addScadaPress(Object data);
}
