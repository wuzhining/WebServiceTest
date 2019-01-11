package org.mes.jax.service.impl;

import javax.jws.WebService;

import org.mes.jax.dao.ScadaPrdstsDao;
import org.mes.jax.service.IScadaPrdstsService;

/**
 * 生产状态webservice
 * 
 * @author wuzhining
 *
 */
@WebService
public class ScadaPrdstsService implements IScadaPrdstsService {
	
	@Override
	public String addScadaPrdsts(Object data) {
		return new ScadaPrdstsDao().addScadaPrdsts(data);
	}

}
