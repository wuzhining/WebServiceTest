package org.mes.jax.service.impl;

import javax.jws.WebService;

import org.mes.jax.dao.ScadaBadqtyDao;
import org.mes.jax.service.IScadaBadqtyService;

/**
 * 不良品数webservice
 * 
 * @author wuzhining
 *
 */
@WebService
public class ScadaBadqtyService implements IScadaBadqtyService {

	@Override
	public String addScadaBadqty(Object data) {
		return new ScadaBadqtyDao().addScadaBadqty(data);
	}

}
