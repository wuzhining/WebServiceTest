package org.mes.jax.service;

import javax.jws.WebMethod;
import javax.jws.WebService;

@WebService
public interface IScadaProdduraService {
	@WebMethod
	public String addScadaProddura(Object data);
}
