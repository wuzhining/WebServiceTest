package org.mes.jax.service;

import javax.jws.WebMethod;
import javax.jws.WebService;

@WebService
public interface IScadaProdqtyService {
	@WebMethod
	public String scadaProdqtyService(Object data);

	public String addScadaProdqty(Object data);
}
