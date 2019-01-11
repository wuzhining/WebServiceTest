package org.mes.jax.service;

import javax.jws.WebMethod;
import javax.jws.WebService;

@WebService
public interface IScadaTdowntimeService {
	@WebMethod
	public String addScadaTdowntime(Object data);
}
