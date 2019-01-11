package org.mes.jax.service.impl;

import java.util.ArrayList;
import java.util.List;

import javax.jws.WebService;

import org.codehaus.jackson.map.ObjectMapper;
import org.mes.jax.model.ScadaTemper;
import org.mes.jax.service.IScadaTemperService;
import org.mes.jax.utils.DBHelper;

/**
 * 温度
 * 
 * @author wuzhining
 *
 */
@WebService
public class ScadaTemperService implements IScadaTemperService {

	@Override
	public String scadaTemperService(Object data) {
		String message = null;
		try {
			message = addScadaTemper(data);
		} catch (Exception e) {
			message = "提交数据时发生错误！";
		}
		return message;
	}

	@Override
	public String addScadaTemper(Object data) {
		List<Object> list = new ArrayList<Object>();
		try {
			if (data != null) {
				// 反序列化json字符串
				ScadaTemper scadaTemper = new ObjectMapper().readValue(data.toString(), ScadaTemper.class);

				list.add(scadaTemper.getTemperCd());
				list.add(scadaTemper.getTemperEmp());
				list.add(scadaTemper.getTemperId());
				list.add(scadaTemper.getTemperIp());
				list.add(scadaTemper.getTemperMany());
				list.add(scadaTemper.getTemperSn());
				list.add(scadaTemper.getTemperTime());
			}
		} catch (Exception e) {
			e.printStackTrace();
			return "转化数据时出现错误！";
		}
		try {
			DBHelper dbhelper = new DBHelper();
			String sql = "insert into scada_temper (TEMPER_CD,TEMPER_EMP,TEMPER_ID,TEMPER_IP,TEMPER_MANY,TEMPER_SN,TEMPER_TIME) values(?,?,?,?,?,?,?)";
			dbhelper.excuteUpdate(sql, list);
		} catch (Exception e) {
			e.printStackTrace();
			return "保存数据时发生错误！";
		}
		return "数据保存成功！";
	}

}
