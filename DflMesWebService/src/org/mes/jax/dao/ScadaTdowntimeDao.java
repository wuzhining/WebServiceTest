package org.mes.jax.dao;

import java.util.ArrayList;
import java.util.List;

import org.codehaus.jackson.map.ObjectMapper;
import org.mes.jax.model.ScadaTdowntime;
import org.mes.jax.utils.DBHelper;

public class ScadaTdowntimeDao {
	
	public String addScadaTdowntime(Object data) {
		List<Object> list = new ArrayList<Object>();
		try {
			if (data != null) {
				// 反序列化json字符串
				ScadaTdowntime scadaTdowntime = new ObjectMapper().readValue(data.toString(), ScadaTdowntime.class);

				list.add(scadaTdowntime.getTdownCd());
				list.add(scadaTdowntime.getTdownEmp());
				list.add(scadaTdowntime.getTdownId());
				list.add(scadaTdowntime.getTdownIp());
				list.add(scadaTdowntime.getTdownLong());
				list.add(scadaTdowntime.getTdownSn());
				list.add(scadaTdowntime.getTdownTime());
				list.add(scadaTdowntime.getTdownUnit());
			}
		} catch (Exception e) {
			e.printStackTrace();
			return "转化数据时出现错误！";
		}
		try {
			DBHelper dbhelper = new DBHelper();
			String sql = "insert into scada_tdowntime (TDOWN_CD,TDOWN_EMP,TDOWN_ID,TDOWN_IP,TDOWN_LONG,TDOWN_SN,TDOWN_TIME,TDOWN_UNIT) values(?,?,?,?,?,?,?,?)";
			dbhelper.excuteUpdate(sql, list);
		} catch (Exception e) {
			e.printStackTrace();
			return "保存数据时发生错误！";
		}
		return "数据保存成功！";
	}
	
}
