package org.mes.jax.service;

import javax.jws.WebMethod;
import javax.jws.WebService;

@WebService
public interface IScadaPrdstsService {
	@WebMethod
	public String addScadaPrdsts(Object data);
}
