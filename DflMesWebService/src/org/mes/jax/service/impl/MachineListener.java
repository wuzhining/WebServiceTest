package org.mes.jax.service.impl;

import javax.jws.WebService;

import org.mes.jax.dao.ScadaParamDao;
import org.mes.jax.service.IMachineListener;

/**
 * 设备监控
 * 
 * @author wuzhining
 *
 */
@WebService
public class MachineListener implements IMachineListener {

	@Override
	public String getMachineParam() {
		return new ScadaParamDao().getMachineParams();
	}

	@Override
	public String StartService() {
		return new ScadaParamDao().getStart();
	}

	@Override
	public String StopService() {
		return new ScadaParamDao().getStop();
	}

	@Override
	public String SetTimeService() {
		return new ScadaParamDao().getSetTime();
	}

	@Override
	public String SetTaktService() {
		return new ScadaParamDao().getSetTakt();
	}

	@Override
	public String SetID() {
		return new ScadaParamDao().getSetId();
	}

	@Override
	public String SetIP() {
		return new ScadaParamDao().getSetIp();
	}

}
