package org.mes.jax.service;

import java.util.ArrayList;
import java.util.List;

import javax.jws.WebService;

import org.codehaus.jackson.map.ObjectMapper;
import org.mes.jax.model.ScadaGoodqty;
import org.mes.jax.utils.DBHelper;
/**
 * 良品数webservice
 * @author wuzhining
 *
 */
@WebService
public class ScadaGoodqtyService implements IScadaWebService {

	@Override
	public String doService(Object data) {
		String message = null;
		try {
			message = addScadaGoodQty(data);
		} catch (Exception e) {
			message = "提交数据时发生错误！";
		}
		return message;
	}

	private String addScadaGoodQty(Object data) {
		List<Object> list = new ArrayList<Object>();
		try {
			if (data != null) {
				// 反序列化json字符串
				ScadaGoodqty scadaGoodqty = new ObjectMapper().readValue(data.toString(), ScadaGoodqty.class);

				list.add(scadaGoodqty.getGoodCd());
				list.add(scadaGoodqty.getGoodEmp());
				list.add(scadaGoodqty.getGoodId());
				list.add(scadaGoodqty.getGoodIp());
				list.add(scadaGoodqty.getGoodQty());
				list.add(scadaGoodqty.getGoodSn());
				list.add(scadaGoodqty.getGoodTime());
			}
		} catch (Exception e) {
			e.printStackTrace();
			return "转化数据时出现错误！";
		}
		try {
			DBHelper dbhelper = new DBHelper();
			String sql = "insert into scada_goodqty (GOOD_CD,GOOD_EMP,GOOD_ID,GOOD_IP,GOOD_QTY,GOOD_SN,GOOD_TIME) values(?,?,?,?,?,?,?)";
			dbhelper.excuteUpdate(sql, list);
		} catch (Exception e) {
			e.printStackTrace();
			return "保存数据时发生错误！";
		}
		return "数据保存成功！";
	}

}
