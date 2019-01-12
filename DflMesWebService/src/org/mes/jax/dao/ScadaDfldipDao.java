package org.mes.jax.dao;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.apache.log4j.Logger;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import org.mes.jax.model.ScadaDfldip;
import org.mes.jax.service.impl.DflDipService;
import org.mes.jax.utils.DBHelper;

public class ScadaDfldipDao {

	//如果直接 className.class 日志输出到全局的 即rootLogger 指定的文件中
	Logger logger = Logger.getLogger(DflDipService.class.getName());
	//如果指定logger名字，则是把日志，输出到pay-log 指定的日志文件中去
	//	Logger logger = Logger.getLogger(“pay-log”);
	
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
					logger.error("保存数据时发生错误！",e);
					return "保存数据时发生错误！";
				}
			}

		} catch (JSONException e) {
			e.printStackTrace();
			logger.error("解析数据时发生错误！",e);
			return  "解析数据时发生错误！";
		}
		return "数据保存成功！";
	}
	
}
