package org.mes.jax.dao;

import java.util.ArrayList;
import java.util.List;

import org.codehaus.jackson.map.ObjectMapper;
import org.mes.jax.model.ScadaPress;
import org.mes.jax.utils.DBHelper;

public class ScadaPressDao {
	
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
			String sql = "insert into scada_press (PRESS_CD,PRESS_EMP,PRESS_ID,PRESS_IP,PRESS_Many,PRESS_SN,PRESS_TIME) values(?,?,?,?,?,?,?)";
			dbhelper.excuteUpdate(sql, list);
		} catch (Exception e) {
			e.printStackTrace();
			return "保存数据时发生错误！";
		}
		return "数据保存成功！";
	}
	
}
