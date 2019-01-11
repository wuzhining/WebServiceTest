package org.mes.jax.service.impl;

import javax.jws.WebService;

import org.mes.jax.dao.ScadaProdqtyDao;
import org.mes.jax.service.IScadaProdqtyService;

/**
 * 生产数量webservice
 * 
 * @author wuzhining
 *
 */
@WebService
public class ScadaProdqtyService implements IScadaProdqtyService {
	
	@Override
	public String addScadaProdqty(Object data) {
		return new ScadaProdqtyDao().addScadaProdqty(data);
	}

}
