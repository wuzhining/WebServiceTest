package org.mes.jax.service.impl;

import java.util.ArrayList;
import java.util.List;

import javax.jws.WebService;

import org.codehaus.jackson.map.ObjectMapper;
import org.mes.jax.model.ScadaPress;
import org.mes.jax.model.ScadaTemper;
import org.mes.jax.service.IScadaPressService;
import org.mes.jax.utils.DBHelper;

/**
 * 压力
 * 
 * @author wuzhining
 *
 */
@WebService
public class ScadaPressService implements IScadaPressService {

	@Override
	public String scadaPressService(Object data) {
		String message = null;
		try {
			message = addScadaPress(data);
		} catch (Exception e) {
			message = "提交数据时发生错误！";
		}
		return message;
	}

	@Override
	public String addScadaPress(Object data) {
		List<Object> list = new ArrayList<Object>();
		try {
			if (data != null) {
				// 反序列化json字符串
				ScadaPress scadaPress = new ObjectMapper().readValue(data.toString(), ScadaPress.class);

				list.add(scadaPress.getPressCd());
				list.add(scadaPress.getPressEmp());
				list.add(scadaPress.getPressId());
				list.add(scadaPress.getPressIp());
				list.add(scadaPress.getPressMany());
				list.add(scadaPress.getPressSn());
				list.add(scadaPress.getPressTime());
			}
		} catch (Exception e) {
			e.printStackTrace();
			return "转化数据时出现错误！";
		}
		try {
			DBHelper dbhelper = new DBHelper();
			String sql = "insert into scada_press (PRESS_CD,PRESS_EMP,PRESS_ID,PRESS_IP,PRESS_QTY,PRESS_SN,PRESS_TIME) values(?,?,?,?,?,?,?)";
			dbhelper.excuteUpdate(sql, list);
		} catch (Exception e) {
			e.printStackTrace();
			return "保存数据时发生错误！";
		}
		return "数据保存成功！";
	}

}
