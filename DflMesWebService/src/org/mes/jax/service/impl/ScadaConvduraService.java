package org.mes.jax.service.impl;

import javax.jws.WebService;

import org.mes.jax.dao.ScadaConvduraDao;
import org.mes.jax.service.IScadaConvduraService;

/**
 * 转产时长webservice
 * 
 * @author wuzhining
 *
 */
@WebService
public class ScadaConvduraService implements IScadaConvduraService {
	
	@Override
	public String addScadaConvdura(Object data) {
		return new ScadaConvduraDao().addScadaConvdura(data);
	}

}
