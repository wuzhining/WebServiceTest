package org.mes.jax.service;

import java.util.ArrayList;
import java.util.List;

import javax.jws.WebService;

import org.codehaus.jackson.map.ObjectMapper;
import org.mes.jax.model.ScadaProdqty;
import org.mes.jax.utils.DBHelper;
/**
 * 生产数量webservice
 * @author wuzhining
 *
 */
@WebService
public class ScadaProdqtyService implements IScadaWebService {

	@Override
	public String doService(Object data) {
		String message = null;
		try {
			message = addScadaProdQty(data);
		} catch (Exception e) {
			message = "提交数据时发生错误！";
		}
		return message;
	}

	private String addScadaProdQty(Object data) {
		List<Object> list = new ArrayList<Object>();
		try {
			if (data != null) {
				// 反序列化json字符串
				ScadaProdqty scadaProdqty = new ObjectMapper().readValue(data.toString(), ScadaProdqty.class);

				list.add(scadaProdqty.getProdCd());
				list.add(scadaProdqty.getProdEmp());
				list.add(scadaProdqty.getProdId());
				list.add(scadaProdqty.getProdIp());
				list.add(scadaProdqty.getProdQty());
				list.add(scadaProdqty.getProdSn());
				list.add(scadaProdqty.getProdTime());
			}
		} catch (Exception e) {
			e.printStackTrace();
			return "转化数据时出现错误！";
		}
		try {
			DBHelper dbhelper = new DBHelper();
			String sql = "insert into scada_prodqty (PROD_CD,PROD_EMP,PROD_ID,PROD_IP,PROD_QTY,PROD_SN,PROD_TIME) values(?,?,?,?,?,?,?)";
			dbhelper.excuteUpdate(sql, list);
		} catch (Exception e) {
			e.printStackTrace();
			return "保存数据时发生错误！";
		}
		return "数据保存成功！";
	}

}
