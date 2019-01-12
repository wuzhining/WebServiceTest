package org.mes.jax.dao;

import org.json.JSONException;
import org.json.JSONObject;

public class ScadaParamDao {

	public String getMachineParams() {
		JSONObject jsonObject = new JSONObject();
		try {
			jsonObject.put("MachineName", "EQ004");
			jsonObject.put("IPAddress", "192.168.1.88");
			jsonObject.put("ParamNo", "1");
			jsonObject.put("ParamName", "START");
			jsonObject.put("ParamDesc", "开机");
			jsonObject.put("ParamValue", "Y");
			jsonObject.put("ParamResult", "TRUE");
			jsonObject.put("ParamMSG", "");
		} catch (JSONException e) {
			e.printStackTrace();
		}

		return jsonObject.toString();
	}

	public String getStart() {
		JSONObject jsonObject = new JSONObject();
		try {
			jsonObject.put("MachineName", "EQ004");
			jsonObject.put("IPAddress", "192.168.1.88");
			jsonObject.put("ParamNo", "1");
			jsonObject.put("ParamName", "START");
			jsonObject.put("ParamDesc", "开机");
			jsonObject.put("ParamValue", "Y");
			jsonObject.put("ParamResult", "TRUE");
			jsonObject.put("ParamMSG", "");
		} catch (JSONException e) {
			e.printStackTrace();
		}

		return jsonObject.toString();
	}

	public String getStop() {
		JSONObject jsonObject = new JSONObject();
		try {
			jsonObject.put("MachineName", "EQ004");
			jsonObject.put("IPAddress", "192.168.1.88");
			jsonObject.put("ParamNo", "1");
			jsonObject.put("ParamName", "STOP");
			jsonObject.put("ParamDesc", "关机");
			jsonObject.put("ParamValue", "Y");
			jsonObject.put("ParamResult", "TRUE");
			jsonObject.put("ParamMSG", "");
		} catch (JSONException e) {
			e.printStackTrace();
		}

		return jsonObject.toString();
	}

	public String getSetTime() {
		JSONObject jsonObject = new JSONObject();
		try {
			jsonObject.put("MachineName", "EQ004");
			jsonObject.put("IPAddress", "192.168.1.88");
			jsonObject.put("ParamNo", "1");
			jsonObject.put("ParamName", "SETTIME");
			jsonObject.put("ParamDesc", "设置机器时间");
			jsonObject.put("ParamValue", "2019-01-01 15:11:11");
			jsonObject.put("ParamResult", "TRUE");
			jsonObject.put("ParamMSG", "");
		} catch (JSONException e) {
			e.printStackTrace();
		}

		return jsonObject.toString();
	}

	public String getSetTakt() {
		JSONObject jsonObject = new JSONObject();
		try {
			jsonObject.put("MachineName", "EQ004");
			jsonObject.put("IPAddress", "192.168.1.88");
			jsonObject.put("ParamNo", "1");
			jsonObject.put("ParamName", "SETTAKT");
			jsonObject.put("ParamDesc", "设置机器节拍");
			jsonObject.put("ParamValue", "1");
			jsonObject.put("ParamResult", "TRUE");
			jsonObject.put("ParamMSG", "");
		} catch (JSONException e) {
			e.printStackTrace();
		}

		return jsonObject.toString();
	}

	public String getSetId() {
		JSONObject jsonObject = new JSONObject();
		try {
			jsonObject.put("MachineName", "EQ004");
			jsonObject.put("IPAddress", "192.168.1.88");
			jsonObject.put("ParamNo", "1");
			jsonObject.put("ParamName", "SETID");
			jsonObject.put("ParamDesc", "设置ID");
			jsonObject.put("ParamValue", "1");
			jsonObject.put("ParamResult", "TRUE");
			jsonObject.put("ParamMSG", "");
		} catch (JSONException e) {
			e.printStackTrace();
		}

		return jsonObject.toString();
	}

	public String getSetIp() {
		JSONObject jsonObject = new JSONObject();
		try {
			jsonObject.put("MachineName", "EQ004");
			jsonObject.put("IPAddress", "192.168.1.88");
			jsonObject.put("ParamNo", "1");
			jsonObject.put("ParamName", "SETIP");
			jsonObject.put("ParamDesc", "设置IP");
			jsonObject.put("ParamValue", "192.168.0.108");
			jsonObject.put("ParamResult", "TRUE");
			jsonObject.put("ParamMSG", "");
		} catch (JSONException e) {
			e.printStackTrace();
		}

		return jsonObject.toString();
	}

}
