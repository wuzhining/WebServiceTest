package org.mes.jax.service.impl;

import javax.jws.WebService;

import org.mes.jax.dao.ScadaPressDao;
import org.mes.jax.service.IScadaPressService;

/**
 * 压力
 * 
 * @author wuzhining
 *
 */
@WebService
public class ScadaPressService implements IScadaPressService {
	
	@Override
	public String addScadaPress(Object data) {
		return new ScadaPressDao().addScadaPress(data);
	}

}
