package org.mes.jax.service;

import javax.jws.WebMethod;
import javax.jws.WebService;

@WebService
public interface IScadaTaktService {
	@WebMethod
	public String addScadaTakt(Object data);
}