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
		return new ScadaDfldipDao().getStart();
	}

	@Override
	public String StopService() {
		return new ScadaDfldipDao().getStop();
	}

	@Override
	public String SetTimeService() {
		return new ScadaDfldipDao().getSetTime();
	}

	@Override
	public String SetTaktService() {
		return new ScadaDfldipDao().getSetTakt();
	}

	@Override
	public String SetID() {
		return new ScadaDfldipDao().getSetId();
	}

	@Override
	public String SetIP() {
		return new ScadaDfldipDao().getSetIp();
	}
}
