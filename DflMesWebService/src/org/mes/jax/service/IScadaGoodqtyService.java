package org.mes.jax.service;

import javax.jws.WebMethod;
import javax.jws.WebService;

@WebService
public interface IScadaGoodqtyService {
	@WebMethod
	public String addScadaGoodqty(Object data);
}
