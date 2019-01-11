package org.mes.jax.dao;

import java.util.ArrayList;
import java.util.List;

import org.codehaus.jackson.map.ObjectMapper;
import org.mes.jax.model.ScadaProddura;
import org.mes.jax.utils.DBHelper;

public class ScadaProdduraDao {
	
	public String addScadaProddura(Object data) {
		List<Object> list = new ArrayList<Object>();
		try {
			if (data != null) {
				// 反序列化json字符串
				ScadaProddura scadaProddura = new ObjectMapper().readValue(data.toString(), ScadaProddura.class);

				list.add(scadaProddura.getDuraCd());
				list.add(scadaProddura.getDuraEmp());
				list.add(scadaProddura.getDuraId());
				list.add(scadaProddura.getDuraIp());
				list.add(scadaProddura.getDuraLong());
				list.add(scadaProddura.getDuraSn());
				list.add(scadaProddura.getDuraTime());
				list.add(scadaProddura.getDuraUnit());
			}
		} catch (Exception e) {
			e.printStackTrace();
			return "转化数据时出现错误！";
		}
		try {
			DBHelper dbhelper = new DBHelper();
			String sql = "insert into scada_proddura (DURA_CD,DURA_EMP,DURA_ID,DURA_IP,DURA_LONG,DURA_SN,DURA_TIME,DURA_UNIT) values(?,?,?,?,?,?,?,?)";
			dbhelper.excuteUpdate(sql, list);
		} catch (Exception e) {
			e.printStackTrace();
			return "保存数据时发生错误！";
		}
		return "数据保存成功！";
	}
	
}
