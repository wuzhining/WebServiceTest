package org.mes.jax.service.impl;

import javax.jws.WebService;

import org.mes.jax.dao.ScadaProdduraDao;
import org.mes.jax.service.IScadaProdduraService;

/**
 * 当前转产时长webservice
 * 
 * @author wuzhining
 *
 */
@WebService
public class ScadaProdduraService implements IScadaProdduraService {
	
	@Override
	public String addScadaProddura(Object data) {
		return new ScadaProdduraDao().addScadaProddura(data);
	}

}
