package org.mes.jax.service.impl;

import javax.jws.WebService;

import org.mes.jax.dao.ScadaTemperDao;
import org.mes.jax.service.IScadaTemperService;

/**
 * 温度
 * 
 * @author wuzhining
 *
 */
@WebService
public class ScadaTemperService implements IScadaTemperService {

	@Override
	public String addScadaTemper(Object data) {
		return new ScadaTemperDao().addScadaTemper(data);
	}

}
