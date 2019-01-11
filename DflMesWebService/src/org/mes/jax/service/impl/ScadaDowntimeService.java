package org.mes.jax.service.impl;

import java.util.ArrayList;
import java.util.List;

import javax.jws.WebService;

import org.codehaus.jackson.map.ObjectMapper;
import org.mes.jax.model.ScadaDowntime;
import org.mes.jax.service.IScadaDowntimeService;
import org.mes.jax.utils.DBHelper;

/**
 * 当前停机时长
 * 
 * @author wuzhining
 *
 */
@WebService
public class ScadaDowntimeService implements IScadaDowntimeService {

	@Override
	public String scadaDowntimeService(Object data) {
		String message = null;
		try {
			message = addScadaDowntime(data);
		} catch (Exception e) {
			message = "提交数据时发生错误！";
		}
		return message;
	}

	@Override
	public String addScadaDowntime(Object data) {
		List<Object> list = new ArrayList<Object>();
		try {
			if (data != null) {
				// 反序列化json字符串
				ScadaDowntime scadaDowntime = new ObjectMapper().readValue(data.toString(), ScadaDowntime.class);

				list.add(scadaDowntime.getDownCd());
				list.add(scadaDowntime.getDownEmp());
				list.add(scadaDowntime.getDownId());
				list.add(scadaDowntime.getDownIp());
				list.add(scadaDowntime.getDownLong());
				list.add(scadaDowntime.getDownSn());
				list.add(scadaDowntime.getDownTime());
				list.add(scadaDowntime.getDownUnit());
			}
		} catch (Exception e) {
			e.printStackTrace();
			return "转化数据时出现错误！";
		}
		try {
			DBHelper dbhelper = new DBHelper();
			String sql = "insert into scada_downtime (DOWN_CD,DOWN_EMP,DOWN_ID,DOWN_IP,DOWN_QTY,DOWN_SN,DOWN_TIME,DOWN_UNIT) values(?,?,?,?,?,?,?,?)";
			dbhelper.excuteUpdate(sql, list);
		} catch (Exception e) {
			e.printStackTrace();
			return "保存数据时发生错误！";
		}
		return "数据保存成功！";
	}

}
