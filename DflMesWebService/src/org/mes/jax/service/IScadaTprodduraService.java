package org.mes.jax.service;

import javax.jws.WebMethod;
import javax.jws.WebService;

@WebService
public interface IScadaTprodduraService {
	@WebMethod
	public String addScadaTproddura(Object data);
}
