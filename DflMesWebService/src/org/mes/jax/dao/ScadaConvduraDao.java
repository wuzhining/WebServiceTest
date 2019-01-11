package org.mes.jax.dao;

import java.util.ArrayList;
import java.util.List;

import org.codehaus.jackson.map.ObjectMapper;
import org.mes.jax.model.ScadaConvdura;
import org.mes.jax.utils.DBHelper;

public class ScadaConvduraDao {
	
	public String addScadaConvdura(Object data) {
		List<Object> list = new ArrayList<Object>();
		try {
			if (data != null) {
				// 反序列化json字符串
				ScadaConvdura scadaConvdura = new ObjectMapper().readValue(data.toString(), ScadaConvdura.class);

				list.add(scadaConvdura.getConvCd());
				list.add(scadaConvdura.getConvEmp());
				list.add(scadaConvdura.getConvId());
				list.add(scadaConvdura.getConvIp());
				list.add(scadaConvdura.getConvLong());
				list.add(scadaConvdura.getConvSn());
				list.add(scadaConvdura.getConvTime());
				list.add(scadaConvdura.getConvUnit());
			}
		} catch (Exception e) {
			e.printStackTrace();
			return "转化数据时出现错误！";
		}
		try {
			DBHelper dbhelper = new DBHelper();
			String sql = "insert into scada_convdura (CONV_CD,CONV_EMP,CONV_ID,CONV_IP,CONV_LONG,CONV_SN,CONV_TIME,CONV_UNIT) values(?,?,?,?,?,?,?,?)";
			dbhelper.excuteUpdate(sql, list);
		} catch (Exception e) {
			e.printStackTrace();
			return "保存数据时发生错误！";
		}
		return "数据保存成功！";
	}
	
}
