package org.mes.jax.service.impl;

import javax.jws.WebMethod;
import javax.jws.WebService;

import org.mes.jax.dao.ScadaDfldipDao;
import org.mes.jax.service.IDflDipService;

@WebService
public class DflDipService implements IDflDipService {
	/**
	 * 该方法为外部程序调用的方法
	 */
	@WebMethod
	public String doService(Object data) {
		return new ScadaDfldipDao().addScadaDfldip(data);
	}

	@Override
	public String StartService() {
		return "Y";
	}

	@Override
	public String StopService() {
		return "N";
	}

	@Override
	public String SetTimeService() {
		return "";
	}

	@Override
	public String SetTaktService() {
		return "";
	}

	@Override
	public String SetID() {
		return "";
	}

	@Override
	public String SetIP() {
		return "";
	}
}
