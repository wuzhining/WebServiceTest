package org.mes.jax.service;

import javax.jws.WebMethod;
import javax.jws.WebService;

@WebService
public interface IScadaTprodduraService {
	@WebMethod
	public String scadaTprodduraService(Object data);

	public String addScadaTproddura(Object data);
}
