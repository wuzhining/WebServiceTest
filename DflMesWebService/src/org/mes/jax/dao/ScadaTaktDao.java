package org.mes.jax.dao;

import java.util.ArrayList;
import java.util.List;

import org.codehaus.jackson.map.ObjectMapper;
import org.mes.jax.model.ScadaTakt;
import org.mes.jax.utils.DBHelper;

public class ScadaTaktDao {
	
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
			String sql = "insert into scada_takt (TAKT_CD,TAKT_EMP,TAKT_ID,TAKT_IP,TAKT_MANY,TAKT_SN,TAKT_TIME) values(?,?,?,?,?,?,?)";
			dbhelper.excuteUpdate(sql, list);
		} catch (Exception e) {
			e.printStackTrace();
			return "保存数据时发生错误！";
		}
		return "数据保存成功！";
	}
	
}
