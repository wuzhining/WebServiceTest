package org.mes.jax.service.impl;

import javax.jws.WebService;

import org.mes.jax.dao.ScadaGoodqtyDao;
import org.mes.jax.service.IScadaGoodqtyService;

/**
 * 良品数webservice
 * 
 * @author wuzhining
 *
 */
@WebService
public class ScadaGoodqtyService implements IScadaGoodqtyService {
	
	@Override
	public String addScadaGoodqty(Object data) {
		return new ScadaGoodqtyDao().addScadaGoodqty(data);
	}

}
