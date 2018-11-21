package org.mes.jax.service;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.jws.WebMethod;
import javax.jws.WebService;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import org.mes.jax.service.DBHelper;

import org.mes.jax.model.ScadaDfldip;

@WebService
public class DflDipService {
	private static String message = null;

	@WebMethod
	public  String doService(Object data) {
		try {
			message = startInsert(data);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return message;
	}

	public  String startInsert(Object data) throws Exception {
//		List<String> dataList = new ArrayList<>();
//		new ArrayList<>().add((String) data);
		List<String> dataList = new ArrayList<>();
		dataList.add((String) data);

		JSONArray jsonArray = new JSONArray(dataList);

		DBHelper dbhelper = new DBHelper();
		try {
			JSONObject jsonObject = new JSONObject(jsonArray.getString(0));

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
//			list.add(scada);
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
					message = "sucess";
				} catch (Exception e) {
					e.printStackTrace();
					message = "false";
				}
			}

		} catch (JSONException e) {
			e.printStackTrace();
			message = "false";
		}
		return message;
	}
}
