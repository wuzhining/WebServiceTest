package org.mes.jax.service;

import javax.jws.WebMethod;
import javax.jws.WebService;

@WebService
public interface IScadaStdcapService {
	@WebMethod
	public String addScadaStdcap(Object data);
}
