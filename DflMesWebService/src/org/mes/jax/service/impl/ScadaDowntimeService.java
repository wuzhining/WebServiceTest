package org.mes.jax.service.impl;

import javax.jws.WebService;

import org.mes.jax.dao.ScadaDowntimeDao;
import org.mes.jax.service.IScadaDowntimeService;

/**
 * 当前停机时长
 * 
 * @author wuzhining
 *
 */
@WebService
public class ScadaDowntimeService implements IScadaDowntimeService {
	
	@Override
	public String addScadaDowntime(Object data) {
		return new ScadaDowntimeDao().addScadaDowntime(data);
	}

}
