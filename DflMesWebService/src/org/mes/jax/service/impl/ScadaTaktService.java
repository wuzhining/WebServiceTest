package org.mes.jax.service.impl;

import javax.jws.WebService;

import org.mes.jax.dao.ScadaTaktDao;
import org.mes.jax.service.IScadaTaktService;

/**
 * 生产节拍
 * 
 * @author wuzhining
 *
 */
@WebService
public class ScadaTaktService implements IScadaTaktService {
	
	@Override
	public String addScadaTakt(Object data) {
		return new ScadaTaktDao().addScadaTakt(data);
	}

}
