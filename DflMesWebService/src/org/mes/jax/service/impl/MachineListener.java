package org.mes.jax.service.impl;

import javax.jws.WebService;

import org.mes.jax.dao.ScadaParamDao;
import org.mes.jax.service.IMachineListener;
/**
 * 设备监控
 * @author wuzhining
 *
 */
@WebService
public class MachineListener implements IMachineListener {

	@Override
	public String getMachineParam() {
		return new ScadaParamDao().getMachineParams();
	}

}
