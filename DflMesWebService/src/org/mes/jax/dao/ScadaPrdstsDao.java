package org.mes.jax.dao;

import java.util.ArrayList;
import java.util.List;

import org.codehaus.jackson.map.ObjectMapper;
import org.mes.jax.model.ScadaPrdsts;
import org.mes.jax.utils.DBHelper;

public class ScadaPrdstsDao {
	
	public String addScadaPrdsts(Object data) {
		List<Object> list = new ArrayList<Object>();
		try {
			// 反序列化json字符串
			ScadaPrdsts scadaPrdsts = new ObjectMapper().readValue(data.toString(), ScadaPrdsts.class);

			list.add(scadaPrdsts.getStsCd());
			list.add(scadaPrdsts.getStsDesc());
			list.add(scadaPrdsts.getStsEmp());
			list.add(scadaPrdsts.getStsId());
			list.add(scadaPrdsts.getStsIp());
			list.add(scadaPrdsts.getStsNo());
			list.add(scadaPrdsts.getStsSn());
			list.add(scadaPrdsts.getStsTime());
		} catch (Exception e) {
			e.printStackTrace();
			return "解析数据时发生错误！";
		}

		DBHelper dbhelper = new DBHelper();
		String sql = "insert into scada_prdsts (STS_CD,STS_DESC,STS_EMP,STS_ID,STS_IP,STS_NO,STS_SN,STS_TIME) values(?,?,?,?,?,?,?,?)";
		try {
			dbhelper.excuteUpdate(sql, list);
		} catch (Exception e) {
			e.printStackTrace();
			return "保存数据时发生错误！";
		}
		return "数据保存成功！";
	}
	
}
