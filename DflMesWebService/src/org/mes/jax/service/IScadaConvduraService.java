package org.mes.jax.service;

import javax.jws.WebMethod;
import javax.jws.WebService;

@WebService
public interface IScadaConvduraService {
	@WebMethod
	public String scadaConvduraService(Object data);

	public String addScadaConvdura(Object data);
}
