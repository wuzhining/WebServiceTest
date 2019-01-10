package com.iPlant.mes.web;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.iPlant.frame.config.CoreFrameworkConstants;
import com.iPlant.frame.ifs.IMutipleIfs;
import com.iPlant.frame.ifs.model.CommonIfsRequest;
import com.iPlant.frame.ifs.model.CommonIfsResult;
import com.iPlant.frame.ifs.model.CommonIfsResultList;
import com.iPlant.frame.ifs.model.CommonResult;
import com.iPlant.frame.util.LogUtil;
import com.iPlant.frame.web.controller.BaseController;

@SuppressWarnings("serial")
public class ExportExcelController extends BaseController{


	private IMutipleIfs mutipleIfs;
	
	public IMutipleIfs getMutipleIfs() {
		return mutipleIfs;
	}

	public void setMutipleIfs(IMutipleIfs mutipleIfs) {
		this.mutipleIfs = mutipleIfs;
	}	


	@SuppressWarnings({"unchecked", "rawtypes"})
	public void execute(HttpServletRequest request, HttpServletResponse response)throws ServletException, IOException {
		Map<String, String> result = new HashMap<String, String>();
		Map<String, Object> requestParams = new HashMap<String, Object>();
		requestParams.put("USE_CD", request.getParameter("USE_CD"));
		requestParams.put("PW",  request.getParameter("PW"));  
		requestParams.put("IFS", request.getParameter("IFS"));
		requestParams.put("reqType", request.getParameter("reqType"));
		
    	CommonIfsRequest serviceRequest = new CommonIfsRequest();
    	serviceRequest.setRequestParams(requestParams);
		List<CommonIfsRequest> requestList = new ArrayList<CommonIfsRequest>();
		requestList.add(serviceRequest);
		
		CommonIfsResultList CommonIfsResultList=this.mutipleIfs.doMoreIfs(requestList,
				CoreFrameworkConstants.DEFAULT_AJAX_REQ_TYPE);
		
		Map<String, String> retInfo=new HashMap<String,String>();
		if (null != CommonIfsResultList && null != CommonIfsResultList.getCommonIfsResults()
				&& CommonIfsResultList.getCommonIfsResults().size() > 0) {
			CommonIfsResult resultUser = CommonIfsResultList.getCommonIfsResults().get(0);
			
			if (null != resultUser && null != resultUser.getBizResults()
					&& resultUser.getBizResults().size() > 0) {
				CommonResult BizResult = (CommonResult) resultUser.getBizResults().get(0);
				List dataList = BizResult.getDataList();
				
				if (null != dataList && dataList.size() > 0) {
					
				retInfo = (Map<String, String>) dataList.get(0);
				
                result.putAll(retInfo);
				
				if(retInfo.get("PW").equals(request.getParameter("PW")) && retInfo.get("USE_CD") !=null){
					
					
					if(retInfo.get("USE_IT").equals("1")){
						//用户已登陆
				    result.put("IRETCODE", "3");
					}
					
				}else{
					//密码错误
					result.put("IRETCODE", "1");
			     }
				
				}else{
					//用户信息不存在
					result.put("IRETCODE", "2");
				}
			}
		
		} else{
			
		}
	    	 doResponse(response, result);
		
		LogUtil.info("通用控制器调用信息：结束...");
	}

}
