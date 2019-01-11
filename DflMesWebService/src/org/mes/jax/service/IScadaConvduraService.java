package org.mes.jax.service;

import javax.jws.WebMethod;
import javax.jws.WebService;

@WebService
public interface IScadaConvduraService {
	@WebMethod
	public String addScadaConvdura(Object data);
}
