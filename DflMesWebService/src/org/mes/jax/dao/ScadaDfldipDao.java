package org.mes.jax.dao;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.apache.log4j.Logger;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import org.mes.jax.model.ScadaCtrlog;
import org.mes.jax.model.ScadaDfldip;
import org.mes.jax.service.impl.DflDipService;
import org.mes.jax.utils.DBHelper;

public class ScadaDfldipDao implements IScadaDfldipDao {

	Logger logger = Logger.getLogger(DflDipService.class.getName());

	/**
	 * 添加数据
	 * 
	 * @param data
	 * @return
	 */
	public String addScadaDfldip(Object data) {
		List<String> dataList = new ArrayList<>();
		dataList.add((String) data);

		DBHelper dbhelper = new DBHelper();
		try {
			JSONObject jsonObject = new JSONObject(new JSONArray(dataList).getString(0));

			ScadaDfldip scadaDf = new ScadaDfldip();
			scadaDf.setStationName(jsonObject.get("stationname").toString());
			scadaDf.setIpAddress(jsonObject.get("ipaddress").toString());
			scadaDf.setSkuNo(jsonObject.get("skuno").toString());
			scadaDf.setMachineName(jsonObject.get("machinename").toString());
			scadaDf.setSupplier(jsonObject.get("supplier").toString());

			JSONArray dataArray = (JSONArray) jsonObject.get("data");

			for (int i = 0; i < dataArray.length(); i++) {
				scadaDf.setLowlimit(dataArray.getJSONObject(i).get("lowerlimit").toString());
				scadaDf.setParamValue(dataArray.getJSONObject(i).get("parametervalue").toString());
				scadaDf.setParamMsg(dataArray.getJSONObject(i).get("resultmessage").toString());
				scadaDf.setParamNo(dataArray.getJSONObject(i).get("parameternumber").toString());
				scadaDf.setValueType(dataArray.getJSONObject(i).get("valuetype").toString());
				scadaDf.setParamResult(dataArray.getJSONObject(i).get("parameterresult").toString());
				scadaDf.setParamType(dataArray.getJSONObject(i).get("parametertype").toString());
				scadaDf.setParamGuid(dataArray.getJSONObject(i).get("formulalogguid").toString());
				scadaDf.setParamDesc(dataArray.getJSONObject(i).get("description").toString());
				scadaDf.setUpplimit(dataArray.getJSONObject(i).get("upperlimit").toString());
				scadaDf.setParamName(dataArray.getJSONObject(i).get("parametername").toString());
				scadaDf.setAdjValue(dataArray.getJSONObject(i).get("adjustmentvalue").toString());
				scadaDf.setUploadTime(new SimpleDateFormat("yyyy-MM-dd HH:mm:ss.SSSSSS").format(new Date()));

				List<Object> list = new ArrayList<Object>();

				list.add(scadaDf.getUploadTime());
				list.add(scadaDf.getMachineName());
				list.add(scadaDf.getStationName());
				list.add(scadaDf.getIpAddress());
				list.add(scadaDf.getMachineModel());
				list.add(scadaDf.getSupplier());
				list.add(scadaDf.getSkuNo());
				list.add(scadaDf.getParamNo());
				list.add(scadaDf.getParamName());
				list.add(scadaDf.getParamDesc());
				list.add(scadaDf.getParamValue());
				list.add(scadaDf.getParamType());
				list.add(scadaDf.getUnits());
				list.add(scadaDf.getValueType());
				list.add(scadaDf.getAdjValue());
				list.add(scadaDf.getLowlimit());
				list.add(scadaDf.getUpplimit());
				list.add(scadaDf.getParamGuid());
				list.add(scadaDf.getParamResult());
				list.add(scadaDf.getParamMsg());

				String sql = "insert into scada_dfldip (UPLOADTIME,MACHINENAME,STATIONNAME,IPADDRESS,MACHINEMODEL,SUPPLIER,SKUNO,PARAMNO,PARAMNAME,PARAMDESC,PARAMVALUE,"
						+ "PARAMTYPE,UNITS,VALUETYPE,ADJVALUE,LOWLIMIT,UPPLIMIT,PARAMGUID,PARAMRESULT,PARAMMSG) values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
				try {
					dbhelper.excuteUpdate(sql, list);
				} catch (Exception e) {
					e.printStackTrace();
					logger.error("保存数据时发生错误！", e);
					return "保存数据时发生错误！";
				}
			}

		} catch (JSONException e) {
			e.printStackTrace();
			logger.error("解析数据时发生错误！", e);
			return "解析数据时发生错误！";
		}
		return "数据保存成功！";
	}

	/**
	 * 开机服务
	 * 
	 * @return
	 */
	@SuppressWarnings("unchecked")
	public String getStart() {
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
				return "Y";
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return "N";
	}

	/**
	 * 停机
	 */
	@SuppressWarnings("unchecked")
	@Override
	public String getStop() {
		List<Object> list = new ArrayList<Object>();
		List<Object> updateList;
		DBHelper db = new DBHelper();

		list.add("STOP");
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
				return "Y";
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return "N";
	}

	@Override
	public String getSetTime() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public String getSetTakt() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public String getSetId() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public String getSetIp() {
		// TODO Auto-generated method stub
		return null;
	}

}
