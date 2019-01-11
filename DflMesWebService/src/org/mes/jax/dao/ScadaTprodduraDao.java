package org.mes.jax.dao;

import java.util.ArrayList;
import java.util.List;

import org.codehaus.jackson.map.ObjectMapper;
import org.mes.jax.model.ScadaTproddura;
import org.mes.jax.utils.DBHelper;

public class ScadaTprodduraDao {
	
	public String addScadaTproddura(Object data) {
		List<Object> list = new ArrayList<Object>();
		try {
			if (data != null) {
				// 反序列化json字符串
				ScadaTproddura scadaTproddura = new ObjectMapper().readValue(data.toString(), ScadaTproddura.class);

				list.add(scadaTproddura.getTduraCd());
				list.add(scadaTproddura.getTduraEmp());
				list.add(scadaTproddura.getTduraId());
				list.add(scadaTproddura.getTduraIp());
				list.add(scadaTproddura.getTduraLong());
				list.add(scadaTproddura.getTduraSn());
				list.add(scadaTproddura.getTduraTime());
				list.add(scadaTproddura.getTduraUnit());
			}
		} catch (Exception e) {
			e.printStackTrace();
			return "转化数据时出现错误！";
		}
		try {
			DBHelper dbhelper = new DBHelper();
			String sql = "insert into scada_tproddura (TDURA_CD,TDURA_EMP,TDURA_ID,TDURA_IP,TDURA_LONG,TDURA_SN,TDURA_TIME,TDURA_UNIT) values(?,?,?,?,?,?,?,?)";
			dbhelper.excuteUpdate(sql, list);
		} catch (Exception e) {
			e.printStackTrace();
			return "保存数据时发生错误！";
		}
		return "数据保存成功！";
	}
	
}
