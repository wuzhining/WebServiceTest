package org.mes.jax.service.impl;

import javax.jws.WebService;

import org.mes.jax.dao.ScadaStdcapDao;
import org.mes.jax.service.IScadaStdcapService;

/**
 * 标准产能
 * 
 * @author wuzhining
 *
 */
@WebService
public class ScadaStdcapService implements IScadaStdcapService {
	
	@Override
	public String addScadaStdcap(Object data) {
		return new ScadaStdcapDao().addScadaStdcap(data);
	}

}
