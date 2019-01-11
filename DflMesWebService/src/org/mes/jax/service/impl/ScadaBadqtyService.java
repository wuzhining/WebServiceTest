package org.mes.jax.service.impl;

import java.util.ArrayList;
import java.util.List;

import javax.jws.WebService;

import org.codehaus.jackson.map.ObjectMapper;
import org.mes.jax.model.ScadaBadqty;
import org.mes.jax.service.IScadaBadqtyService;
import org.mes.jax.utils.DBHelper;

/**
 * 不良品数webservice
 * 
 * @author wuzhining
 *
 */
@WebService
public class ScadaBadqtyService implements IScadaBadqtyService {

	@Override
	public String scadaBadqtyService(Object data) {
		String message = null;
		try {
			message = addScadaBadqty(data);
		} catch (Exception e) {
			message = "提交数据时发生错误！";
		}
		return message;
	}

	@Override
	public String addScadaBadqty(Object data) {
		List<Object> list = new ArrayList<Object>();
		try {
			if (data != null) {
				// 反序列化json字符串
				ScadaBadqty scadaBadqty = new ObjectMapper().readValue(data.toString(), ScadaBadqty.class);

				list.add(scadaBadqty.getBadCd());
				list.add(scadaBadqty.getBadEmp());
				list.add(scadaBadqty.getBadId());
				list.add(scadaBadqty.getBadIp());
				list.add(scadaBadqty.getBadQty());
				list.add(scadaBadqty.getBadSn());
				list.add(scadaBadqty.getBadTime());
			}
		} catch (Exception e) {
			e.printStackTrace();
			return "转化数据时出现错误！";
		}
		try {
			DBHelper dbhelper = new DBHelper();
			String sql = "insert into scada_badqty (BAD_CD,BAD_EMP,BAD_ID,BAD_IP,BAD_QTY,BAD_SN,BAD_TIME) values(?,?,?,?,?,?,?)";
			dbhelper.excuteUpdate(sql, list);
		} catch (Exception e) {
			e.printStackTrace();
			return "保存数据时发生错误！";
		}
		return "数据保存成功！";
	}

}
