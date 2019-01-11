package org.mes.jax.service.impl;

import javax.jws.WebService;

import org.mes.jax.dao.ScadaTprodduraDao;
import org.mes.jax.service.IScadaTprodduraService;

/**
 * 总生产时长
 * 
 * @author wuzhining
 *
 */
@WebService
public class ScadaTprodduraService implements IScadaTprodduraService {

	@Override
	public String addScadaTproddura(Object data) {
		return new ScadaTprodduraDao().addScadaTproddura(data);
	}

}
