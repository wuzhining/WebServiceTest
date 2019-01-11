package org.mes.jax.dao;

import java.util.ArrayList;
import java.util.List;

import org.codehaus.jackson.map.ObjectMapper;
import org.mes.jax.model.ScadaStdcap;
import org.mes.jax.utils.DBHelper;

public class ScadaStdcapDao {
	
	public String addScadaStdcap(Object data) {
		List<Object> list = new ArrayList<Object>();
		try {
			if (data != null) {
				// 反序列化json字符串
				ScadaStdcap scadaStdcap = new ObjectMapper().readValue(data.toString(), ScadaStdcap.class);

				list.add(scadaStdcap.getStdcapCd());
				list.add(scadaStdcap.getStdcapEmp());
				list.add(scadaStdcap.getStdcapId());
				list.add(scadaStdcap.getStdcapIp());
				list.add(scadaStdcap.getStdcapMany());
				list.add(scadaStdcap.getStdcapSn());
				list.add(scadaStdcap.getStdcapTime());
			}
		} catch (Exception e) {
			e.printStackTrace();
			return "转化数据时出现错误！";
		}
		try {
			DBHelper dbhelper = new DBHelper();
			String sql = "insert into scada_stdcap (STDCAP_CD,STDCAP_EMP,STDCAP_ID,STDCAP_IP,STDCAP_MANY,STDCAP_SN,STDCAP_TIME) values(?,?,?,?,?,?,?)";
			dbhelper.excuteUpdate(sql, list);
		} catch (Exception e) {
			e.printStackTrace();
			return "保存数据时发生错误！";
		}
		return "数据保存成功！";
	}
	
}
