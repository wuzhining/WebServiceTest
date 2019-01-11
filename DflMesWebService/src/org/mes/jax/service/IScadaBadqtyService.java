package org.mes.jax.service;

import javax.jws.WebMethod;
import javax.jws.WebService;

@WebService
public interface IScadaBadqtyService {
	@WebMethod
	String addScadaBadqty(Object data);
}
