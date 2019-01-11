package org.mes.jax.service.impl;

import java.util.ArrayList;
import java.util.List;

import javax.jws.WebService;

import org.codehaus.jackson.map.ObjectMapper;
import org.mes.jax.model.ScadaTakt;
import org.mes.jax.service.IScadaTaktService;
import org.mes.jax.utils.DBHelper;

/**
 * 生产节拍
 * 
 * @author wuzhining
 *
 */
@WebService
public class ScadaTaktService implements IScadaTaktService {

	@Override
	public String scadaTaktService(Object data) {
		String message = null;
		try {
			message = addScadaTakt(data);
		} catch (Exception e) {
			message = "提交数据时发生错误！";
		}
		return message;
	}

	@Override
	public String addScadaTakt(Object data) {
		List<Object> list = new ArrayList<Object>();
		try {
			if (data != null) {
				// 反序列化json字符串
				ScadaTakt scadaTakt = new ObjectMapper().readValue(data.toString(), ScadaTakt.class);

				list.add(scadaTakt.getTaktCd());
				list.add(scadaTakt.getTaktEmp());
				list.add(scadaTakt.getTaktId());
				list.add(scadaTakt.getTaktIp());
				list.add(scadaTakt.getTaktMany());
				list.add(scadaTakt.getTaktSn());
				list.add(scadaTakt.getTaktTime());
			}
		} catch (Exception e) {
			e.printStackTrace();
			return "转化数据时出现错误！";
		}
		try {
			DBHelper dbhelper = new DBHelper();
			String sql = "insert into scada_takt (TAKT_CD,TAKT_EMP,TAKT_ID,TAKT_IP,TAKT_QTY,TAKT_SN,TAKT_TIME) values(?,?,?,?,?,?,?)";
			dbhelper.excuteUpdate(sql, list);
		} catch (Exception e) {
			e.printStackTrace();
			return "保存数据时发生错误！";
		}
		return "数据保存成功！";
	}

}
