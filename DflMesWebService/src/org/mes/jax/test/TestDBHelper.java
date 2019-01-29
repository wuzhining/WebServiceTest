package org.mes.jax.test;

import java.util.ArrayList;
import java.util.List;

import org.junit.Assert;
import org.junit.Test;
import org.mes.jax.model.ScadaCtrlog;
import org.mes.jax.utils.DBHelper;

public class TestDBHelper {
	/**
	 * 查询方法
	 */
	@Test
	public void testQuery() {
		List<Object> list = new ArrayList<Object>();
		list.add("STOP");
		String sql = "select ctr_id,ctr_cd,ctr_ip,ctr_cmd,ctr_time,prm_emp,send_flag from scada_ctrlog where send_flag is null and ctr_cmd=?";
		DBHelper db = new DBHelper();
		List<ScadaCtrlog> data = new ArrayList<ScadaCtrlog>();
		try {
			data = (List<ScadaCtrlog>) db.executeQuery(sql, list, new ScadaCtrlog().getClass());
			if (data.size() > 0) {
				for (ScadaCtrlog scadaCtrlog : data) {

					System.out.println(scadaCtrlog.getCTR_CMD());
					System.out.println(scadaCtrlog.getCTR_CD());
					System.out.println(scadaCtrlog.getCTR_TIME());
				}
			}
			Assert.assertNotNull("测试接口返回null,测试失败", data);

		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	/**
	 * 增删改方法
	 */
	@Test
	public void testUpdate() {
		List<Object> list = new ArrayList<Object>();
		List<Object> updateList;
		DBHelper db = new DBHelper();

		list.add("START");
		String sql = "select ctr_id,ctr_cd,ctr_ip,ctr_cmd,ctr_time,prm_emp,send_flag from scada_ctrlog where send_flag is null and ctr_cmd=?";
		List<ScadaCtrlog> ScadaCtrlogList;
		try {

			ScadaCtrlogList = (List<ScadaCtrlog>) db.executeQuery(sql, list, new ScadaCtrlog().getClass());

			if (ScadaCtrlogList.size() >= 1) {
				for (ScadaCtrlog scadaCtrlog : ScadaCtrlogList) {
					updateList = new ArrayList<Object>();
					updateList.add("Y");
					updateList.add(scadaCtrlog.getCTR_CD());
					updateList.add(scadaCtrlog.getCTR_CMD());
					updateList.add(scadaCtrlog.getCTR_ID());
					updateList.add(scadaCtrlog.getCTR_IP());
					updateList.add(scadaCtrlog.getCTR_TIME());
					updateList.add(scadaCtrlog.getPRM_EMP());

					sql = "update scada_ctrlog set send_flag=? where ctr_cd=? and ctr_cmd=? and ctr_id=? and ctr_ip=? and ctr_time=? and prm_emp=?";

					db.excuteUpdate(sql, updateList);
				}
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
}
