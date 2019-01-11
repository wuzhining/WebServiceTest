package org.mes.jax.dao;

import org.json.JSONException;
import org.json.JSONObject;

public class ScadaParamDao {
	
	public String getMachineParams() {
        JSONObject jsonObject =new JSONObject();
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
	
}
