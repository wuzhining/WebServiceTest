package org.mes.jax.service.impl;

import javax.jws.WebService;

import org.mes.jax.dao.ScadaTdowntimeDao;
import org.mes.jax.service.IScadaTdowntimeService;

/**
 * 总停机时长
 * 
 * @author wuzhining
 *
 */
@WebService
public class ScadaTdowntimeService implements IScadaTdowntimeService {
	
	@Override
	public String addScadaTdowntime(Object data) {
		return new ScadaTdowntimeDao().addScadaTdowntime(data);
	}

}
